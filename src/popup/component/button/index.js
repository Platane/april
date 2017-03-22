import preact   from 'preact'
import style    from './style.css'

const c = (...arr) =>
    arr.filter( Boolean ).join(' ')

export const Button = ({ onClick, label, sublabel, onClickSecondary }) =>
    <div className={style.container}>
        { sublabel &&
            <div className={style.sublabel}>
                <a onClick={onClickSecondary}>{ sublabel }</a>
            </div>
        }
        { sublabel &&
            <div className={style.sublabelShadow} />
        }
        <div className={c(style.button, !onClick && style.button_disabled)} onClick={onClick} >{ label }</div>
    </div>
