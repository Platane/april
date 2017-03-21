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
        default:
            return state || {}
    }
}
fromSetting.source = true


export const value = ( fromSetting, fromStorage ) =>
    fromStorage || fromSetting

value.dependencies = [ fromSetting, fromStorage ]