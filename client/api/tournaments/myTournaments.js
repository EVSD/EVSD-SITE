if(Meteor.isClient){
	//functions

	Template.myTournaments.helpers({
		tournaments: function (){
			return Tournaments.find({},{
	        	sort: {"tournament":1, "createdAt": -1},
    		})
			},
		//this create the path to get to the entry
	 	pathForEntry: function() {
		    let params = {
		        entryId: this._id //entry ID
		    };
		    let routeName = "editEntry";
		    return path = FlowRouter.path(routeName, params);
			},

	});
	Template.myTournaments.events({
		"click .delete-entry": function(event){
			Meteor.call('removeEntry', this._id, function(err){
	            	if(err){
	                	console.log(err);
	            	}
           		});
		},
		"submit .partnerPay": function(event){
			event.preventDefault();
			//get the tournament in question
			let tournament = this.tournament;
			console.log(tournament);
			let theOne = TournamentList.findOne({
				"name": tournament
				});

			let studentConsent = event.target.studentConsent.value,
				parentConsent = event.target.parentConsent.value;

			let price = theOne.cost,
				entryId = this._id; //test to see if this works

			if(parentConsent == "yes" && studentConsent == "yes"){
				//payment and account creation
				StripeCheckout.open({
			    	key: Meteor.settings.public.stripe.testPublishableKey,
			        amount: price * 100,
			        name: 'Tournament Payment',
			        // description: 'As reviewed in the Parent Orientation, this is the bare minimum we need to cover coaching expenses and salaries, facilities, school tournament fees, club events, financial aid & subsidies to students, league fees, professional material, and much more. Most schools ask for around $400-$600, so we are trying our best to do with as little aid as possible. Please contact team administration at evhs.sd@gmail.com for questions or concerns. We use Paypal and Stripe software to power our payment process, which means our platform is verified and 100% safe. Because we are a registered 501c3 under California State Government and an ESUHSD Booster, your contribution is tax-deductible.',
			        description: 'description goes here',
			        panelLabel: 'Pay Now',
		       		//get user email
			        token: function(response) {
			        	stripeToken = response.id;
			        	Meteor.apply('payEntryPartner', [stripeToken, price, entryId], {noRetry: true});
			        }
			    });
			}else alert("agree to the terms for both parent and student");
		},//end of partnerPay
	});
}
