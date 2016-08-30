if (Meteor.isClient){
	Template.logPayments.helpers({
		users: function(){
			return Meteor.users.find({}); //only return certain fields
			}
		});
	Template.logPayments.events({
		'submit .log-payment':function(event){
			event.preventDefault();
			let username = event.target.user.value;
			let user = Meteor.users.findOne({username:username});
      let checkName = event.target.name.value;
			let checkNumber = event.target.checkNumber.value;
			let checkAmount = event.target.amount.value;
			let written = event.target.dateWritten.value;
			let deposited = event.target.dateDeposited.value;
			let checkMemo = event.target.memo.value;
      Meteor.users.update(user._id, {
        $set: {"profile.balance": (user.profile.balance + Number(checkAmount))}
      })
			Meteor.users.update(user._id, {
				$addToSet: {"profile.accountBalanceLog": {cc: false, description: "N/A", checkNo: checkNumber, paymentMethod: "check", amount: checkAmount, name: checkName, date: new Date(), dateWritten: written, dateDeposited: deposited, memo: checkMemo}}
			})
		},
	});
}
