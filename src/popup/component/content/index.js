import preact from 'preact'

import style    from './style.css'

import {Profile}   from '../profile'
import {Footer}    from '../footer'

export const Content = props =>
    <div className={style.container}>
        {
            props.profile
                ? <Profile {...props.profile}/>
                : <div>...</div>
        }
        <div className={style.footer}>
            <Footer {...props} />
        </div>
    </div>
