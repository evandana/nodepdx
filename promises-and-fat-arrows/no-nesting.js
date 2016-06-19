// NESTING
getUser(userId)
	.the(user => {
		getGroup(user.grouId)
			.then(group => res.send( group ));
	});

// NO NESTING
getUser(userId)
	.then( user => getGroup(user.groupId) )
	.then( group => res.send( group ));