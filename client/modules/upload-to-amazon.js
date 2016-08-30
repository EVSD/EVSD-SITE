let template;

let _getFileFromInput = ( event ) => event.target.files[0];

let _setPlaceholderText = ( string = "Click or Drag a File Here to Upload" ) => {
  template.find( ".alert span" ).innerText = string;
};

let _addUrlToDatabase = ( url ) => {
  Meteor.call( "storeUrlInDatabase", url, ( error ) => {
    if ( error ) {
      Bert.alert( error.reason, "warning" );
      _setPlaceholderText();
    } else {
      Bert.alert( "File successfully uploaded", "success" );
      _setPlaceholderText("File successfully uploaded!");
    }
  });
};

let _uploadFileToAmazon = ( file ) => {
  const uploader = new Slingshot.Upload( "uploadWaiversToAmazonS3" );

  uploader.send( file, ( error, url ) => {
    if ( error ) {
      Bert.alert( error.message, "warning" );
      _setPlaceholderText();
    } else {
      _addUrlToDatabase( url );
    }
  });
};

let upload = ( options ) => {
  template = options.template;
  let file = _getFileFromInput( options.event );

  _setPlaceholderText( `Uploading ${file.name}...` );
  _uploadFileToAmazon( file );
};

Modules.client.uploadWaiversToAmazonS3 = upload;
