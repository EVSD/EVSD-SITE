if (Meteor.isClient){
    //only allow 1 object to be created in the editable pages class
    //stores: textField, title, urlName
    Template.editablePage_edit.helpers({
    		validPages: function () {
          return PageEdits.find({});
    	  },
    });
    Template.editablePage_edit.events({
      "submit .editPage": function(event){
        var page = event.target.pageToEdit.value,
            title = event.target.pageTitle.value,
            content = event.target.pageContent.value;
        Meteor.call('savePageEdits', page, title, content );
      },
      "submit .indexNewPage":function(event){
        //this does not reload the page
        //it is a way to index new pages for the programmer
          event.preventDefault();
          var pageName = event.target.pageName.value;
          Meteor.call('indexNewPage', pageName);
      },
    });
}
