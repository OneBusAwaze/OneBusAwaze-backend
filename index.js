'use strict';

var Hapi = require('hapi');
var Good = require('good');

var server = new Hapi.Server();
server.connection({ port: (process.env.PORT || 5000) });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply(process.env.GREETING);
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        reply('Hi, ' + encodeURIComponent(request.params.name) + '!');
    }
});

server.register({
    register: Good,
    options: {
        reporters: [{
            reporter: require('good-console'),
            args:[{ log: '*', response: '*' }]
        }]
    }
}, function (err) {
    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});