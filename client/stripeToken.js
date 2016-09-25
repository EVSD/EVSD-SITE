Meteor.methods({ 'stripeToken' ({}) {
/***Test of client code from the previous signup.js (Can only be run from client?) FIX****/
       // Take our card data and create a Stripe token from the client. This
       // ensures that our code is PCI compliant to keep the man from knocking
       // on our door.
      /*if (!error) {
	         STRIPE.getToken( '#application-signup', {
 	         number: $('[data-stripe="cardNumber"]').val(),
	         exp_month: $('[data-stripe="expMo"]').val(),
	         exp_year: $('[data-stripe="expYr"]').val(),
	         cvc: $('[data-stripe="cvc"]').val(),
	         name: $('[data-stripe="cardholder_name"]').val(),
        	 address_line1: $('[data-stripe="address_line1"]').val(),
	         address_line2: $('[data-stripe="address_line2"]').val(),
	         address_city: $('[data-stripe="address_city"]').val(),
	         address_state: $('[data-stripe="address_state"]').val(),
	         address_zip: $('[data-stripe="address_zip"]').val(),
	         address_country: $('[data-stripe="address_country"]').val()
      }, function() {
			
         // Grab the customer's details.
         var token = {
           token: $('[name="stripeToken"]').val()
         };
	     console.log('charing stripe... (3/3)');
	  }*/
}});