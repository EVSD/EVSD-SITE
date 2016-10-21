PageEdits = new Meteor.Collection( 'editablePages' );

PageEdits.allow({
  insert: function() { return false; },
  update: function() { return false; },
  remove: function() { return false; }
});

PageEdits.deny({
  insert: function(){ return true; },
  update: function(){ return true; },
  remove: function(){ return true; }
});
//file size is located in server/upload/slingshot.js
