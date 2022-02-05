let express = require('express')
let bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');

class AuthenticationService {
    GenerateToken()
    {
        let content={"user":"dummyuser"};
        let secret="TOBEIMPLEMENTED";
        let token =jwt.sign(content, secret,{expiresIn: 1440}    ,null);
        return token;
    }
}

module.exports=AuthenticationService;

