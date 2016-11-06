if (Meteor.isClient){
	Bert.defaults.style = 'growl-top-right';
	Bert.defaults.type = 'danger';
	Template.login.events({
		'submit .login': function(event) {
			event.preventDefault();
	        var emailVar = event.target.loginEmail.value;
        	var passwordVar = event.target.loginPassword.value;

			Meteor.loginWithPassword(emailVar, passwordVar, function(err){
	            	if(err){
	                Bert.alert(err);
	            	}else{
									Bert.alert("Welcome back!",'success');
									Meteor.call('recordLogin', Meteor.userId(), function(err) {
										if (Meteor.user().profile.payContribution == "no") FlowRouter.go('/payContribution');
										else if (Meteor.user().profile.waiver == "no") FlowRouter.go('/waiver');
										else FlowRouter.go('/profile');
									});
								}
           		});
		}
	});
}
