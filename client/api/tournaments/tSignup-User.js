if(Meteor.isClient){

	//functions
	Template.tSignup.helpers({
		users: function(){
			return Meteor.users.find({}); //only return certain fields
			},
		tournamentList: function (){
			return TournamentList.find({},{
				fields:{
					'cost': 1,
					'judges': 1,
					'name': 1,
					'partner': 1,
					'paymentDeadline': 1,
					'signUpDeadline': 1
				},
				sort: {"signUpDeadline": -1},
			});
		},	
	});
	Template.tSignup.events({
		//submit is a type of HTML input
		"submit .add-tournament": function(event){
			//use find one to find the tournament
			let e = document.getElementById("tournament");
			var selected = String(e.options[e.selectedIndex].value);
			let theOne = TournamentList.findOne({
				"name": selected
				});

			let studentConsent = event.target.studentConsent.value,
				parentConsent = event.target.parentConsent.value,
				userFirst = Meteor.user().profile.firstName,
				userLast = Meteor.user().profile.lastName,
				userEmail = Meteor.user().emails[0].address;

			//selected partner

				let username = event.target.partner.value, //this gets the partner's username
					partner = Meteor.users.findOne({username:username}),
					partnerFirst = partner.profile.firstName,
					partnerLast = partner.profile.lastName,
					partnerEmail = partner.emails[0].address;

				let judgeFirst= event.target.judgeFirst.value,
				 	judgeLast= event.target.judgeLast.value,
					judgeEmail= event.target.judgeEmail.value,
					judgePhone= event.target.judgePhone.value



			if(parentConsent == "yes" && studentConsent == "yes"){
					var entry ={
						 tournament : event.target.tournament.value,
						 userFirst : userFirst,
						 userLast : userLast,
						 userEmail : userEmail,
						 
						 partnerFirst : partnerFirst,
						 partnerLast : partnerLast,
						 partnerEmail : partnerEmail,
						 
						 studentConsent: studentConsent,
						 parentConsent: parentConsent,
						 judgeFirst: judgeFirst,
						 judgeLast: judgeLast,
						 judgeEmail: judgeEmail,
						 judgePhone: judgePhone,
						}
						//in the display determine it based off of tournament
				};
			Meteor.call('createEntry',entry);
					//FlowRouter.go('/tournaments/myTournaments');

					//send some confirmation alert
			},
	});
}//end of isClient

  	
