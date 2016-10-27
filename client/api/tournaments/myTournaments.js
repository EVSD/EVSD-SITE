if(Meteor.isClient){
	//functions

	Template.myTournaments.helpers({
		tournaments: function (){
			return Tournaments.find({},{
	        	sort: {"tournament":1, "createdAt": -1},
    		})
			},

	});
	Template.myTournaments.events({
		"click .delete-entry": function(event){
			if (confirm("Are you sure you want to delete this entry?")) {
			Meteor.call('removeEntry', this._id, function(err){
	            	if(err){
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
				tournamentName = this.tournament;
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
			//
			// let studentConsent = event.target.studentConsent.value,
			// 	parentConsent = event.target.parentConsent.value;

			let price = theOne.cost,
				entryId = this._id; //test to see if this works

				Tournaments.update(entryId, {
					$set: {
						"p2Paid": "yes",
						"p2studentConsent": "yes",
						"p2parentConsent": "yes"
					}
				});//end of tournament update

				Meteor.users.update(Meteor.userId(), {
					$addToSet: {"profile.accountBalanceLog":
						{cc: true, description: "N/A", checkNo: 0, paymentMethod: "pay from account balance", name: 'Balance deducted for tournament - '+entryId.tournament+' (as partner 2)', amount: (-1 * price), date: new Date(), dateWritten: new Date(), dateDeposited: new Date(), memo: ""}}
				});
				Meteor.users.update(Meteor.userId(), {
					$set: {"profile.balance": (Meteor.user().profile.balance - Number(price))}
				});
	Bert.alert("Success! Your payment has been received", "success", "fixed-top");
				 // end of account update

			// }else Bert.alert("Agree to the terms for both parent and student.");
		},//end of partnerPay
	});
}
