const express = require('express');
const proxy = require('http-proxy');    

var api = express();
var apiProxy = proxy.createProxyServer();;

api.all('/api/v1/auth/*', (req, res) => {
    apiProxy.web(req, res, {target: 'http://loacalhost:8001'})
});

api.all('/api/v1/files/*', (req, res) => {
    apiProxy.web(req, res, {target: 'http://loacalhost:8002'})
});

api.all('/api/v1/filmovi/*', (req, res) => {
    apiProxy.web(req, res, {target: 'http://loacalhost:8080'})
});


api.listen(5000, err => {
    if(err){
        console.log('could not start server')
        return;
    }
    console.log('server started successfully on port 5000')
});