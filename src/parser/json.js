import type {
    Info,
    Experience,
    Media,
    Profile,
    Company
} from '../type/profile'


type Data = {id:string, data:Object, request:string}

const parseData = ( body: HTMLElement ): Array<Data> => {

    const data = []

    Array.from(body.querySelectorAll('code'))
        .forEach( element => {

            const m = (element.getAttribute('id')||'').match(/(datalet-)?bpr-guid-(\d*)/)

            let content

            try {
                content = JSON.parse(element.innerText)
            }catch( err ){
                console.log(err, element.innerText)
            }

            if ( !m || !content )
                return

            const isDatalet = !!m[1]
            const id        = m[2]

            let u = data.find( x => x.id == id )

            if(!u)
                data.push(u={id,request:'',data:{}})

            if ( isDatalet )
                u.request = content.request

            else
                u.data = content
        })

    return data
}


const hydrate = ( entities, x ) => {

    if ( Array.isArray(x) )
        return x.map( x => hydrate( entities, x ) )

    else if ( typeof x == 'string' )
        return entities.find( u => u['$id'] == x || u['entityUrn'] == x ) || x

    else if ( typeof x == 'object' && x ) {
        for ( let key in x )
            if ( key[0] != '$' && key != 'entityUrn')
                x[key] = hydrate( entities, x[key] )

    }

    return x
}


const extractInfo = ( entities ) : Info => {

    const info = entities.find( x => x.$type.match(/\.Profile$/) )

    return {
        firstName   : info.firstName,
        lastName    : info.lastName,
        headline    : info.headline,
        summary     : info.summary,
        pic_url     : parseMedia( info.miniProfile.picture ),
    }
}


const parseMedia = x =>
    (
        'com.linkedin.voyager.common.MediaProcessorImage' in x &&
            `https://media.licdn.com/media${x['com.linkedin.voyager.common.MediaProcessorImage'].id}`
    )
    ||
    (
        'com.linkedin.voyager.common.MediaProxyImage' in x &&
            x['com.linkedin.voyager.common.MediaProxyImage'].url
    )


const parseExperience = ( entities ) : Array<Experience> =>
    entities.find( x => x.$type.includes('.PositionView') ).elements
        .map( x => {

            const start = x.timePeriod.startDate
            const end   = x.timePeriod.endDate

            const companyId = x.company.miniCompany.entityUrn.match(/:(\d+)$/)[1]

            const company = {
                name        : x.company.miniCompany.name,
                logo_url    : parseMedia(x.company.miniCompany.logo),
                linkedin_url: `https://www.linkedin.com/company-beta/${companyId}`,
            }

            const positionId = x.entityUrn.match(/:\(?([\w,\-_]+)\)?$/)[1].split(',')
            const media : Array<Media> = [].concat(
                ...entities
                    .filter( m => m.$type.includes('TreasuryMediaItems') && positionId.some( id => m.sectionUrn.includes(id) ) )
                    .map( ({mediaList}) =>
                        mediaList.map( ({customTitle, data}) =>
                            ({
                                type        : 'pic',
                                title       : customTitle,
                                media_url   : parseMedia(data),
                            })
                        )
                    )
                )

            return {
                company,
                media,
                position    : x.title,
                description : x.description,
                startDate   : `${start.month}/${start.year}`,
                endDate     : end && `${end.month}/${end.year}`,
            }
        })

export const parse = async ( body: HTMLElement ) : Promise<Profile> => {

    const data = parseData( body )

    const _ = [].concat( ...data.map( x => x.data.included ) )

    const entities = hydrate( _, _ )


    const languages = entities.find( x => x.$type.includes('.LanguageView') ).elements

    const skills = entities.find( x => x.$type.includes('.SkillView') ).elements


    return {
        experience  : parseExperience(entities),
        info        : extractInfo(entities),
    }
}