const fs = require( 'fs' );

function readdir( dir ) {
		return new Promise( ( resolve, reject ) => {
			fs.readdir( dir, ( err, files ) => {
				if ( err ) reject( err );
				else resolve( files );
			});
		});
};

function readFile( fileName ) {
		return new Promise( ( resolve, reject ) => {
			fs.readFile( fileName, 'utf-8', ( err, text ) => {
				if ( err ) reject( err );
				else resolve( text );
			});
		});
};

function getAllFiles( dir ) {

	// UGLY APPROACH - not yet working
	// let filePromises = readdir( dir )
	// 	.then( files => { 
	// 		return files.map( file => {
	// 			// console.log('dir + file', dir + '/' + file);
	// 			return readFile( dir + '/' + file );
	// 		});
	// 	});

	// return Promise.all( filePromisesm )
	// 	.then( results => {
	// 		results.map( result => {
	// 			console.log('result', result);
	// 		})
	// 	});
	
	// CLEAN APPROACH
	return readdir( dir )
		.then( files => files.map( f => dir + '/' + f ) )
		.then( filePaths => filePaths.map( f => readFile( f ) ) )
		.then( promises => Promise.all( promises ) );
}

getAllFiles( __dirname + '/test/dir' )
	.then( files => console.log( files ) )
	.catch( err => console.log(err) );