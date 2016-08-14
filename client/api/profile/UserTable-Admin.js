if (Meteor.isClient){
	Template.userTable.helpers({
		users: function (){
			return Meteor.users.find({}); 
		}
	});
	Template.userTable.events({
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
		},
	});
}