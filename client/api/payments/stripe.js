Meteor.startup(function() {
  var stripeKey = Meteor.settings.public.stripe.testPublishableKey;
  Stripe.setPublishableKey( stripeKey );

  STRIPE = {
  getToken: function( domElement, card, callback ) {
    Stripe.card.createToken( card, function( status, response ) {
      if ( response.error ) {
        INPUTERROR.report(response.error.message);
        Bert.alert( response.error.message, "danger" );
      //  console.log(response.error.message);
      } else {
      //  console.log(response.id);
      //  console.log(response);
        STRIPE.setToken( response.id, domElement, callback );
      }
    });
  },
  setToken: function( token, domElement, callback ) {
    $( domElement ).append( $( "<input type='hidden' name='stripeToken' />" ).val( token ) );
    callback();
  }
};
INPUTERROR = {
report: function(msg) {

    // Show the error in the form:
    $('#application-signup').text(msg).addClass('error');

    // Re-enable the submit button:
    $('#submitBtn').prop('disabled', false);

    return false;

}
};



});
