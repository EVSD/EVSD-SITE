if(Meteor.isClient){

	//functions
	Template.tSignup.helpers({
		users: function(){
			return Meteor.users.find({}); //only return certain fields
			},
		tournamentList: function (){
			return TournamentList.find({},{
				sort: {"signUpDeadline": -1},
			});
		},	
	});
	Template.tSignup.events({
		//submit is a type of HTML input
		"submit .add-tournament": function(event){
		//use find one to find the tournament
			var e = document.getElementById("tournament");
			var selected = String(e.options[e.selectedIndex].value);
			let theOne = TournamentList.findOne({
				"name": selected
				});
				//consent information
			let studentConsent = event.target.studentConsent.value,
				parentConsent = event.target.parentConsent.value;
				//partner 1
			let userFirst = Meteor.user().profile.firstName,
				userLast = Meteor.user().profile.lastName,
				userEmail = Meteor.user().emails[0].address;

			//selected partner
			let partnerFirst ='', partnerLast ='', partnerEmail ='';

			if (theOne.partner == "yes"){
				let username = event.target.partner.value, //this gets the partner's username
					partner = Meteor.users.findOne({username:username}),
					partnerFirst = partner.profile.firstName,
					partnerLast = partner.profile.lastName,
					partnerEmail = partner.emails[0].address;
			}

			let judgeFirst =' ',judgeLast =' ', judgeEmail =' ', judgePhone =' '
			if (theOne.judges == "yes"){
				judgeFirst= event.target.judgeFirst.value,
			 	judgeLast= event.target.judgeLast.value,
				judgeEmail= event.target.judgeEmail.value,
				judgePhone= event.target.judgePhone.value
			}

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
		"change #tournament": function(event){
			//gets the selected value
			var e = document.getElementById("tournament");
				var selected = String(e.options[e.selectedIndex].value);
				let theOne = TournamentList.findOne({
					"name": selected
				});
			
			if (selected == "default"){
					alert ("Select a Tournament");
				};		
			if (selected != 'default'){
				//check if it has a partner or not
				if (theOne.partner == "no"){
		    		document.getElementById("partnerToggle").style.display = "none";
				}else if (theOne.partner == "yes"){
		    		document.getElementById("partnerToggle").style.display = "block";
				}
				//" " judges or not
				if (theOne.judges == "no"){
		    		document.getElementById("judgesToggle").style.display = "none";
				}else if (theOne.judges == "yes"){
		    		document.getElementById("judgesToggle").style.display = "block";
				}
			};
			//check if it has a deadline or not
		},
	});
}//end of isClient

  	
