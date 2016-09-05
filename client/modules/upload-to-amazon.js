let template;

let _getFileFromInput = ( event ) => event.target.files[0];

let _addUrlToDatabase = ( url ) => {
  Meteor.call( "storeUrlInDatabase", url, ( error ) => {
    if ( error ) {
      Bert.alert( error.reason, "warning" );
    } else {
      Bert.alert( "File successfully uploaded", "success" );
      submitOkay = "yes";
    }
  });
};

let _uploadFileToAmazon = ( file ) => {
  const uploader = new Slingshot.Upload( "uploadWaiversToAmazonS3" );

  uploader.send( file, ( error, url ) => {
    if ( error ) {
      Bert.alert( error.message, "warning" );
    } else {
      _addUrlToDatabase( url );
    }
  });
};

let upload = ( options ) => {
  template = options.template;
  let file = _getFileFromInput( options.event );

  Bert.alert( `Uploading ${file.name}...` );
  _uploadFileToAmazon( file );
};

Modules.client.uploadWaiversToAmazonS3 = upload;
