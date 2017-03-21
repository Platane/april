export const toCopy = ( action: Action, profile: Profile, state ) => {
    switch( action.type ){
        case 'clipboard:copy' :
            return profile
                ? {
                    metaKey : action.metaKey || state && ( state.metaKey + 1 ) || 1,
                    text    : JSON.stringify( profile, null, 1 )
                }
                : state

        default:
            return state || null
    }
}
toCopy.source = true
toCopy.dependencies = [ 'profile.fromPage.value' ]