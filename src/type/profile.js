
export type Info = {
    firstName       : ?string,
    lastName        : ?string,
    headline        : ?string,
    summary         : ?string,
    pic_url         : ?string,
}

export type Company = {
    name            : ?string,
    logo_url        : ?string,
    linkedin_url    : ?string,
}

export type Media = {
    type            : 'pic',
    title           : ?string,
    media_url       : ?string,
}

export type Experience = {
    company         : Company,
    position        : string,
    startDate       : string,
    endDate         : string,
    description     : string,
    media           : Array<Media>,
}

export type Profile = {
    info        : Info,
    experience  : Array<Experience>,
}

export type Options = {
    gh_token    : ?string,
    gist_id     : ?string,
}