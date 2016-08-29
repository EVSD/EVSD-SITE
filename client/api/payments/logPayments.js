if (Meteor.isClient){
	Template.logPayments.onRendered(function() {
		$('select').material_select();
		$('.datepicker').pickadate({
			selectMonths: true, // Creates a dropdown to control month
			selectYears: 15 // Creates a dropdown of 15 years to control year
		});
	});
	Template.logPayments.helpers({
		users: function(){
			return Meteor.users.find({}); //only return certain fields
			}
		});
	Template.logPayments.events({
		'submit .log-payment':function(event){
			event.preventDefault();
      let checkName = event.target.name.value;
			let checkNumber = event.target.checkNumber.value;
			let checkAmount = event.target.amount.value;
			let written = event.target.dateWritten.value;
			let deposited = event.target.dateDeposited.value;
			let checkMemo = event.target.memo.value;
      Meteor.users.update(Meteor.userId(), {
        $set: {"profile.balance": (Meteor.user().profile.balance + Number(checkAmount))}
      })
			Meteor.users.update(Meteor.userId(), {
				$addToSet: {"profile.accountBalanceLog": {cc: false, description: "N/A", checkNo: checkNumber, paymentMethod: "check", amount: checkAmount, name: checkName, date: new Date(), dateWritten: written, dateDeposited: deposited, memo: checkMemo}}
			})
		},
	});
}
