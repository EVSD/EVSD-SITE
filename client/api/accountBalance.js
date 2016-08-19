/*Template.accountBalance.returnUserBalance = function(){
  if (Meteor.user())
    return Meteor.user().profile.accountBalanceLog;
};*/ //thisworks

Template.accountBalance.helpers({
  returnUserBalance(){
    if (Meteor.user())
      accountBalanceLog: Meteor.user().profile.accountBalanceLog;
  }
  // this returns an error: Blaze._globalHelpers.returnUserBalance is not a function
  //accountBalanceLog: Blaze._globalHelpers.returnUserBalance()
  //accountBalanceLog: [{name: 'hi', amount: 100, date: 'hi'}]
});
