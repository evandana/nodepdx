module.exports = function getBodyParser( arg1, arg2) {
	
	return function( req, res, next) {
		let body = ''; 

		req.on( 'data', chunk => {
			body += chunk;
		});

		req.on( 'end', () => {
			req.body = body ? JSON.parse( body ) : null;
			next();
		});

	};

};