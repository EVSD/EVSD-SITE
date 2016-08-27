// Template.accountBalance.rendered = function(){
//     $('.collapsible').collapsible({
//         accordion : false
//     });
// };
// $(document).ready(function(){
//     $('.collapsible').collapsible({
//       accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
//     });
//   });
//   function balanceCursor(){
//   return Meteor.user().profile.accountBalanceLog.find();
// }
//   Template.accountBalance.onRendered(function(){
//     this.autorun(function() {
//       // registers a dependency on the number of documents returned by the cursor
//       var balance = balanceCursor().count();
//       // this will log 0 at first, then after the jobs publication is ready
//       // it will log the total number of documents published
//       console.log(balance);
//       // initialize the plugin only when Blaze is done with DOM manipulation
//       Tracker.afterFlush(function(){
//         this.$(".collapsible").collapsible({
//           accordion: false
//         });
//       }.bind(this));
//     }.bind(this));
//   });
Template.accountBalance.helpers({
  balanceLog: function(){
    return Meteor.user().profile.accountBalanceLog;
  },
});
