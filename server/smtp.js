//smtp settings (NEW)
	Meteor.startup(() => {
		smtp = {
			username: "evhs.sd6",					//Mailgun Settings //username: "postmaster@sandbox4_your_username_XXXXXXXXXXXXXXXX.mailgun.org",
			password: "sdwebsite",					//password: "your_password_XXXXXXXXXXXXXXXXXXXX", 
			server: "smtp.gmail.com",				//server: "smtp.mailgun.org",
			port: 465								//port: 587
			};
		process.env.MAIL_URL = 'smtp://' +
					encodeURIComponent(smtp.username) + ':' +
					encodeURIComponent(smtp.password) + '@' +
					encodeURIComponent(smtp.server) + ':' +
					smtp.port;

		Accounts.emailTemplates.siteName = "EVSD App";
		Accounts.emailTemplates.from = "EVSD <evhs.sd@gmail.com>";
		/*Accounts.emailTemplates.verifyEmail.subject  = function (user) {
			return 'Thank you for signing up to EVSD';
		};*/
		Accounts.emailTemplates.verifyEmail.text = {
			subject () {
				return "verify your account";
			},
			text (user, url) {
				let emailAddress = user.email[0].address,
				supportEmail = "evsd.sd6@gmail.com",
				emailBody = 'To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}'
				
				return emailBody;
			}			
		};
});
