Template.accountBalance.returnUserBalance = function(){
  if (Meteor.user())
    return Meteor.user().profile.accountBalanceLog;
};

Template.accountBalance.helpers({
  accountBalanceLog: Template.accountBalance.returnUserBalance()
  //accountBalanceLog: [{name: 'hi', amount: 100, date: 'hi'}]
});
