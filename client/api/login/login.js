if (Meteor.isClient){
	Template.login.events({
		'submit form': function(event) {
			event.preventDefault();
	        var emailVar = event.target.loginEmail.value;
        	var passwordVar = event.target.loginPassword.value;
			console.log("Form submitted");
	        Meteor.loginWithPassword(emailVar, passwordVar);
		}
	});
}