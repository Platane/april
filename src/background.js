/* global chrome */


chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {

    const tabId = sender.tab.id

    switch( request.type ){
        case 'update-profile' :

            const {imageData_data, profile} = request

            chrome.browserAction.setBadgeText({ text: profile ? '!' : '', tabId })

            if ( imageData_data ) {

                const l = Math.sqrt(imageData_data.length/4)
                const imageData = new ImageData(new Uint8ClampedArray(imageData_data), l, l)

                chrome.browserAction.setIcon({ imageData, tabId })
            }
            break
    }

})