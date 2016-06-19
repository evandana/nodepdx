const app = require('express')();
const getBodyParser = require('./module-body-parser');
const petsRouter = require( './pets-router');
const getCheckAuth = require('./check-auth')

let bodyParser = getBodyParser();
let checkAuth = getCheckAuth('sekrit');

// app.get('/', (req, res) => {
// 	res.send('hello world')
// });



// app.get('/', (req, res) => {


// 	let queriesAsStr = req.query.map( (prev, curr) => {

// 		console.log(curr);
// 		return prev + curr;
// 	});


//     res.send('apple:' + req.query['apple']);
// });


// const bodyParser = function( req, res, next) {
// 	let body = ''; 

// 	req.on( 'data', chunk => {
// 		body += chunk;
// 	});

// 	req.on( 'end', () => {
// 		req.body = body ? JSON.parse( body ) : null;
// 		next();
// 	});

// });


// app.use( bodyParser );


app.post( '/open', bodyParser, (req, res, next) => {
	res.send( req.body );
});

app.post( '/private', checkAuth, bodyParser, (req, res, next) => {
	res.send( req.body );
});


// app.use is a "mounting path"
app.use( '/api/pets', checkAuth, petsRouter );
	

app.use( ( err, req, res, next ) => {

	console.log('apple')

	const code = err.code ? err.code : 500;
	const error = err.error ? err.error : err || 'Internal error';
	res.status(code).send( {error} );
})

// app.use( '/', ( req, res, next ) => {
// 	res.send('apple')
// 	next();
// });

const port = 8081;
app.listen(port, () => console.log('running on port', port));   