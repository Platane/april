import preact from 'preact'

import style    from './style.css'

import {Profile}   from '../profile'
import {Footer}    from '../footer'

export const Content = props => {

    const profile       = props['profile.fromPage.value']
    const gistSaved     = props['profile.fromGist.equal']
    const dispatch      = props.dispatch

    return (
        <div className={style.container}>
            {
                profile
                    ? <Profile {...profile}/>
                    : <div>...</div>
            }
            <div className={style.footer}>
                <Footer dispatch={dispatch} profile={profile} gistSaved={gistSaved} />
            </div>
        </div>
    )
}