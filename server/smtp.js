Meteor.startup(function () {
  smtp = {
    username: Meteor.settings.MAIL_USER,   // eg: server@gentlenode.com
    password: Meteor.settings.MAIL_PASS,   // eg: 3eeP1gtizk5eziohfervU
    server:   'smtp.gmail.com',  // eg: mail.gandi.net
    port: 587 //25
  }

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

  Accounts.emailTemplates.siteName = "EVSD";
	Accounts.emailTemplates.from = "EVSD <evhs.sd@gmail.com>";
});
