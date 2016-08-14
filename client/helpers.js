if (Meteor.isClient){
	Template.registerHelper( 'checked', ( choice, yesOrNo ) => {
		if (choice == yesOrNo){
			return "checked";
		}
	});//end of selectedJP
		Template.registerHelper( 'hideJudges', ( tournamentName ) => {
		var theOne = TournamentList.findOne({"name": tournamentName});
		let judges = theOne.judges;
		if (judges != "yes"){
		  	return "hidden";
		}
	});//end of template
	Template.registerHelper( 'hidePartner', ( tournamentName ) => {
		let theOne = TournamentList.findOne({"name": tournamentName});
		var choice = theOne.partner;
		if (choice != "yes"){
		  	return "hidden";
		}
	});//end of template
	Template.registerHelper( 'hideApproved', ( approved, which ) => {
		let choice = approved;
		if (choice != which){
		  	return "hidden";
		}
	});//end of template	
	Template.registerHelper( 'disableIfPassDue', ( tournamentId ) => {
		var theOne = TournamentList.findOne({"_id": tournamentId});
		var deadline = new Date(theOne.signUpDeadline),
			today = new Date();
		if (today > deadline){
		  	return "hidden";
		}
	});//end of template
	Template.registerHelper( 'approvedCheck', ( check ) => {
		if ( check == "yes" ){
			return true;
		}else return false;
	});//end of template}
}//end of isClient
