if (Meteor.isClient){
	Template.initialLogin.events({
		'submit .login': function(event) {
			event.preventDefault();
	        var emailVar = event.target.loginEmail.value;
        	var passwordVar = event.target.loginPassword.value;

			Meteor.loginWithPassword(emailVar, passwordVar, function(err){
	            	if(err){
	                	alert(err);
	            	}else{
									FlowRouter.go('/waiver');
								}
           		});
		}
	});
}
