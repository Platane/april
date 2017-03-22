import preact       from 'preact'
import style        from './style.css'

import {Button as RButton}      from '../button'
import {debounce}               from '../../../util/time'

import {copyToGist, goToConfig}        from '../../action'

export class Button extends preact.Component {

    state = { copied: false }

    constructor(){
        super()
        this._cooldown = debounce( 2000, () => this.setState({ copied: false }) )
    }

    copy = () => {
        this.context.store.dispatch(copyToGist())
        this.setState({ copied: true })

        this._cooldown()
    }

    goToConfig = () =>
        this.context.store.dispatch(goToConfig())

    goToGist = () => {
        const url = `https://gist.github.com/Platane/${this.props.gist_id}#file-${this.props.gistFileName.replace(/\./g, '-')}`
        window.open( url, '_blank' )
    }

    render({ gistSaved, gistLoaded, canWriteGist }, {copied}){
        return <RButton
            onClick={
                ( canWriteGist && !gistSaved && this.copy )
                ||
                null
            }
            label="copy to gist"
            onClickSecondary={
                ( !canWriteGist && this.goToConfig )
                ||
                ( gistLoaded && gistSaved && this.goToGist )
                ||
                null
            }
            sublabel={
                ( !canWriteGist && 'edit your config' )
                ||
                ( !gistLoaded && 'retreiving gist...' )
                ||
                ( gistLoaded && gistSaved && 'already up to date' )
                ||
                null
            }
            />
    }
}