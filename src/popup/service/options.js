/* global chrome */
import type EventEmitter    from 'events'
import type {Options}       from '../../type'

export const init = ( ee: EventEmitter ) => {

    return {
        requestOptions: () =>
            chrome.storage.sync.get(
                {gh_token: null, gist_id: null},
                ( options: Options ) =>
                    ee.emit('update', { options })
            )
        ,

        saveOptions: ( options: Options ) =>
            chrome.storage.sync.set(
                options,
                ( options: Options ) =>
                    ee.emit('update', { options })
            )
        ,
    }
}