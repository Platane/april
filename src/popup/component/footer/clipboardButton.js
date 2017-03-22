import preact       from 'preact'
import style        from './style.css'

import {Button as RButton}      from '../button'
import {debounce}               from '../../../util/time'

import {copyToClipboard}        from '../../action'

export class Button extends preact.Component {

    state = { copied: false }

    constructor(){
        super()
        this._cooldown = debounce( 2000, () => this.setState({ copied: false }) )
    }

    copy = () => {
        this.context.store.dispatch(copyToClipboard())
        this.setState({ copied: true })

        this._cooldown()
    }

    render(_, {copied}){
        return <RButton
            onClick={ this.copy }
            label="copy to clipboard"
            sublabel={ copied ? 'copied !' : null }
            />
    }
}