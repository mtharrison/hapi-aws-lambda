var AWS = require('aws-sdk');


var internals = {};


internals.lambdaHandler = function (lambda) {

    return function (route, options) {

        return function (request, reply) {

            lambda.invoke({
                FunctionName: options.func,
                Payload: JSON.stringify(options.payload)
            },
            function (err, data) {

                if (err) {
                    throw err;
                }

                try {
                    var payload = JSON.parse(data.Payload);
                } catch (e) {
                    throw e;
                }

                reply(payload);
            });
        };
    };
};


internals.lambdaMethod = function (lambda, server) {

    return function (name, options) {

        var method = function (payload, next) {

            lambda.invoke({
                FunctionName: name,
                Payload: JSON.stringify(payload)
            },
            function (err, data) {

                if (err) {
                    return next(err);
                }

                try {
                    var payload = JSON.parse(data.Payload);
                } catch (e) {
                    return next(e);
                }

                next(null, payload);
            });
        };

        options.generateKey = function (payload) {

            return 'hii';
        };

        return server.method(name, method, options);
    };
};


exports.register = function (server, options, next) {

    for (var i in options.config) {
        AWS.config[i] = options.config[i];
    }

    var lambda = new AWS.Lambda();

    server.handler('lambda', internals.lambdaHandler(lambda));
    server.decorate('server', 'lambda', internals.lambdaMethod(lambda, server));

    next();
};

exports.register.attributes = require('./package');
