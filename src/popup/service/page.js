/* global chrome */
import type {Options}       from '../../type'
import type {Store}         from '../index'

import {readProfilFromPage} from '../action'

export const init = ( store: Store ) => {

    chrome.runtime.onMessage.addListener( (request, sender) => {

        if ( request.type == 'update-profile' )
            store.dispatch(readProfilFromPage(request.profile))
    })



    const done = {}

    store.subscribe( () => {

        const toFetch = store.getState()['service.page.toFetch']

        if ( !toFetch || done[toFetch.metaKey] )
            return

        done[toFetch.metaKey] = true


        chrome.tabs.query(
            {active: true, currentWindow: true},
            tabs =>
                chrome.tabs.sendMessage(tabs[0].id, {type: 'request-profile'})
        )
    })
}