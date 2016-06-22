#speaker
[nodeprogram.com](nodeprogram.com)

[slides and code examples](github.com/azat-co/node-patterns/issues)

#Node basics
* non-blocking i/o
* async + event driven


#Why js?
* async code is hard
* async code is exponentially complex


#Problem - How do we schedule things in the future?

##Callbacks

##Callback convention
* callback is last arg
* error is first arg
* data is second and beyond


#Problem - how to ensure right sequence? (callback hell)

## Solution

* naming/hoisting functions
    * error debugging: name of function 
* abstract function into modules

        module.exports = {...} // good for only one
        module.exports.obj = {...}
        exports.obj = {...}

        // `obj` is the name of the module

    `exports = {...}` is anti pattern

* functions

        module.exports = function(options) {...} // good for only one
        module.exports.obj = function(options) {...}
        exports.obj = function(options) {...}

        // `obj` is the name of the module


#importing folder/plugin

    // main.js
    var routes = require('./routes')

    // routes/index.js
    module.exports = {
        users: require('./users.js'),
        accounts: require('./accounts.js')
    }

#singletons

require when modules are cached

* one state across whole app (config)

        // module.js
        var a = 1 // private
        module.exports = {
            b: 2 // Public
        }

        // module.js
        var a = 1 // private
        module.exports = {
            b: 2 // Public
        }

#caching based on filenames (case is important)

##solution
* `global`

    _log = global.console.log
    global.console.log = function () { ... }

* use it sparingly
* *is an anti-pattern!*

#organize code into classes
* ES5 classes are too complex
* ES6 classes are not perfect

##solution: function factory

    module.exports = function(options) {...}

##solution 2: inherit 

##solution 3: decorator

##solutions 4: prototype decorator
* github.com/shouldjs/should.js has this pattern
* bdd

#problem - non-blocking i/o can be blocked
    
    setTimeout( () => {...}, 1000 )
    process.nextTick( () => {...} )
    setImmedite( () => {...} )

#problem - ensure continuity

#problem - dependency injection with express middleware

    app.use(session({
        store: require('connect-session-knex')()
    }));

#express routes

    // routes/index.js
    module.exports = function (app) {
        // define routes here
    }

