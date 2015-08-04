var connect = require('connect');
var serveStatic = require('serve-static');
var port = process.env.PORT || 3000;
connect().use(serveStatic(__dirname)).listen(port);