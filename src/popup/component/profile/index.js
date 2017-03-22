import preact   from 'preact'

import style    from './style.css'

import {Info}   from './info'

import type {
    Profile as Profile_,
} from '../type/profile'


export const Profile = ({ info, experience } : Profile_) =>
    <div className={style.container}>
        <Info info={info} experience={experience} />
    </div>