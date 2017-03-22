export type Action = any

export const readProfilFromPage = profile =>
    ({
        type    : 'profile:page:read',
        profile,
    })

export const goToConfig = () =>
    ({
        type    : 'app:state:panel:set',
        panel   : 'config',
    })

export const goToProfile = () =>
    ({
        type    : 'app:state:panel:set',
        panel   : 'profile',
    })

export const readProfilFromGist = profile =>
    ({
        type    : 'profile:gist:read',
        profile,
    })

export const readOptions = options =>
    ({
        type    : 'options:read',
        options,
    })

export const setOptions = options =>
    ({
        type    : 'options:set',
        options,
    })

export const copyToClipboard = profile =>
    ({
        type    : 'clipboard:copy',
    })

export const saveToGist = profile =>
    ({
        type    : 'gist:save',
    })