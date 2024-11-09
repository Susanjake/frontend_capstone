export function setPage(pageName) {
    localStorage.setItem('page',pageName);
    return { type: 'setPage', payload: pageName };
}

export function setAuthenticated(userInfo) {
    return { type: 'setAuthenticated', payload: userInfo }
}