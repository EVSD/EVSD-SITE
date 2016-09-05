Slingshot.fileRestrictions( "uploadWaiversToAmazonS3", {
  allowedFileTypes: [ "application/pdf" ],
  maxSize: 5 * 1024 * 1024
});

Slingshot.createDirective( "uploadWaiversToAmazonS3", Slingshot.S3Storage, {
  bucket: "evsd-waivers",
  acl: "public-read",
  authorize: function () {
    let userFileCount = Files.find( { "userId": this.userId } ).count();
    return userFileCount < 3 ? true : false;
  },
  key: function ( file ) {
    if (Meteor.user()){
      var user = Meteor.user().profile.firstName + '_'+ Meteor.user().profile.lastName;
    }
    return 'waivers' + "/" + users + / file.name;
  }
});
