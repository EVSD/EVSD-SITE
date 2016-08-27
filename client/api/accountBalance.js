Template.accountBalance.rendered = function(){
    $('.collapsible').collapsible({
        accordion : false
    });
};
$(document).ready(function(){
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
  });

Template.accountBalance.helpers({
  balanceLog: function(){
    return Meteor.user().profile.accountBalanceLog;
  },
});
