import preact from 'preact'

import {debounce}               from '../../../util/time'

import style                    from './style.css'
import {setOptions}             from '../../action'


const Row = ({ onChange, value, label, description }) =>
    <div className={style.row}>
        <div className={style.label}>{ label }</div>
        <input type="text" onChange={ e => onChange(e.target.value)} value={value} />
        <div className={style.description}>{ description }</div>
    </div>

export class Config extends preact.Component {

    constructor( props ){
        super( props )

        this.state = {
            ...props.options,
        }

        this._save = debounce(
            900,
            () =>
                this.context.store.dispatch(setOptions(this.state))
        )
    }

    setGistId = (gist_id: string) => {
        this.setState({ gist_id })
        this._save()
    }

    setGhToken = (gh_token: string) => {
        this.setState({ gh_token })
        this._save()
    }

    render(_, {gh_token, gist_id}){
        return (
            <div className={style.container}>
                <Row onChange={this.setGhToken} value={gh_token} label="gh_token" />
                <Row onChange={this.setGistId} value={gist_id} label="gist_id" />
            </div>
        )
    }
}