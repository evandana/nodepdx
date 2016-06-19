const fs = require( 'fs' );

function readFile( fileName ) {
		
		const promise = new Promise( ( resolve, reject ) => {
			fs.readFile( fileName, 'utf-8', ( err, text ) => {
				if ( err ) reject( err );
				else resolve( text );
			});
		});

		return promise;
};

let n = 0;

function logResult( result ) {
	console.log('promise ' + n++ + ': ' + result);
}

readFile( 'foo.txt' )
	.then( text => {
		logResult(text);
		return readFile( text.trim() );
	})
	.then( result => {
		logResult(result);
		return result.toUpperCase();
	})
	.then( text => {
		logResult(text);
		return text.split('').reverse().join('');
	})
	.then( result => {
		logResult(result);
		return result;
	})
	.catch( err => {
		console.log('err', err);
	})