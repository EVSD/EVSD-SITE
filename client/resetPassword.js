Template.ForgotPassword.events({
  'submit #forgotPasswordForm': function(e, t) {
    e.preventDefault();

    var trimInput = function (val) {
            return val.replace(/^\s*|\s*$/g, '');
        }
    var forgotPasswordForm = $(e.currentTarget),
        email = trimInput(forgotPasswordForm.find('#forgotPasswordEmail').val().toLowerCase());

//TODO: fix input parsers

    // if (isNotEmpty(email) && isEmail(email)) {

      Accounts.forgotPassword({email:email}, function(err) {
        if (err) {
          if (err.message === 'User not found [403]') {
            Bert.alert('This account does not exist.','danger','growl-top-right');
          } else {
            Bert.alert('We are sorry but something went wrong.','danger','growl-top-right');
          }
        } else {
          Bert.alert('Email Sent. Check your mailbox.','danger','growl-top-right');
        }
      });

    // }
    return false;
  },
});


if (Accounts._resetPasswordToken) {
  Session.set('resetPassword', Accounts._resetPasswordToken);
}

Template.ResetPassword.helpers({
 resetPassword: function(){
  return Session.get('resetPassword');
 }
});

Template.ResetPassword.events({
  'submit #resetPasswordForm': function(e, t) {
    e.preventDefault();

    var resetPasswordForm = $(e.currentTarget),
        password = resetPasswordForm.find('#resetPasswordPassword').val(),
        passwordConfirm = resetPasswordForm.find('#resetPasswordPasswordConfirm').val();

    // if (isNotEmpty(password) && areValidPasswords(password, passwordConfirm)) {
      Accounts.resetPassword(Session.get('resetPassword'), password, function(err) {
        if (err) {
          Bert.alert('We are sorry but something went wrong.','danger','growl-top-right');
        } else {
          Bert.alert('Your password has been changed. Welcome back!','danger','growl-top-right');
          Session.set('resetPassword', null);
        }
      });
    // }
    return false;
  }
});
