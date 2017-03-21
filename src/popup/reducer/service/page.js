export const toFetch = ( loaded, state ) => {

    if ( !loaded )
        return {
            metaKey : (state && state.metaKey || 1 )+1,
        }

    return state || null
}
toFetch.dependencies = [ 'profile.fromPage.loaded' ]