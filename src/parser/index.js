import type {
    Info,
    Experience,
    Media,
    Profile,
    Company
} from '../type/profile'

export const extractInfo = ( body: HTMLElement ) : Info => {

    const section = body.querySelector('.pv-profile-section.pv-top-card-section')

    if ( !section )
        throw Error('no profile section found ( .pv-top-card-section )')

    const img = section.querySelector('.pv-top-card-section__photo img') || section.querySelector('.profile-photo-edit__preview')

    const name = section.querySelector('.pv-top-card-section__name')

    const headline = section.querySelector('.pv-top-card-section__headline')

    const summary = section.querySelector('.pv-top-card-section__summary')

    return {
        pic_url     : img ? img.getAttribute('src') : null,
        name        : name ? name.innerText : null,
        headline    : headline ? headline.innerText : null,
        summary     : summary ? summary.innerText : null,
    }
}

export const extractExperiences = ( body: HTMLElement ) : Promise<Array<Experience>> => {

    const section = body.querySelector('.pv-profile-section.experience-section') // || body.querySelector('.pv-profile-section.background-section')

    if ( !section )
        throw Error('no profile section found ( .experience-section )')

    const list = section.querySelectorAll('.position-entity')

    return Promise.all( Array.from( list ).map( x => extractExperience( x ) ) )
}

const wait = ( delay: number ) : Promise<void> => new Promise( resolve => setTimeout( resolve, delay ) )

export const extractMediaFigure = ( figure: HTMLElement ) : Media => {

    const caption = figure.querySelector('.pv-treasury-carousel__treasury-title')

    const img = figure.querySelector('.pv-treasury-carousel__treasury-image')

    const m = img && img.style.backgroundImage.match(/(http[^ \)]+)/)

    return {
        type            : 'pic',
        title           : caption ? caption.innerText : null,
        media_url       : m ? m[1] : null,
    }
}

export const extractCompany = ( element: HTMLElement ) : Company => {

    const logo = element.querySelector('.company-logo')
    const img  = logo && logo.querySelector('img')

    const a = logo && logo.parentElement

    return {
        name            : img ? img.getAttribute('alt') : null,
        logo_url        : img ? img.getAttribute('src') : null,
        linkedin_url    : a && a.hasAttribute('href') ? `https://linkedin.com${ a.getAttribute('href') }` : null,
    }
}

export const extractDate = ( element: HTMLElement ) => {

    const dateRange = element.querySelector('.pv-entity__date-range')
    const duration = element.querySelector('.pv-entity__duration')

    const rangeHidden = dateRange && dateRange.querySelector('.visually-hidden')
    const durationHidden = duration && duration.querySelector('.visually-hidden')

    const range_literal     = dateRange && ( dateRange.innerText.slice( rangeHidden ? rangeHidden.innerText.length : 0 ) )
    const duration_literal  = duration && ( duration.innerText.slice( durationHidden ? durationHidden.innerText.length : 0 ) )

    const [ start_literal, end_literal ] = range_literal ? range_literal.split(/[\-–]/) : []

    return {
        duration_literal    : duration_literal ? duration_literal.trim(/\s/) : null,
        start_literal       : start_literal ? start_literal.trim(/\s/) : null,
        end_literal         : end_literal ? end_literal.trim(/\s/) : null,
    }
}

export const extractExperience = async ( element: HTMLElement, k:number = 0 ) : Promise<Experience> => {

    const showMore = element.querySelector('.pv-profile-section__show-more-detail')

    if ( showMore && k < 5 ) {

        showMore.click()

        await wait( 30 )

        return extractExperience( element, k+1 )

    } else {

        const description = element.querySelector('.pv-entity__description')

        const medialist = element.querySelectorAll('.pv-treasury-carousel figure')

        const position = element.querySelector('.pv-entity__summary-info h3')

        return {
            position    : position ? position.innerText : null,
            description : description ? description.innerText : null,
            media       : Array.from(medialist).map(extractMediaFigure),
            company     : extractCompany(element),
            date        : extractDate(element),
        }
    }
}

export const parse = async ( body: HTMLElement ) : Promise<Profile> => {

    await wait( 500 )

    return {
        info        : extractInfo( body ),
        experience  : await extractExperiences( body ),
    }

}