import type {Options}       from '../../type'
import type {Store}         from '../index'

export const init = ( store: Store ) => {

    const domText = document.createElement('div')
    domText.setAttribute('style', 'position:absolute;top:-999px;left:-999px;height:1px;width:1px')
    document.body.appendChild(domText)

    const copy = (text: string) => {
        domText.innerText = text

        const range = document.createRange()
        range.selectNodeContents(domText)

        const selection = window.getSelection()
        selection.removeAllRanges()
        selection.addRange(range)
        document.execCommand('copy', false, null)
    }



    const done = {}

    store.subscribe( () => {

        const toCopy = store.getState()['service.clipboard.toCopy']

        if ( !toCopy || done[toCopy.metaKey] )
            return

        done[toCopy.metaKey] = true
        copy(toCopy.text)
    })
}
