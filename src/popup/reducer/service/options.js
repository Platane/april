export const toFetch = ( options, state ) => {

    if ( !options )
        return {
            metaKey : (state && state.metaKey || 1 )+1,
        }

    return state || null
}
toFetch.dependencies = [ 'options.fromStorage' ]



export const toSave = ( fromStorage, fromSetting, state ) => {

    if ( Object.keys(fromSetting).some( key => fromStorage[key] != fromSetting[key] ) )
        return {
            metaKey : (state && state.metaKey || 1 )+1,
            options : fromSetting,
        }

    return state || null
}
toSave.dependencies = [ 'options.fromStorage', 'options.fromSetting' ]