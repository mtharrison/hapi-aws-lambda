'use strict';

const AWS = require('aws-sdk');

const internals = {};

internals.lambdaHandler = function (lambda) {

    return function (route, options) {

        return function (request, reply) {

            lambda.invoke({
                FunctionName: options.func,
                Payload: JSON.stringify(options.payload)
            },
            (err, data) => {

                if (err) {
                    throw err;
                }

                try {
                    reply(JSON.parse(data.Payload));
                }
                catch (e) {
                    throw e;
                }
            });
        };
    };
};


internals.lambdaMethod = function (lambda, server) {

    return function (name, options) {

        const method = function (payload, next) {

            lambda.invoke({
                FunctionName: name,
                Payload: JSON.stringify(payload)
            },
            (err, data) => {

                if (err) {
                    return next(err);
                }

                try {
                    next(null, JSON.parse(data.Payload));
                }
                catch (e) {
                    return next(e);
                }
            });
        };

        options.generateKey = function (payload) {

            return 'hii';
        };

        return server.method(name, method, options);
    };
};


exports.register = function (server, options, next) {

    for (const i in options.config) {
        AWS.config[i] = options.config[i];
    }

    const lambda = new AWS.Lambda();

    server.handler('lambda', internals.lambdaHandler(lambda));
    server.decorate('server', 'lambda', internals.lambdaMethod(lambda, server));

    next();
};

exports.register.attributes = require('./package');
