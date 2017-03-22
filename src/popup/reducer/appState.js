import type {Profile}       from '../../type'
import type {Action}        from '../action'

const availablePanels = [
    'profile',
    'home',
    'config',
]

export const panel = ( action: Action, profile: Profile, panel: ?string, _profile: Profile ) : ?string => {

    if ( _profile != profile )
        panel = 'profile'

    switch( action.type ){
        case 'app:state:panel:set' :
            panel = action.panel
            break
    }

    if ( !availablePanels.includes( panel ) )
        panel = availablePanels[0]

    if ( !profile && panel == 'profile' )
        panel = 'home'

    return panel
}
panel.source = true
panel.dependencies = [ 'profile.fromPage.value' ]
