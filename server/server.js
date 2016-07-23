if(Meteor.isServer){
	Meteor.publish('allUsers',function(){

		return Meteor.users.find({'username': 1, 'password':1});
	})
}

//here because we removed autopublish
//meteor does some magic with this and accounts to get this to work
