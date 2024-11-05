export function setPage(pageName) {
    return { type: 'setPage', payload: pageName };
}

export function setAuthenticated(userInfo) {
    return { type: 'setAuthenticated', payload: userInfo }
}