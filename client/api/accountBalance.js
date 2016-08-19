Template.accountBalance.helpers({
  balanceLog: function(){
    return Meteor.user().profile.accountBalanceLog;
  },

  //accountBalanceLog: [{name: 'hi', amount: 100, date: 'hi'}]
});
