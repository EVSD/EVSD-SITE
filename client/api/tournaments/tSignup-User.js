if(Meteor.isClient){
	Template.tSignup.onRendered(function() {
		$('select').material_select();
	});
	Template.tSignup.helpers({
		users: function () {
	    return Meteor.users.find({}, {
	      sort: { "profile.lastName": 1 }
	    });
	  },
		tournamentList: function (){
			return TournamentList.find({},{
				fields:{
					'cost': 1,
					'judges': 1,
					'name': 1,
					'partner': 1,
					'signUpDeadline': 1
				},
				sort: {"signUpDeadline": -1},
			});
		},
	});
	Template.tSignup.events({
		"change #tournament": function(event){
			let e = document.getElementById("tournament");
			var selected = String(e.options[e.selectedIndex].value);
			let theOne = TournamentList.findOne({
				"name": selected
				});
			if (theOne.judges == "no") {
				judgesToggle.style.display = "none";
			} else {
				judgesToggle.style.display = "initial";
			}
			if (theOne.partner == "no") {
				partnerToggle.style.display = "none";
			} else {
				partnerToggle.style.display = "initial";
			}
			if (Meteor.user().profile.balance < theOne.cost) {
				payfrombalance.style.display = "none";
			} else {
				payfrombalance.style.display = "initial";
			}
		},

		"click #payfromstripe": function(event){

			event.preventDefault(); //so it doesn't refresh

			//use find one to find the tournament
			let e = document.getElementById("tournament");
			var selected = String(e.options[e.selectedIndex].value);
			let theOne = TournamentList.findOne({
				"name": selected
				});
			let price = theOne.cost; //cost of tournament
			//
			// let studentConsent = $('input[name="studentConsent"]:checked').val(),
			// 	parentConsent = $('input[name="parentConsent"]:checked').val();


			//gets all the tournament data and prompts user to pay before account created
				//when parent and student have consented
			// if(parentConsent == "yes" && studentConsent == "yes"){
				//data for user, partner, and the judge
				let userFirst = Meteor.user().profile.firstName,
					userLast = Meteor.user().profile.lastName,
					userEmail = Meteor.user().emails[0].address;

					//  theOne = TournamentList.findOne({
					// 	"name": selected
					// 	});

						var username, partner, partnerFirst, partnerLast, partnerEmail;
						var judgeFirst, judgeLast, judgeEmail, judgePhone;
						// if partner tournament
				if (theOne.partner == "yes") {
					let partnerElement = document.getElementById("partner");
					//var username = String(e.options[e.selectedIndex].value);
				 //username = event.target.partner.value; //this gets the partner's username
				 username = String(partnerElement[partnerElement.selectedIndex].value);
					partner = Meteor.users.findOne({username:username});
					partnerFirst = partner.profile.firstName;
					partnerLast = partner.profile.lastName;
					partnerEmail = partner.emails[0].address;
				} else {
					// otherwise, if single person tournament
					partner = "none";
					partnerFirst = "none";
					partnerLast = "none";
					partnerEmail = "none";
				}
				if (theOne.judges == "yes") {
				//  judgeFirst= event.target.judgeFirst.value;
				//  	judgeLast= event.target.judgeLast.value;
				// 	judgeEmail= event.target.judgeEmail.value;
				// 	judgePhone= event.target.judgePhone.value;
				judgeFirst= $('[name="judgeFirst"]').val();
				judgeLast= $('[name="judgeLast"]').val();
				judgeEmail= $('[name="judgeEmail"]').val();
				judgePhone= $('[name="judgePhone"]').val();
				} else {
					judgeFirst = "none";
					judgeLast = "none";
					judgeEmail = "none";
					judgePhone = "none";
				}
				//has to be a var
				var entry ={
					 tournament : selected,
					 userFirst : userFirst,
					 userLast : userLast,
					 userEmail : userEmail,

					 partnerFirst : partnerFirst,
					 partnerLast : partnerLast,
					 partnerEmail : partnerEmail,

					 studentConsent: "yes",
					 parentConsent: "yes",
					 judgeFirst: judgeFirst,
					 judgeLast: judgeLast,
					 judgeEmail: judgeEmail,
					 judgePhone: judgePhone,

					 notes: $('[name="notes"]').val(),
					}
				//payment and account creation
				StripeCheckout.open({
			    	key: Meteor.settings.public.stripe.livePublishableKey,
			        amount: price * 100,
			        name: 'Tournament Payment',
			        // description: 'As reviewed in the Parent Orientation, this is the bare minimum we need to cover coaching expenses and salaries, facilities, school tournament fees, club events, financial aid & subsidies to students, league fees, professional material, and much more. Most schools ask for around $400-$600, so we are trying our best to do with as little aid as possible. Please contact team administration at evhs.sd@gmail.com for questions or concerns. We use Paypal and Stripe software to power our payment process, which means our platform is verified and 100% safe. Because we are a registered 501c3 under California State Government and an ESUHSD Booster, your contribution is tax-deductible.',
			        description: entry.tournament,
			        panelLabel: 'Pay Now',
		       		//get user email
			        token: function(response) {
			        	stripeToken = response.id;
			          // console.info('response: ' + response);
			          // Meteor.call('chargeCard', stripeToken);
			          // prevents multiple charges if client disconnects and reconnects
			        	Meteor.apply('paySetupEntry', [stripeToken, price, entry], {noRetry: true});
								Bert.alert("Success! Your tournament entry has been created", "success", "fixed-top");
			        }
		      	});

						//in the display determine it based off of tournament
				// } else{
				// Bert.alert ("You and/or your parent have not consented yet.");
				// }
			//send some confirmation alert
			},

			"click #payfrombalance": function(event){

							event.preventDefault(); //so it doesn't refresh

							//use find one to find the tournament
							let e = document.getElementById("tournament");
							var selected = String(e.options[e.selectedIndex].value);
							let theOne = TournamentList.findOne({
								"name": selected
								});
							let price = theOne.cost; //cost of tournament
							//
							// let studentConsent = $('input[name="studentConsent"]:checked').val(),
							// 	parentConsent = $('input[name="parentConsent"]:checked').val();


							//gets all the tournament data and prompts user to pay before account created
								//when parent and student have consented
							// if(parentConsent == "yes" && studentConsent == "yes"){
								//data for user, partner, and the judge
								let userFirst = Meteor.user().profile.firstName,
									userLast = Meteor.user().profile.lastName,
									userEmail = Meteor.user().emails[0].address;

									//  theOne = TournamentList.findOne({
									// 	"name": selected
									// 	});

										var username, partner, partnerFirst, partnerLast, partnerEmail;
										var judgeFirst, judgeLast, judgeEmail, judgePhone;
										// if partner tournament
								if (theOne.partner == "yes") {
									let partnerElement = document.getElementById("partner");
									//var username = String(e.options[e.selectedIndex].value);
								 //username = event.target.partner.value; //this gets the partner's username
								 username = String(partnerElement[partnerElement.selectedIndex].value);
									partner = Meteor.users.findOne({username:username});
									partnerFirst = partner.profile.firstName;
									partnerLast = partner.profile.lastName;
									partnerEmail = partner.emails[0].address;
								} else {
									// otherwise, if single person tournament
									partner = "none";
									partnerFirst = "none";
									partnerLast = "none";
									partnerEmail = "none";
								}
								if (theOne.judges == "yes") {
								//  judgeFirst= event.target.judgeFirst.value;
								//  	judgeLast= event.target.judgeLast.value;
								// 	judgeEmail= event.target.judgeEmail.value;
								// 	judgePhone= event.target.judgePhone.value;
								judgeFirst= $('[name="judgeFirst"]').val();
								judgeLast= $('[name="judgeLast"]').val();
								judgeEmail= $('[name="judgeEmail"]').val();
								judgePhone= $('[name="judgePhone"]').val();
								} else {
									judgeFirst = "none";
									judgeLast = "none";
									judgeEmail = "none";
									judgePhone = "none";
								}
								//has to be a var
								var entry ={
									 tournament : selected,
									 userFirst : userFirst,
									 userLast : userLast,
									 userEmail : userEmail,

									 partnerFirst : partnerFirst,
									 partnerLast : partnerLast,
									 partnerEmail : partnerEmail,

									 studentConsent: "yes",
									 parentConsent: "yes",
									 judgeFirst: judgeFirst,
									 judgeLast: judgeLast,
									 judgeEmail: judgeEmail,
									 judgePhone: judgePhone,

									 notes: $('[name="notes"]').val(),
									}
									Meteor.call('createEntry', entry);
				Bert.alert("Success! Your tournament entry has been created, and your balance has been deducted appropriately", "success", "fixed-top");

				Meteor.users.update(Meteor.userId(), {
					$addToSet: {"profile.accountBalanceLog":
						{cc: true, description: "N/A", checkNo: 0, paymentMethod: "pay from account balance (upon tournament signup)", name: 'Balance deducted for tournament - '+entry.tournament+' (as partner 1)', amount: (-1 * price), date: new Date(), dateWritten: new Date(), dateDeposited: new Date(), memo: ""}}
				});
				Meteor.users.update(Meteor.userId(), {
					$set: {"profile.balance": (Meteor.user().profile.balance - Number(price))}
				});
				},
	});
}//end of isClient
