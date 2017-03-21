/* global chrome */
import {parse as parse2}  from './parser/json'

let profile

const wait = ( delay: number ) : Promise<void> => new Promise( resolve => setTimeout( resolve, delay ) )

wait(800)
    .then( () => parse2( document.body ) )
    .then( x => chrome.runtime.sendMessage({ type: 'update-profile', profile: profile = x }) )


chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {

    console.log(
        sender.tab
            ? 'from a content script:' + sender.tab.url
            : 'from the extension'
        ,
        request
    )

    if ( request.type == 'request-profile' )
        chrome.runtime.sendMessage({ type: 'update-profile', profile })
})
