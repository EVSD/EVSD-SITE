if (Meteor.isClient){
	Template.initialLogin.events({
		'submit .login': function(event) {
			event.preventDefault();
	        var emailVar = event.target.loginEmail.value;
        	var passwordVar = event.target.loginPassword.value;

			Meteor.loginWithPassword(emailVar, passwordVar, function(err){
	            	if(err){
	                	Bert.alert(err);
	            	}else{
									Meteor.call('recordLogin', Meteor.userId(), function(err) {
										if (Meteor.user().profile.payContribution == "no") FlowRouter.go('/payContribution');
										else if (Meteor.user().profile.waiver == "no") FlowRouter.go('/waiver');
										else FlowRouter.go('/profile');
									}
								}
           		});
		}
	});
}
