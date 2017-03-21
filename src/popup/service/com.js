/* global chrome */
import type EventEmitter from 'events'

export const init = ( ee: EventEmitter ) => {

    chrome.runtime.onMessage.addListener( (request, sender) => {

        if ( request.type == 'update-profile' )
            ee.emit('update', {profile: request.profile})
    })


    return {
        requestProfile: () =>
            chrome.tabs.query(
                {active: true, currentWindow: true},
                tabs =>
                    chrome.tabs.sendMessage(tabs[0].id, {type: 'request-profile'})
            )
    }
}