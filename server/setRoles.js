Meteor.methods({
	setRole: function (userId, role){
		Roles.setUserRoles( userId, role );
	},
	setRoleOnUser( options ) {
    check( options, {
      user: String,
      role: String
    });

    try {
      Roles.setUserRoles( options.user, options.role  );
      console.log("set user role " + options.role);
    } catch( exception ) {
      return exception;
      console.log("failed to set user role" + options.role);

    }
  }
});