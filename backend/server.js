const app = require('./app');
const debug = require("debug")("mini-twitter");
const http = require('http')

const normalizePort = (val) => {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        //  name pipe
        return val
    }

    if (port >= 0) {
        //  port number
        return port
    }

    return false;
}

const onError = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privalages");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1)
            break;
        default:
            throw error
    }
}

const onListening = () =>{
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
    debug("listening on " + bind)
}

const port = normalizePort(process.env.port || "3000");
app.set("port", port)

const server = http.createServer(app);
server.on("error", onError)
server.on("listening", onListening)
server.listen(port);
