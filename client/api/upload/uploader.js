Template.uploader.events({
  'change input[type="file"]' ( event, template ) {
    if (confirm("Are you sure that you want to upload this file?")){
      Modules.client.uploadWaiversToAmazonS3( { event: event, template: template } );
      }else{
        Bert.alert("file did not upload");
      }
  }//end of change
});
