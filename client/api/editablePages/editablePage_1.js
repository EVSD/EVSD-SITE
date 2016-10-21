if (Meteor.isClient){
    //only allow 1 object to be created in the editable pages class
    //stores: textField, title, urlName
    Template.editablePage_1.helpers({
        //need to display page instance for the admin to choose
    		page: function () {
          var page = PageEdits.findOne({page: "editablePage_1"});
          console.log(page);
          return page;
          //type the page in here that has this data
    	  },
      });
}
