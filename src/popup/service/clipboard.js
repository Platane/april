/* global chrome */
import type EventEmitter    from 'events'
import type {Options}       from '../../type'

export const init = ( ee: EventEmitter ) => {

    const domText = document.createElement('div')
    domText.setAttribute('style', 'position:absolute;top:-999px;left:-999px;height:1px;width:1px')
    document.body.appendChild(domText)

    return {
        copyToClipboard: (text: string) => {
            domText.innerText = text

            const range = document.createRange()
            range.selectNodeContents(domText)

            const selection = window.getSelection()
            selection.removeAllRanges()
            selection.addRange(range)
            document.execCommand('copy', false, null)
        },
    }
}
