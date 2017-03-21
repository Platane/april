export const toFetch = ( fileName, state, _fileName ) => {

    if ( fileName && fileName != _fileName )
        return {
            metaKey : (state && state.metaKey || 1 )+1,
            fileName,
        }

    return state || null
}
toFetch.dependencies = [ 'profile.fromGist.fileName' ]


export const toSave = ( action, fileName, profile, state ) => {

    switch( action.type ){
        case 'gist:save' :
            return profile
                ? {
                    metaKey : action.metaKey || state && ( state.metaKey + 1 ) || 1,
                    content : JSON.stringify( profile, null, 1 ),
                    fileName: fileName,
                }
                : state

        default:
            return state || null
    }
}
toSave.source = true
toSave.dependencies = [ 'profile.fromGist.fileName', 'profile.fromPage.value' ]