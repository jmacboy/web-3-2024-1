const { postLogin } = require("../services/auth.service");
const { createSessionCookie, removeSessionCookie } = require("../utilities/cookie.utilities");

exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    postLogin(username, password)
        .then((data) => {
            const token = data.access;
            const refresh = data.refresh;
            createSessionCookie(res, token, refresh);
            res.send({
                message: "Login successful",
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(401).send({
                message: "Invalid credentials",
            });
        });
}
exports.logout = (req, res) => {
    removeSessionCookie(res);
    res.send({
        message: "Logout successful",
    });
}