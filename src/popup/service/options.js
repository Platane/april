/* global chrome */
import type {Options}       from '../../type'
import type {Store}         from '../index'

import {readOptions} from '../action'


const read = () : Promise<Options> =>
    new Promise( resolve =>
        chrome.storage.sync.get(
            {gh_token: null, gist_id: null},
            options => resolve( options )
        )
    )

const save = ( options: Options ) : Promise<Options> =>
    new Promise( resolve =>
        chrome.storage.sync.set(
            options,
            () => resolve( options )
        )
    )

export const init = ( store: Store ) => {

    {
        const done = {}

        store.subscribe( async () => {

            const toSave = store.getState()['service.options.toSave']

            if ( !toSave || done[toSave.metaKey] )
                return

            done[toSave.metaKey] = true

            store.dispatch(readOptions( await save( toSave.options ) ))
        })
    }

    {
        const done = {}

        store.subscribe( async () => {

            const toFetch = store.getState()['service.options.toFetch']

            if ( !toFetch || done[toFetch.metaKey] )
                return

            done[toFetch.metaKey] = true

            store.dispatch(readOptions( await read() ))
        })
    }
}