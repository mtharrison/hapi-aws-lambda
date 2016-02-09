hapi-aws-lambda
===============

Call AWS lambda functions from your hapi apps! And get all the goodness of server methods, including free caching.

Installation
------------

```javascript
const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 4000 });

server.register({
    register: require('hapi-aws-lambda'),
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

    if (err) {
        throw err;
    }

    // Use it here!

    server.start(() => {
        console.log('Server started!');
    });
});
```

Usage
-----

**The lamda handler**

``` javascript
server.route({
    method: 'GET',
    path: '/',
    handler: {
        lambda: {
            func: 'myExampleFunction', // short name or full arn
            payload: { name: 'matt' }
        }
    }
});
```

**The lamda server method (free caching for your lambdas!)**

``` javascript
server.lambda('myExampleFunction', {
    cache: {
        expiresIn: 10000
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        server.methods.myExampleFunction({ name: 'matt' }, (err, data) => {

            if (err) {
                throw err;
            }

            reply(data);
        });
    }
});
```
