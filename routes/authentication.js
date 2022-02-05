var express = require('express');
var router = express.Router();
let AuthenticationService = require('../services/authentication.service')
/* GET users listing. */
router.get('/', function(req, res, next) {
    var authenticationService = new AuthenticationService();
    var token = authenticationService.GenerateToken();
    res.send (token);
});

module.exports = router;
