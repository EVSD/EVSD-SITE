if (Meteor.isClient){

	Meteor.subscribe('users');
	Meteor.subscribe('tournament_entries');
	Meteor.subscribe('tournament_list');
	//waivers/registration form
	Meteor.subscribe('files.waivers.all');
}
