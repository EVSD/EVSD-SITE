Template.editView.onRendered(function() {
	$('select').material_select();
	$('.birthdate').pickadate({
		selectMonths: true, // Creates a dropdown to control month
		selectYears: true,
		min: new Date(1998,9,1),
  	max: new Date(2003,12,31),
		closeOnSelect: true,
    closeOnClear: true,
	});
});
Template.editView.events({

	'submit .editView': function(event) {
	    if (confirm('Are you sure?')) {
	        let changes ={
		        	firstName: event.target.firstName.value,
		        	lastName: event.target.lastName.value,
		        	grade: event.target.grade.value,
		        	//email = event.target.email.value,
		        	birthdate: event.target.birthdate.value,
		        	studentPhone: event.target.studentPhone.value,
		        	studentId: event.target.studentId.value,
		        	//password stuff
		        	//oldPassword: event.target.old.value,
					//newPassword: event.target.new.value,
					//confirmPassword: event.target.confirm.value
	        		};
							console.log(changes.studentPhone);
			let userId = Meteor.userId();


			Meteor.call('editProfile', changes, userId, function(err){
	            	if(err){
	                	console.log(err);
	            	}
           		});
		let oldPassword = event.target.old.value,
				newPassword = event.target.new.value,
				confirmPassword = event.target.confirm.value;

			if (newPassword != '' && confirmPassword!= '' && oldPassword != '' && (confirmPassword == newPassword)){
				Accounts.changePassword(oldPassword, newPassword, function(err){
	            	if(err){ console.log(err); }
           		});
				FlowRouter.go('/');
			}//send an error callback

		} else {
			alert("You did not save any changes. Click back to go to main profile");
	        }
	},
});

//can edit everything but the email, password, and username
	//(need to find a way later)

/* MARK: About Emails (and probably passwords and usernames too)
	The email is a little bit tricker, you have to do this from the server since
	(in a meteor.methods/call perhaps) you can't modify the email stuff from the client,
	I would suggest adding a new email and having it verified instead of changing the existing
	email (since its also their login). Or having it verified first then changing it so as not to
	change someones email to something where they can't recover their password.

	i.e. Meteor.users.update({_id:Meteor.user()._id}, {$set:{"emails":[{address:"newemail@newemail.com"}]}); //1 email
	Meteor.users.update({_id:Meteor.user()._id}, {$addToSet:{"emails":{address:"newemail@newemail.com","verified":false}}}); //multiple verified

	***of course, now this has to be done server-sided***

*/
