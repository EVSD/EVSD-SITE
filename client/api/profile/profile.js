if(Meteor.isClient){
	
	Template.profile.helpers({
		
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

		//parent1
		//parent2

	});  

	Template.adminView.helpers({
		users: function (){
			return Meteor.users.find({}); 
		}
	});
}
/*

	needs modificaitons as an object. Right now it is being treated like a string. 
	Cannot be returned b/c it is inherently an array or obj (idk rn).
*/