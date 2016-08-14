if (Meteor.isClient){

	Meteor.subscribe("currentUser");
	//set it so that only if you are an admin you can subscribe to all users
	Meteor.subscribe('allUsers'); //find a way to make this more private and selective
	Meteor.subscribe('tournamentUser');
	Meteor.subscribe('tournamentList');
	//waivers/registration form
	Meteor.subscribe('files.waivers.all');
}
