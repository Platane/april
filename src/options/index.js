import {App}        from '../popup/component/app'
import preact       from 'preact'

import {init as initOptions}    from '../popup/service/options'

import { createStore, applyMiddleware, compose } from 'redux'
import createReducer            from 'refinery-js'
import * as reducerTree         from '../popup/reducer'
import {goToConfig}             from '../popup/action'


let store
{

    const { reduce, initState } = createReducer( reducerTree )

    const crashReporter = store => next => action => {
        try {
            return next(action)
        } catch (err) {
            console.error('Caught an exception!', err)
            throw err
        }
    }

    // create redux store
    const middlewares = [
        crashReporter,
    ]
    const enhancers = [
        ...(
            'undefined' != typeof window && window.__REDUX_DEVTOOLS_EXTENSION__
            ? [ window.__REDUX_DEVTOOLS_EXTENSION__({ maxAge: 50, latency: 500 }) ]
            : []
        ),
        applyMiddleware( ...middlewares ),
    ]
    store = createStore( reduce, initState, compose( ...enhancers ) )
}

{
    const injectState = ( C, store ) => {
        class StateInjector extends preact.Component {

            state = { }

            getChildContext(){
                return {
                    store
                }
            }

            componentWillMount() {
                store.subscribe( () => this.setState(store.getState()) )
            }

            render( props, state ){
                return <C {...props} {...state} />
            }
        }
        return StateInjector
    }

    const ContentWithState = injectState( App, store )

    preact.render( <ContentWithState /> , document.getElementById('app') )
}


;[
    initOptions,
].forEach( fn => fn( store ) )

store.dispatch(goToConfig())


window.store = store