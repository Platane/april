export type Action = any

export const readProfilFromPage = profile =>
    ({
        type    : 'profile:page:read',
        profile,
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

export const copyToClipboard = profile =>
    ({
        type    : 'clipboard:copy',
    })

export const saveToGist = profile =>
    ({
        type    : 'gist:save',
    })