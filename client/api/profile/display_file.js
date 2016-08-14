Template.file.helpers({
  waiverFile: function () {
  	//do something to find the name of the person, and then display it
  	let email = Meteor.user().emails[0].address;
  		email = email.substring(0, email.length - 4);
		
    return Waivers.findOne({"name" : {$regex : ".*"+email+".*"}});
  },
});