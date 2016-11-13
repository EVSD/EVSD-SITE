if(Meteor.isClient){
	//functions

	Template.myTournaments.helpers({
		tournaments: function (){
			// var t = Tournaments.find({
			// 	p1FirstName: Meteor.user().profile.firstName, p1LastName:Meteor.user().profile.lastName
			// },{
	    //     	sort: {"tournament":1, "createdAt": -1},
    	// 	}).fetch();
			// 	t.push.apply(t,Tournaments.find({
			// 		p2FirstName: Meteor.user().profile.firstName, p2LastName:Meteor.user().profile.lastName
			// 	},{
		  //       	sort: {"tournament":1, "createdAt": -1},
	    // 		}).fetch());
			// 	return _.sortBy(t, "createdAt").reverse();
			return Tournaments.find({$or: [{p1FirstName: Meteor.user().profile.firstName},{p2FirstName: Meteor.user().profile.firstName}],
					$or: [{p1LastName: Meteor.user().profile.lastName},{p2LastName: Meteor.user().profile.lastName}],
			},{
	        	sort: {"tournament":1, "createdAt": -1},
    		}).fetch();
			},
			notDeleted: function() {
				return !(this.approved == "deleted");
			},
			rejected: function() {
				return this.approved == "rejected";
			}

	});
	Template.myTournaments.events({
		"click .delete-entry": function(event){
			if (confirm("Are you sure you want to delete this entry? Note: The entry will remain for record purposes, but will be marked as deleted")) {
			Meteor.call('removeEntry', this._id, function(err){
	            	if(err){
	                	console.log(err);
	            	}
           		});
						}
		},
		"click .restore-entry": function(event) {
			if (confirm("Are you sure you want to restore this entry?")) {
				Meteor.call("restoreEntry", this._id, function(err) {
					if (err) {
						console.log(err);
					}
				});
			}
		},
		"click #payfromstripe": function(event){
			event.preventDefault();
			//get the tournament in question
			let tournament = this.tournament;
			console.log(tournament);
			let theOne = TournamentList.findOne({
				"name": tournament
				});
			//
			// let studentConsent = event.target.studentConsent.value,
			// 	parentConsent = event.target.parentConsent.value;

			let price = theOne.cost,
				tournamentName = this.tournament,
				entryId = this._id; //test to see if this works
			// if(parentConsent == "yes" && studentConsent == "yes"){
				//payment and account creation
				StripeCheckout.open({
			    	key: Meteor.settings.public.stripe.livePublishableKey,
			        amount: price * 100,
			        name: 'Tournament Payment',
			        // description: 'As reviewed in the Parent Orientation, this is the bare minimum we need to cover coaching expenses and salaries, facilities, school tournament fees, club events, financial aid & subsidies to students, league fees, professional material, and much more. Most schools ask for around $400-$600, so we are trying our best to do with as little aid as possible. Please contact team administration at evhs.sd@gmail.com for questions or concerns. We use Paypal and Stripe software to power our payment process, which means our platform is verified and 100% safe. Because we are a registered 501c3 under California State Government and an ESUHSD Booster, your contribution is tax-deductible.',
			        description: 'description goes here',
			        panelLabel: 'Pay Now',
		       		//get user email
			        token: function(response) {
			        	stripeToken = response.id;
			        	Meteor.apply('payEntryPartner', [stripeToken, price, entryId, tournamentName], {noRetry: true});
									Bert.alert("Success! Your payment has been received", "success", "fixed-top");
			        }
			    });
			// }else Bert.alert("Agree to the terms for both parent and student.");
		},//end of partnerPay
		"click #payfrombalance": function(event){
			event.preventDefault();
			//get the tournament in question
			let tournament = this.tournament;
			console.log(tournament);
			let theOne = TournamentList.findOne({
				"name": tournament
				});

			let price = theOne.cost,
				tournamentName = this.tournament,
				entryId = this._id; //test to see if this works

				Bert.alert("Success! Your payment has been received", "success", "fixed-top");
			Meteor.apply('updateBalance', [entryId, tournamentName, price], {noRetry: true});
			// }else Bert.alert("Agree to the terms for both parent and student.");
		},//end of partnerPay
	});
}
