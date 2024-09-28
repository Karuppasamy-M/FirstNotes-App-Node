var server = require("../build/server");
var debug = require("debug")("express:server");
var http = require("http");
var path = require("path")
var https = require("https");
var fs = require("fs");
var config = require("config");

const node_cluster_1 = require("node:cluster");
const totalCPUs = require("os").cpus().length;

if (node_cluster_1.isPrimary) {
    console.log(`Number of CPUs is ${totalCPUs}`);
    console.log(`Master ${process.pid} is running`);
    // Fork workers.
    for (let i = 0; i < totalCPUs; i++) {
        node_cluster_1.fork();
    }
    node_cluster_1.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        console.log("Let's fork another worker!");
        node_cluster_1.fork();
    });
} else {

    //create http server
    // var serverPort = normalizePort(process.env.PORT || 6001);
    var serverPort = 3000;
    var app = server.Server.bootstrap().app;
    app.set("port", serverPort);

    var server = http.createServer(app);
    console.log("Server:HTTPS DEV");

    //listen on provided ports
    server.listen(serverPort);

    // Set api time-out 
    server.setTimeout(60000);

    //add error handler
    server.on("error", onError);

    //start listening on port
    server.on("listening", onListening);

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
        if (error.syscall !== "listen") {
            throw error;
        }

        var bind = typeof serverPort === "string" ?
            "Pipe " + serverPort :
            "Port " + serverPort;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case "EACCES":
                console.error(bind + " requires elevated privileges");
                process.exit(1);
                break;
            case "EADDRINUSE":
                console.error(bind + " is already in use");
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
        var bind = typeof addr === "string" ?
            "pipe " + addr :
            "port " + addr.port;
        debug("Listening on " + bind);
        console.log("Server Listening on " + bind);
    }
}