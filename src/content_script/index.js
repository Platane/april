
import type { Profile } from '../type/profile'
import {buildIcon}      from './buildIcon'
import {debounce}       from '../util/time'
import {parse}          from './parser/json'

let imageData_data : ?Array<number> = null
let profile : ?Profile = null
const check = debounce(
    500,
    async () => {

        profile         = parse( document.body )
        imageData_data  = Array.from( (await buildIcon( profile, 128 )).data )

        chrome.runtime.sendMessage({ type: 'update-profile', profile, imageData_data })
    }
)


check()

// redo the check at every title change ( = router change page )
{
    const m = new MutationObserver(
        () => {
            chrome.runtime.sendMessage({ type: 'update-profile', profile: profile = null })
            check()
        }
    )

    m.observe(
        document.getElementsByTagName('title')[0],
        {
            childList               : true,
            subtree                 : true,
            attributes              : false,
            characterData           : false,
            attributeOldValue       : false,
            characterDataOldValue   : false,
        }
    )
}

chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {

    if ( request.type == 'request-profile' )
        chrome.runtime.sendMessage({ type: 'update-profile', profile, imageData_data })
})
