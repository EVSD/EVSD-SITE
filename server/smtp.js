Meteor.startup(function () {
  smtp = {
    username: Meteor.settings.MAIL_USER,   // eg: server@gentlenode.com
    password: Meteor.settings.MAIL_PASS,   // eg: 3eeP1gtizk5eziohfervU
    server:   'smtp.gmail.com',  // eg: mail.gandi.net
    port: 587 //25 old; 465 sl; 587 non-ssl
  }

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

  Accounts.emailTemplates.siteName = "EVSD";
	Accounts.emailTemplates.from = "EVSD <evhs.sd@gmail.com>";
  Accounts.emailTemplates.resetPassword.subject= function(user){
    return "Reset EVSD Password";
  };
  Accounts.emailTemplates.resetPassword.text= function(user,url){
    return "Click this link to reset your password:\nhttp://evsd.club/#/reset-password/"+url.substring(url.lastIndexOf('/') + 1);
  };
});
