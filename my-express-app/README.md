[instructor files](https://github.com/martypdx/workshop-express-middleware)

#expressjs app

best practices
* one file for booting app
* one file for including routes (can be recursive)
* define included modules (body parsers, checking of auth) in either route inclusion statements or directly in the route handlers
* 