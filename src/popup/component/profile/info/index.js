import preact   from 'preact'

import style    from './style.css'

import type {Info as Info_} from '../type/profile'


export const Info = ({ info, experience } : Info_ ) =>
    <div className={style.container}>
        <div className={style.header}>
            <div className={style.pic} style={{ backgroundImage: `url(${info.pic_url})` }} />
        </div>
        <div className={style.content}>
            <div className={style.name}>{ `${info.firstName} ${info.lastName}` }</div>
            <div className={style.list}>
                <div className={style.row}>
                    <div className={style.number}>{ experience.length }</div>
                    <div className={style.label}>experiences</div>
                </div>
                <div className={style.row}>
                    <div className={style.number}>{ 0 }</div>
                    <div className={style.label}>skills</div>
                </div>
                <div className={style.row}>
                    <div className={style.number}>{ 0 }</div>
                    <div className={style.label}>courses</div>
                </div>
            </div>
        </div>
    </div>
