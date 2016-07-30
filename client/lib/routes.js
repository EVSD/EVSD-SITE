/*
Home/
	~~Sign Up
		~~Account Sign Up
	~~Login
	
	{{if logged in}}
	Member Specific Content
	~Profile
	~~Tournaments
		Sign Up
		Tournaments (Signed Up)
*/

FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("view", {content: "home"});
  }
});
  FlowRouter.route('/signup', {
    action: function() {
      BlazeLayout.render("view", {content: "signup"});
    }
  });
  FlowRouter.route('/login', {
    action: function() {
      BlazeLayout.render("view", {content: "login"});
    }
  });
  FlowRouter.route('/profile', {
    action: function() {
      BlazeLayout.render("view", {content: "profile"});
    }
  });
    FlowRouter.route('/profile/edit', {
      action: function() {
        BlazeLayout.render("view", {content: "editProfile"});
      }
    });

FlowRouter.route('/tournaments', {
  action: function() {
    BlazeLayout.render("view", {content: "tournaments"});
  }
});
FlowRouter.route('/tournaments/signup', {
  action: function() {
    BlazeLayout.render("view", {content: "tSignup"});
  }
});







/*
FlowRouter.route('/tournaments/record', {
  action: function() {
    BlazeLayout.render("view", {content: "tournamentsRecord"});
  }
});
FlowRouter.route('/tournaments/signup', {
  action: function() {
    BlazeLayout.render("view", {content: "tournamentsRecord"});
  }
});
*/
