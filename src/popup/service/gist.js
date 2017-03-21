/* global fetch */
import type {Store}         from '../index'
import {readProfilFromGist} from '../action'

const read = async ( gist_id: string, fileName: string ) => {

    const req = await fetch(
        `https://api.github.com/gists/${gist_id}`,
        {
            headers     : {
                'User-Agent'    : 'robot',
            },
            method      : 'GET',
        }
    )

    const data = await req.json()

    return data.files[fileName] && JSON.parse(data.files[fileName].content)
}

const save = async ( gist_id: string, gh_token: string, fileName: string, content: string ) => {

    const req = await fetch(
        `https://api.github.com/gists/${gist_id}`,
        {
            headers     : {
                'User-Agent'    : 'robot',
                'Authorization' : `token ${gh_token}`
            },
            method      : 'PATCH',
            body        : JSON.stringify({ files: { [fileName]: { content } } }),
        }
    )

    const data = await req.json()

    return data.files[fileName] && JSON.parse(data.files[fileName].content)
}

export const init = ( store: Store ) => {

    {
        const done = {}

        store.subscribe( async () => {

            const toSave = store.getState()['service.gist.toSave']
            const {gh_token, gist_id} = store.getState()['options.value'] || {}

            if ( !toSave || done[toSave.metaKey] || !gh_token || !gist_id )
                return

            done[toSave.metaKey] = true

            store.dispatch( readProfilFromGist( await save(gist_id, gh_token, toSave.fileName, toSave.content ) ) )
        })
    }

    {
        const done = {}

        store.subscribe( async () => {

            const toFetch = store.getState()['service.gist.toFetch']
            const {gist_id} = store.getState()['options.value'] || {}

            if ( !toFetch || done[toFetch.metaKey] || !gist_id )
                return

            done[toFetch.metaKey] = true

            store.dispatch( readProfilFromGist( await read(gist_id, toFetch.fileName ) ) )
        })
    }
}