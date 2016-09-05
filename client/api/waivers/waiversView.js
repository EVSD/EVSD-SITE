if(Meteor.isClient){
	//functions

	Template.waiversView.helpers({
		waivers: function (){
			return Meteor.users.find({},{
	        	sort: {"lastName":-1},
    		})
        //html: call for waiverLink and display in iFrame
			},
	});
}
