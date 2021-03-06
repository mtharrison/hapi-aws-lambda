'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 4000 });

server.register({
    register: require('./index'),
    options: {
        config: {
            region: 'us-east-1',
            credentials: {
                accessKeyId: 'XXX',
                secretAccessKey: 'XXX'
            }
        }
    }
}, (err) => {

    server.lambda('myExampleFunction', {
        cache: {
            expiresIn: 10000
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: {
            lambda: {
                func: 'myExampleFunction',
                payload: { name: 'matt' }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/method',
        handler: function (request, reply) {

            server.methods.myExampleFunction({ name: 'matt' }, (err, data) => {

                if (err) {
                    throw err;
                }

                reply(data);
            });
        }
    });

    if (err) {
        throw err;
    }

    server.start(() => {

        console.log('Server started!');
    });
});
