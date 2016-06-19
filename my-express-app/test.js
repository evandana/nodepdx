const app = require('express')();
const getBodyParser = require('./module-body-parser');

let bodyParser = getBodyParser();

app.get('/', (req, res) => {
	res.send('hello world')
});


function checkAuth( req, res, next) {
	let token = req.get('Auth');

	if (token && token === 'sekrit' ) {
		next();
	} else {
		res.status(400).send('not authorized');
	}
}


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


// app.use( '/', ( req, res, next ) => {
// 	res.send('apple')
// 	next();
// });

const port = 8081;
app.listen(port, () => console.log('running on port', port));   