import preact   from 'preact'

import style    from './style.css'

import type {Info as Info_} from '../type/profile'


export const Info = ({ firstName, lastName, pic_url } : Info_ ) =>
    <div className={style.container}>
        <div className={style.header}>
            <div className={style.pic} style={{ backgroundImage: `url(${pic_url})` }} />
        </div>
        <div className={style.content}>
            <div className={style.name}>{ `${firstName} ${lastName}` }</div>
        </div>
    </div>
