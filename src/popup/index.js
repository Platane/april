import {Content}    from './component/content'
import preact       from 'preact'
import EventEmitter from 'events'

import {init as initCom}        from './service/com'
import {init as initOptions}    from './service/options'
import {init as initGist}       from './service/gist'
import {init as initClipboard}  from './service/clipboard'

const ee = new EventEmitter

const actions = [
    initCom,
    initOptions,
    initGist,
    initClipboard,
].reduce( (actions, fn) => ({ ...actions, ...( fn( ee ) || {} ) }), {} )

{
    const injectState = ( C, eventEmitter: EventEmitter ) => {
        class StateInjector extends preact.Component {

            state = { }

            componentWillMount() {
                eventEmitter.on('update', state => this.setState(state) )
            }

            render( props, state ){
                return <C {...props} {...state} />
            }
        }
        return StateInjector
    }

    const ContentWithState = injectState( Content, ee )

    preact.render( <ContentWithState {...actions} /> , document.getElementById('app') )
}

actions.requestProfile()
actions.requestOptions()