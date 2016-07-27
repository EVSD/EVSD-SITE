if(Meteor.isClient){
	Template.profile.helpers({
		
	  firstName: function() {
	    return Meteor.user().profile.firstName;
	  },
	  lastName: function() {
	    return Meteor.user().profile.lastName;
	  },
  	  username: function() {
	    return Meteor.user().username;
	  },
	  studentGrade: function() {
	    return Meteor.user().profile.studentGrade;
	  },
	  DOB: function() {
	    return Meteor.user().profile.DOB;
	  }
	});
}



/*
	email: function() {
		return Meteor.user().email;
	},

	needs modificaitons as an object. Right now it is being treated like a string. 
	Cannot be returned b/c it is inherently an array or obj (idk rn).
*/	