"use strict";
var server = require('../server');
var debug = require('debug')('express:server');
var http = require('http');
var https = require('https');
var path = require('path');
var fs = require('fs');
// create http server
var serverPort = normalizePort(process.env.PORT || 7000);
var app = server.Server.bootstrap().app;
app.set('port', serverPort);
var options = {
    key: fs.readFileSync(path.normalize(__dirname + '/../../src/bin/ssl/key.pem')),
    cert: fs.readFileSync(path.normalize(__dirname + '/../../src/bin/ssl/cert.pem'))
    // ca: fs.readFileSync('ca_bundle.crt'),
};
var server = https.createServer(options, app);
// var server = http.createServer(app);
console.log('Server:HTTPs Dev');
// listen on provided ports
server.listen(serverPort);
// add error handler
server.on('error', onError);
// start listening on port
server.on('listening', onListening);
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof serverPort === 'string' ?
        'Pipe ' + serverPort :
        'Port ' + serverPort;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    debug('Listening on ' + bind);
    console.log('Notes app runnung post is ' + bind);
}
