Meteor.methods({
	setRoleOnUser( options ) {
	    check( options, {
	      user: String,
	      role: String
	    });
	    if (options.role != 'admin'){
		    try {
		      Roles.setUserRoles( options.user, [ options.role ] );
		    } catch( exception ) {
		      return exception;
		    }
		}
	},
});
