//this is the new file system that uses https://github.com/VeliovGroup/Meteor-Files

this.Waivers = new FilesCollection({
  collectionName: 'Waivers',
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload: function (file) {
    // Allow upload files under 2MB, and only in pdf formats
    if (file.size <=  2048000 && /pdf/i.test(file.extension)) {
      return true;
    } else {
      return 'Please upload pdf of less than 2MB';
    }
  },  
});
/*Images.addFile('/var/www/files/sample.png', {
  fileName: 'sample.png',
  type: 'image/png',
  meta: {}
});
*/