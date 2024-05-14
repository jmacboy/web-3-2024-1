const createSessionCookie = (res, token, refresh) => {
    res.cookie('session', token, {
        maxAge: 1000 * 60 * 1,
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    });
    if (refresh) {
        res.cookie('refresh', refresh, {
            maxAge: 1000 * 60 * 5,
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        });
    }
}
const removeSessionCookie = (res) => {
    res.clearCookie('session');
    res.clearCookie('refresh');
}
module.exports = { createSessionCookie, removeSessionCookie };