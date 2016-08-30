Meteor.methods({
  storeUrlInDatabase: function( url ) {
    check( url, String );
    //Modules.both.checkUrlValidity( url );

    try {
      waiverUrl = url;
      //console.log(waiverUrl);
    } catch( exception ) {
      return exception;
    }
  }
});
