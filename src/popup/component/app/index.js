import preact from 'preact'

import style    from './style.css'

import {Content}   from '../content'
import {Config}    from '../config'

export const App = props => {

    const profile       = props['profile.fromPage.value']
    const gistSaved     = props['profile.fromGist.equal']
    const gistFileName  = props['profile.fromGist.fileName']
    const gistLoaded    = props['profile.fromGist.loaded']
    const canWriteGist  = props['options.canWriteGist']
    const {gh_token, gist_id} = props['options.value'] || {}
    const panel         = props['appState.panel']

    const o = { profile, gistSaved, gistLoaded, canWriteGist, gistFileName, gist_id, gh_token }

    return (
        <div className={style.container}>
            {
                ( panel == 'config' && <Config { ...o} /> )
                ||
                ( panel == 'profile' && <Content { ...o} /> )
                ||
                ( panel == 'home' && <div { ...o} /> )
                ||
                false
            }
        </div>
    )
}