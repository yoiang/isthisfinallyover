export type Over = {
    over: true

    sources: [string, string][]
}

export type NotOver = {
    over: false
}

export type IsItFinallyOver = {
    over: Over | NotOver
}