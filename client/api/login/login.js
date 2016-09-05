if (Meteor.isClient){
	Template.login.events({
		'submit .login': function(event) {
			event.preventDefault();
	        var emailVar = event.target.loginEmail.value;
        	var passwordVar = event.target.loginPassword.value;

			Meteor.loginWithPassword(emailVar, passwordVar, function(err){
	            	if(err){
	                	alert(err);
	            	}else{
									if (Meteor.user().profile.waiver == "no") FlowRouter.go('/waiver');
									else FlowRouter.go('/');
								}
           		});
		}
	});
}
