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
    name: 'home',
    BlazeLayout.render("view", {main: "home", sidebar: "cu_sidebar"});
  }
});
  FlowRouter.route('/signup', {
    name: "signup",
    action: function() {
      BlazeLayout.render("applicationLayout", {main: "signup"});
    }
  });
  FlowRouter.route('/login', {

    action: function() {
      BlazeLayout.render("view", {main: "login"});
    }
  });


var tournamentRoutes = FlowRouter.group({
  prefix: '/tournaments',
    name: 'tournament',
  });
  // for /tournaments/create-tournament route
  tournamentRoutes.route('/create-tournament', {
    action: function() {
      BlazeLayout.render('view', {main: 'createTournament', sidebar: "cu_sidebar"});
    }
  });
  //list of exisiting tournaments
  tournamentRoutes.route('/admin_tournament_view', {
    action: function() {
      BlazeLayout.render('view', {main: 'tournaments', sidebar: "cu_sidebar"});
    }
  });
  //edit a tournament
  tournamentRoutes.route('/admin_tournament_view/edit/:tournamentId', {
    name: 'editTournament',
    action: function() {
      BlazeLayout.render('view', {main: 'editTournament', sidebar: "cu_sidebar"});
    }
  });
  //for /tournaments/entries route
    //list of all the tournaments ppl have signed up for
  tournamentRoutes.route('/entries', {
    action: function() {
      BlazeLayout.render('view', {main: 'entries', sidebar: "cu_sidebar"});
    }
  });
  // for /tournaments/signup route
  tournamentRoutes.route('/signup', {
    action: function() {
      BlazeLayout.render('view', {main: 'tSignup', sidebar: "cu_sidebar"});
    }
  });
  //for /tournaments/myTournaments route
    //tournaments signed up for (in order)
  tournamentRoutes.route('/myTournaments', {
    action: function() {
      BlazeLayout.render('view', {main: 'myTournaments', sidebar: "cu_sidebar"});
    }
  });
  //for /tournaments/editEntry route
    //to edit your own tournament entries
  tournamentRoutes.route('/myTournaments/edit/:entryId', {
    name: "editEntry",
    action: function() {
      BlazeLayout.render('view', {main: 'editEntry', sidebar: "cu_sidebar"});
    }
  });


FlowRouter.route('/profile', {
  name: "profile",
  action: function() {
    BlazeLayout.render("view", {main: "profile", sidebar: "cu_sidebar"});
  }
  });
  FlowRouter.route('/profile/edit', {
    action: function() {
      BlazeLayout.render("view", {main: "editView", sidebar: "cu_sidebar"});
    }
  });

FlowRouter.route('/payContribution', {
  action: function() {
    BlazeLayout.render("view", {main: "payContribution"});
  }
});

FlowRouter.route('/signupSuccess', {
  action: function() {
    BlazeLayout.render("view", {main: "signupSuccess"});
  }
});

FlowRouter.notFound = {
  action: function() {
    BlazeLayout.render("view", {main: "404"})
  }
};
