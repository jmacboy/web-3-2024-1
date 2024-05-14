const { default: axios } = require("axios");

const postLogin = (username, password) => {
    return new Promise((resolve, reject) => {
        axios.post("http://127.0.0.1:8000/api/token/", {
            username,
            password,
        }, {
            withCredentials: true,
        })
            .then((response) => {
                // console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                if (error.response.status !== 401) {
                    console.log(error);
                }
                reject(error);
            });
    });
}

module.exports = {
    postLogin
};