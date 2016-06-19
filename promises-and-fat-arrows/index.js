const fs = require( 'fs' );

function readMyFile( fileName ) {
		
		const promise = new Promise( ( resolve, reject ) => {
			fs.readFile( fileName, 'utf-8', ( err, text ) => {
				if ( err ) reject( err );
				else resolve( text );
			});
		});

		return promise;
};

const promise1 = readMyFile( 'foo.txt' );

let n = 0;

function getPromiseCount() {
	return 'promise' + n++;
}

readMyFile( 'foo.txt' )
	.then( text => {
		console.log( getPromiseCount(), text );
		return text.toUpperCase();
	})
	.then( result => {
		console.log( getPromiseCount(), result );
		return result.toLowerCase()
	})
	.then( result => {
		console.log( getPromiseCount(), result );
	})