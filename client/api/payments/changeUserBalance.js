if (Meteor.isClient){
	Template.accountBalance.onRendered(function(){
		$('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
	});
	Template.changeUserBalance.onRendered(function () {
		$('select').material_select();
	});
	Template.changeUserBalance.helpers({
		users: function(){
			return Meteor.users.find({}); //only return certain fields
			}
		});
	Template.changeUserBalance.events({
		'submit .change-balance':function(event){
			event.preventDefault();
			let username = event.target.user.value;
			let user = Meteor.users.findOne({username:username});
      let eventName = event.target.name.value;
			let eventAmount = event.target.amount.value;
			let eventDescription = event.target.description.value;
      Meteor.users.update(user._id, {
        $set: {"profile.balance": (user.profile.balance + Number(eventAmount))}
      })
			Meteor.users.update(user._id, {
				$addToSet: {"profile.accountBalanceLog": {cc: true, description: eventDescription, checkNo: 0, paymentMethod: "administrative manual payment logging", amount: eventAmount, name: eventName, date: new Date(), dateWritten: new Date(), dateDeposited: new Date(), memo: ""}}
			})
		},
	});
}
