if (Meteor.isClient){
	Template.adminView.helpers({
		users: function (){
			return Meteor.users.find({}); 
		}
	});
	Template.adminView.events({
	   	//change user roles
		'change [name="userRole"]': function( event) {
			if (confirm('Are you sure?')){
				let role = $( event.target ).find( 'option:selected' ).val();
			    //console.log(role);
			    Meteor.call( "setRoleOnUser", {
			      user: this._id,
			      role: role
			    }, ( error, response ) => {
			      if ( error ) {
			        Bert.alert( error.reason, "warning" );
			      }
			    	});
			}else {
				return false;
			}
		}

	});	
	Template.registerHelper( 'isCurrentUser', ( currentUser ) => {
	  return currentUser === Meteor.userId() ? true : false;
	});

	Template.registerHelper( 'disableIfAdmin', ( userId ) => {
	  if ( Meteor.userId() === userId ) {
	    return Roles.userIsInRole( userId, 'admin' ) ? "disabled" : "";
	  }
	});
	Template.registerHelper( 'selected', ( v1, v2 ) => {
	  return v1 === v2 ? true : false;
	});
	/*Template.registerHelper( 'displayTournament', ( v1, v2 ) => {
	  
	  return v1 === v2 ? true : false;
	});*/

}