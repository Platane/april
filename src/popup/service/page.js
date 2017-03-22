/* global chrome */
import type {Options}       from '../../type'
import type {Store}         from '../index'

import {readProfilFromPage} from '../action'

const getActiveTab = () =>
    new Promise( resolve =>
        chrome.tabs.query({active: true, currentWindow: true}, tabs => resolve( tabs[0] ) )
    )

export const init = ( store: Store ) => {

    let activeTab = null

    chrome.runtime.onMessage.addListener( (request, sender) => {

        switch( request.type ){

            case 'update-profile' :
                if ( activeTab.id == sender.tab.id )
                    store.dispatch(readProfilFromPage(request.profile))

                break
        }
    })



    const done = {}

    store.subscribe( async () => {

        const toFetch = store.getState()['service.page.toFetch']

        if ( !toFetch || done[toFetch.metaKey] )
            return

        done[toFetch.metaKey] = true

        activeTab = await getActiveTab()

        chrome.tabs.sendMessage(activeTab.id, {type: 'request-profile'})
    })
}