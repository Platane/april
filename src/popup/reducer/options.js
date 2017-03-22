import type {Options}       from '../../type'
import type {Action}        from '../action'

export const fromStorage = ( action: Action, state: Options | null ) : Options | null => {
    switch( action.type ){
        case 'options:read' :
            return action.options

        default:
            return state || null
    }
}
fromStorage.source = true


export const fromSetting = ( action: Action, state: Object ) : Object => {
    switch( action.type ){
        case 'options:set' :
            return action.options

        default:
            return state || {}
    }
}
fromSetting.source = true


export const value = ( fromSetting, fromStorage ) =>
    ({ ...(fromStorage || {}) , ...(fromSetting || {}) })

value.dependencies = [ fromSetting, fromStorage ]


export const canWriteGist = ( options ) =>
    !!( options && options.gist_id && options.gh_token )

canWriteGist.dependencies = [ value ]