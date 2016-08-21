Template.accountBalance.helpers({
  balanceLog: function(){
    return Meteor.user().profile.accountBalanceLog;
  },
});
