var uploader = new Slingshot.Upload("myFileUploads");
Slingshot.fileRestrictions("myFileUploads", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
  maxSize: 10 * 1024 * 1024 // 10 MB (use null for unlimited).
});
uploader.send(document.getElementById('input').files[0], function (error, downloadUrl) {
  if (error) {
    // Log service detailed response.
    console.error('Error uploading', uploader.xhr.response);
    alert (error);
  }
  else {
    Meteor.users.update(Meteor.userId(), {$push: {"profile.files": downloadUrl}});
  }
});
