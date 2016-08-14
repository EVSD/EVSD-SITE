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


var tournamentRoutes = FlowRouter.group({
  prefix: '/tournaments',
  name: 'tournament',
  triggersEnter: [function(context, redirect) {
    console.log('running tournament group triggers');
  }]
  });
  // for /tournaments route
  tournamentRoutes.route('/', {
    action: function() {
      BlazeLayout.render('view', {content: 'tHome'});
    },
    triggersEnter: [function(context, redirect) {
      console.log('running /admin trigger');
    }]
  });
  // for /tournaments/create-tournament route
  tournamentRoutes.route('/create-tournament', {
    action: function() {
      BlazeLayout.render('view', {content: 'createTournament'});
    }
  });
  //list of exisiting tournaments
  tournamentRoutes.route('/admin_tournament_view', {
    action: function() {
      BlazeLayout.render('view', {content: 'tournaments'});
    }
  });
  //edit a tournament
  tournamentRoutes.route('/admin_tournament_view/edit/:tournamentId', {
    name: 'editTournament',
    action: function() {
      BlazeLayout.render('view', {content: 'editTournament'});
    }
  });
  //for /tournaments/entries route
    //list of all the tournaments ppl have signed up for
  tournamentRoutes.route('/entries', {
    action: function() {
      BlazeLayout.render('view', {content: 'entries'});
    }
  });
  // for /tournaments/signup route
  tournamentRoutes.route('/signup', {
    action: function() {
      BlazeLayout.render('view', {content: 'tSignup'});
    }
  });
  //for /tournaments/myTournaments route
    //tournaments signed up for (in order)
  tournamentRoutes.route('/myTournaments', {
    action: function() {
      BlazeLayout.render('view', {content: 'myTournaments'});
    }
  }); 
  //for /tournaments/editEntry route
    //to edit your own tournament entries
  tournamentRoutes.route('/myTournaments/edit/:entryId', {
    name: "editEntry",
    action: function() {
      BlazeLayout.render('view', {content: 'editEntry'});
    }
  });


FlowRouter.route('/profile', {
  name: "profile",
  action: function() {
    BlazeLayout.render("view", {content: "profile"});
  }
  });
  FlowRouter.route('/profile/edit', {
    action: function() {
      BlazeLayout.render("view", {content: "editView"});
    }
  });

FlowRouter.route('/payContribution', {
  action: function() {
    BlazeLayout.render("view", {content: "payContribution"});
  }
});

FlowRouter.notFound = {
  action: function() {
    BlazeLayout.render("view", {content: "404"})
  }
};
