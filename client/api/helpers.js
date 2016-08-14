//all the global client helpers that help control the UI
if (Meteor.isClient){
	//checks if there is a yes or no, and returns checked for a radio html element
	Template.registerHelper( 'checked', ( choice, yesOrNo ) => {
		if (choice == yesOrNo){return "checked";}
	});
	//checks if there is a judge requested or not, and returns hidden for a html element if not
		Template.registerHelper( 'hideJudges', ( tournamentName ) => {
		let theOne = TournamentList.findOne({"name": tournamentName});
		if (theOne.judges != "yes"){
		  	return "hidden";
		}
	});
	//checks if there is a partner requested or not, and returns hidden for a html element if not
	Template.registerHelper( 'hidePartner', ( tournamentName ) => {
		let theOne = TournamentList.findOne({"name": tournamentName});
		if (theOne.partner != "yes"){
		  	return "hidden";
		}
	});
	//checks if there is an approval for the tournament, and hides respective element
	Template.registerHelper( 'hideApproved', ( approved, which ) => {
		if (approved != which){
		  	return "hidden";
		}
	});
	//disables tournament from being selected if you are past the deadline	
	Template.registerHelper( 'disableIfPassDue', ( tournamentId ) => {
		let theOne = TournamentList.findOne({"_id": tournamentId});
		let deadline = new Date(theOne.signUpDeadline),
			today = new Date();
		if (today > deadline){
		  	return "hidden";
		}
	});
	//true or false approval check
	Template.registerHelper( 'approvedCheck', ( check ) => {
		if ( check == "yes" ){return true;}
			else return false;
	});
	//checks if you are the current user
	Template.registerHelper( 'isCurrentUser', ( currentUser ) => {
	  return currentUser === Meteor.userId() ? true : false;
	});
	//disables option for the admin
	Template.registerHelper( 'disableIfAdmin', ( userId ) => {
	  if ( Meteor.userId() === userId ) {
	    return Roles.userIsInRole( userId, 'admin' ) ? "disabled" : "";
	  }
	});
	//default checks the selected element
	Template.registerHelper( 'selected', ( v1, v2 ) => {
	  return v1 === v2 ? true : false;
	});	
}//end of isClient
