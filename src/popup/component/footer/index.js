import preact from 'preact'
import style    from './style.css'

import {copyToClipboard, saveToGist} from '../../action'

export const Footer = ({ profile, gistSaved, dispatch }) =>
    <div className={style.container}>
        { profile &&
            <button onClick={ () => dispatch(copyToClipboard()) } >copy to clipboard</button>
        }
        { profile && !gistSaved &&
            <button onClick={ () => dispatch(saveToGist()) } >save to gist</button>
        }
    </div>
