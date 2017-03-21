import type {Profile}       from '../../type'
import type {Action}        from '../action'

export const fromPage = {}
fromPage.value = ( action: Action, state: ?Profile ) : ?Profile => {
    switch( action.type ){
        case 'profile:page:read' :
            return action.profile

        default:
            return state || null
    }
}
fromPage.value.source = true

fromPage.loaded = ( action: Action, state: ?Profile ) : boolean => {
    switch( action.type ){
        case 'profile:page:read' :
            return true

        default:
            return state || false
    }
}
fromPage.loaded.source = true





export const fromGist = {}
fromGist.fileName = ( profile: ?Profile, state: ?string ) : ?string =>
    profile &&
        `${profile.info.firstName}-${profile.info.lastName}.json`
            .toLowerCase()
            .replace(/ /g, '_')

fromGist.fileName.dependencies = [ fromPage.value ]
fromGist.fileName.stateless = true


fromGist.loaded = ( action: Action, fileName: ?string, state: ?Profile, _fileName: ?string ) : boolean => {

    if ( fileName != _fileName )
        return false

    switch( action.type ){
        case 'profile:gist:read' :
            return true

        default:
            return state || false
    }
}
fromGist.loaded.dependencies = [ fromGist.fileName ]
fromGist.loaded.source = true


fromGist.value = ( action: Action, loaded: boolean, state: ?Profile ) : ?Profile => {

    if ( !loaded )
        return null

    switch( action.type ){
        case 'profile:gist:read' :
            return action.profile

        default:
            return state || null
    }
}
fromGist.value.dependencies = [ fromGist.loaded ]
fromGist.value.source = true





const deepEqual = (a,b) => {
    if( Array.isArray(a) )
        return Array.isArray(b) && a.length == b.length && a.every((_,i) => deepEqual(a[i], b[i]))

    else if ( typeof a == 'object' && a )
        return typeof b == 'object' && b && Object.keys(a).every(key => deepEqual(a[key], b[key]))

    else
        return a === b
}

fromGist.equal = ( a, b ) => deepEqual( a, b )
fromGist.equal.dependencies = [ fromGist.value, fromPage.value ]
fromGist.equal.stateless = true