//smtp settings (NEW)
	Meteor.startup(function() {
		smtp = {
			username: "evhs.sd6",					//Mailgun Settings //username: "postmaster@sandbox4_your_username_XXXXXXXXXXXXXXXX.mailgun.org",
			password: "SDwebteam",					//password: "your_password_XXXXXXXXXXXXXXXXXXXX", 
			server: "smtp.gmail.com",				//server: "smtp.mailgun.org",
			port: 465								//port: 587

			};
		process.env.MAIL_URL = 'smtp://' +
					encodeURIComponent(smtp.username) + ':' +
					encodeURIComponent(smtp.password) + '@' +
					encodeURIComponent(smtp.server) + ':' +
					smtp.port;
	});
	Accounts.config({
	    sendVerificationEmail: true
	});
	Accounts.emailTemplates.siteName = "EVSD App";
	Accounts.emailTemplates.from = "EVSD <evhs.sd@gmail.com>";
	Accounts.emailTemplates.verifyEmail.subject  = function (user) {
		return 'Confirm Your Email Address, ' + user.username;
	};
	Accounts.emailTemplates.verifyEmail.text = function (user, url) {
		return  'Welcome to EVSD!\n'
		+ "To verify your account, follow the link below:\n\n"
		+ url;
	};
	Accounts.emailTemplates.verifyEmail.html = function (user, url) {
		return "<h1> Welcome to EVSD! </h1>"
		+ "<p> To <strong> verify your account </strong>, follow the link below:</p>"
		+ url;
	};
	Accounts.config({
        sendVerificationEmail: true
    });
