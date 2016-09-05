Template.uploader.events({
  'change input[type="file"]' ( event, template ) {
    if (confirm("Are you sure that you want to upload this file?")){
      Modules.client.uploadWaiversToAmazonS3( { event: event, template: template } );
      Meteor.users.update(Meteor.userId(), {
        $set: {"profile.waiver": "yes"}
      });
      console.log(waiverUrl);
      Meteor.call('editProfileFileUrl', waiverUrl, function(err) {
        if (err){
          console.log('could not append file');
          Bert.alert('reg user error','danger');
        }
      });
      }else{
        Bert.alert("file did not upload");
      }
  }//end of change
});
