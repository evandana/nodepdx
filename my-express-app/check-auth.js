module.exports = function getCheckAuth(tokenStr) {

	return function ( req, res, next) {
		let token = req.get('Auth');

		console.log('token' + token)

		if (token && token === tokenStr ) {
			next();
		} else {
			next( {
				code: 400,
				status: 'Not authorized'
			})
		}
	}
}