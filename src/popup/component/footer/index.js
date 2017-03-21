import preact from 'preact'

import style    from './style.css'

export const Footer = ({ profile, options, saveGist, copyToClipboard }) =>
    <div className={style.container}>
        { profile &&
            <button onClick={ () => copyToClipboard(JSON.stringify(profile, null, 1)) } >copy to clipboard</button>
        }
        { profile &&
            <button onClick={ () => saveGist(options, profile) } >copy to gist</button>
        }
    </div>
