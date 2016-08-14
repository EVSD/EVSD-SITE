if(Meteor.isClient){
	//functions

	Template.myTournaments.helpers({
		tournaments: function (){
			return Tournaments.find({}); 
			},//end
	 	pathForEntry: function() {
		    var entry = this;
		    var params = {
		        entryId: entry._id
		    };
		    var routeName = "editEntry";
		    var path = FlowRouter.path(routeName, params);
	        
	        return path;
			},//end
		togglePartnersJudges: function(){
			//gets the tournament name
			let entryId = this._id,
				entry = Tournaments.findOne({"_id": entryId}),
				tournament = entry.tournament;
			
			//gets partner and judge info on tournament in question
			let tournamentInfo = TournamentList.findOne({"name": tournament}),
				partner = tournamentInfo.tournament.partner,
				judges 	= tournamentInfo.tournament.judges;
			
			//displays if there are partner/judge, and doesn't if not
			if (partner == "no"){
				document.getElementById("partnerToggle").style.display = "none";
				}else if (partner == "yes"){
					document.getElementById("partnerToggle").style.display = "block";
				}
			if (judges == "no"){
				document.getElementById("judgesToggle").style.display = "none";
				}else if (judges == "yes"){
					document.getElementById("judgesToggle").style.display = "block";
				}

			},//end

	});
	Template.myTournaments.events({
		"click .delete-entry": function(event){
			Meteor.call('removeEntry', this._id);
		},
	});
}