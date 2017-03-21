/* global fetch */
import type EventEmitter            from 'events'
import type {Options, Profile}      from '../../type'

const getFileName = ( options: Options, profile: Profile ) =>
    `${profile.info.firstName}-${profile.info.lastName}.json`
        .toLowerCase()
        .replace(/ /g, '_')

export const init = ( ee: EventEmitter ) => {

    return {
        requestGist: async ( options: Options, profile: Profile ) => {

            const req = await fetch(
                `https://api.github.com/gists/${options.gist_id}`,
                {
                    headers     : {
                        'User-Agent'    : 'robot',
                    },
                    method      : 'GET',
                }
            )

            const data = await req.json()

            const fileName = getFileName( options, profile )

            ee.emit('update', { saved_profile: data.files[fileName] && JSON.parse(data.files[fileName].content) })
        },

        saveGist: async ( options: Options, profile: Profile ) => {

            const fileName = getFileName( options, profile )

            const req = await fetch(
                `https://api.github.com/gists/${options.gist_id}`,
                {
                    headers     : {
                        'User-Agent'    : 'robot',
                        'Authorization' : `token ${options.gh_token}`
                    },
                    method      : 'PATCH',
                    body        : JSON.stringify({ files: { [fileName]: { content: JSON.stringify(profile, null, 1) } } }),
                }
            )

            const data = await req.json()

            if( data.files[fileName] )
                ee.emit('update', { saved_profile: JSON.parse(data.files[fileName].content) })
        },
    }
}