[instructor files](https://github.com/martypdx/workshop-express-middleware)

#expressjs app

best practices
* one file for booting app
* one file for including routes (can be recursive)
* define included modules (body parsers, checking of auth) in either route inclusion statements or directly in the route handlers

1. use express to modularize routes
2. use next() to apply logging, errors, etc...

Next
* koa.js
