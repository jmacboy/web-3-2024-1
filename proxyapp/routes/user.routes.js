module.exports = (app) => {
    const bodyParser = require('body-parser');
    const userController = require('../controllers/user.controller');
    let router = require('express').Router();

    router.post('/login', bodyParser.json(), userController.login);
    
    app.use('/auth', router);
}