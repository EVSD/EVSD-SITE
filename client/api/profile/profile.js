if(Meteor.isClient){
	Template.profile.onRendered(function() {
    $('select').material_select();
	});
	Template.profile.helpers({
		waiverFile: function () {
			//do something to find the name of the person, and then display it
			return Meteor.user().profile.waiverUrl;
		},
		//student info, broken up so that we can use spacebars
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
		birthdate: function() {
			return Meteor.user().profile.birthdate;
		 },
		email: function() {
			return Meteor.user().emails[0].address;
		 },
	   clubRole: function(){
		   	var role = Meteor.user().roles[0];
		   	if (role == 'member'){
		   		return "Member";
		   	}else if (role == 'admin'){
		   		return "Admin";
		   	}else if (role == 'officer'){
		   		return "Officer";
		   	}else if (role == 'frozen'){
		   		return "Frozen";
		   	}else return "No role";
	   },
		studentPhone:function(){
			return Meteor.user().profile.studentPhoneNo;
		 },
		studentId:function(){
			return Meteor.user().profile.studentId;
		 },
		 waiver: function() {
		 		return Meteor.user().profile.waiverUrl;
		 	},
		//parent1
		//parent2

	});
}
/*

	needs modificaitons as an object. Right now it is being treated like a string.
	Cannot be returned b/c it is inherently an array or obj (idk rn).
*/
