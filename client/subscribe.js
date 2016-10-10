if (Meteor.isClient){

	Meteor.subscribe('users');
	Meteor.subscribe('tournament_entries');
	Meteor.subscribe('tournament_list');
	Meteor.subscribe('editablePages');
	//waivers/registration form
	Meteor.subscribe('files.waivers.all');
}
