import {App}        from './component/app'
import preact       from 'preact'
import EventEmitter from 'events'

import {init as initPage}       from './service/page'
import {init as initOptions}    from './service/options'
import {init as initGist}       from './service/gist'
import {init as initClipboard}  from './service/clipboard'

import { createStore, applyMiddleware, compose } from 'redux'
import createReducer            from 'refinery-js'
// import ReactDOM                 from 'react-dom'
// import {Provider}               from 'react-redux'
// import React                    from 'react'
import * as reducerTree         from './reducer'
import * as action              from './action'

import type {Action}            from './action'
import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux'

export type Store       = ReduxStore<Object, Action>
export type Dispatch    = ReduxDispatch<Action>


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
    const injectState = ( C, store: Store ) => {
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
    initGist,
    initPage,
    initClipboard,
].forEach( fn => fn( store ) )

store.dispatch({type:'##'})


window.store = store