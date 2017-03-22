import preact       from 'preact'
import style        from './style.css'

import {Button as ButtonClipboard}      from './clipboardButton'
import {Button as ButtonGist}           from './gistButton'

export const Footer = props =>
    <div className={style.container}>

        <div className={style.ribbon} />

        <div className={style.row}>
            { props.profile && <ButtonClipboard {...props} /> }
            { props.profile && <ButtonGist {...props} /> }
        </div>
    </div>
