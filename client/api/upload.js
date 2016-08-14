if (Meteor.isClient){
  Template.uploadForm.onCreated(function () {
    this.currentUpload = new ReactiveVar(false);
  });

  Template.uploadForm.helpers({
    currentUpload: function () {
      return Template.instance().currentUpload.get();
    },
    uploadedFiles: function () {
      return Waivers.find();
    }
  });

  Template.uploadForm.events({
    'change #fileInput': function (event, template) {
      if (event.currentTarget.files && event.currentTarget.files[0]) {
        //if there is a files target and there is a current file
          // We upload only one file, in case 
          // multiple files were selected
        var upload = Waivers.insert({
          file: event.currentTarget.files[0],
          streams: 'dynamic',
          chunkSize: 'dynamic'
        }, false);//we upload the waiver 1 at a time

        upload.on('start', function () {
          template.currentUpload.set(this);
        });//

        upload.on('end', function (error, fileObj) {
          if (error) {
            alert('Error during upload: ' + error);
          } else {
            alert('Successfully Uploaded: \n' + fileObj.name + ' \nYou can now sign up');
          }
          template.currentUpload.set(false);
        });//checks for error, and resets the upload button and sends a successful upload message
        upload.start();
      }
    }
  });

}