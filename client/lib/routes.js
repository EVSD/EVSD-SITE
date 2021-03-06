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

FlowRouter.route('/waivers', {
  action: function() {
    name: 'waivers',
    BlazeLayout.render("view", {main: "waivers"});
  }
});

FlowRouter.route('/summerCamp', {
  action: function() {
    name: 'summerCamp',
    BlazeLayout.render("view", {main: "summerCamp"});
  }
});

FlowRouter.route('/', {
  action: function() {
    name: 'home',
    BlazeLayout.render("view", {main: "home"});
  }
});
  FlowRouter.route('/signup', {
    name: "signup",
    action: function() {
      BlazeLayout.render("view", {main: "signup"});
    }
  });
  FlowRouter.route('/login', {

    action: function() {
      BlazeLayout.render("view", {main: "login"});
    }
  });
  FlowRouter.route('/chaperoning', {

    action: function() {
      BlazeLayout.render("view", {main: "chaperoning"});
    }
  });

  FlowRouter.route('/upload',{
    action: function() {
      name: 'upload',
      BlazeLayout.render("view", {main: "upload"});
    }
  });
  FlowRouter.route('/export',{
    action: function() {
      name: 'export',
      BlazeLayout.render("view", {main: "export"});
    }
  });
  var tournamentRoutes = FlowRouter.group({
  prefix: '/tournaments',
    name: 'tournament',
  });
  // for /tournaments/create-tournament route
  tournamentRoutes.route('/create-tournament', {
    action: function() {
      BlazeLayout.render('view', {main: 'createTournament'});
    }
  });
  //list of exisiting tournaments
  tournamentRoutes.route('/admin_tournament_view', {
    action: function() {
      BlazeLayout.render('view', {main: 'tournaments'});
    }
  });
  //edit a tournament
  tournamentRoutes.route('/admin_tournament_view/edit/:tournamentId', {
    name: 'editTournament',
    action: function() {
      BlazeLayout.render('view', {main: 'editTournament'});
    }
  });
  //for /tournaments/entries route
    //list of all the tournaments ppl have signed up for
  tournamentRoutes.route('/entries', {
    action: function() {
      BlazeLayout.render('view', {main: 'entries'});
    }
  });
  // for /tournaments/signup route
  tournamentRoutes.route('/signup', {
    action: function() {
      BlazeLayout.render('view', {main: 'tSignup'});
    }
  });
  //for /tournaments/myTournaments route
    //tournaments signed up for (in order)
  tournamentRoutes.route('/myTournaments', {
    action: function() {
      BlazeLayout.render('view', {main: 'myTournaments'});
    }
  });
  //for /tournaments/editEntry route
    //to edit your own tournament entries

  tournamentRoutes.route('/myTournaments/edit/:entryId', {
    name: "editEntry",
    action: function() {
      BlazeLayout.render('view', {main: 'editEntry'});
    }
  });


FlowRouter.route('/profile', {
  name: "profile",
  action: function() {
    BlazeLayout.render("view", {main: "profile"});
  }
  });
  FlowRouter.route('/profile/edit', {
    action: function() {
      BlazeLayout.render("view", {main: "editView"});
    }
  });
  FlowRouter.route('/logout', {
    action: function() {
      BlazeLayout.render("view", {main: "logout"});
    }
  });
FlowRouter.route('/payContribution', {
  action: function() {
    BlazeLayout.render("view", {main: "payContribution"});
  }
});

FlowRouter.route('/waiver', {
  action: function() {
    BlazeLayout.render("view", {main: "waiver"});
  }
});

FlowRouter.route('/signupSuccess', {
  action: function() {
    BlazeLayout.render("view", {main: "signupSuccess"});
  }
});

FlowRouter.route('/accountBalance', {
  action: function() {
    BlazeLayout.render("view", {main: "accountBalance"});
  }
});

FlowRouter.route('/logPayments', {
  action: function() {
    BlazeLayout.render("view", {main: "logPayments"});
  }
});

FlowRouter.route('/addMoney', {
  action: function() {
    BlazeLayout.render("view", {main: "addMoney"});
  }
});

FlowRouter.route('/changeUserBalance', {
  action: function() {
    BlazeLayout.render("view", {main: "changeUserBalance"});
  }
});

FlowRouter.route('/events', {
  action: function() {
    BlazeLayout.render("view", {main: "events"});
  }
});

FlowRouter.route('/whyJoin', {
  action: function() {
    BlazeLayout.render("view", {main: "whyjoin"});
  }
});

FlowRouter.route('/coaches', {
  action: function() {
    BlazeLayout.render("view", {main: "coaches"});
  }
});

FlowRouter.route('/officers', {
  action: function() {
    BlazeLayout.render("view", {main: "officers"});
  }
});

FlowRouter.route('/reimburse', {
  action: function() {
    BlazeLayout.render("view", {main: "reimburse"});
  }
});

FlowRouter.route('/judge', {
  action: function() {
    BlazeLayout.render("view", {main: "judge"});
  }
});

FlowRouter.route('/ipace', {
  action: function() {
    BlazeLayout.render("view", {main: "ipace"});
  }
});

FlowRouter.route('/initialLogin', {
  action: function() {
    BlazeLayout.render("view", {main: "initialLogin"});
  }
});

FlowRouter.route('/nuisanceFee', {
  action: function() {
    BlazeLayout.render("view", {main: "nuisanceFee"});
  }
});

FlowRouter.route('/tournamentProcedure', {
  action: function() {
    BlazeLayout.render("view", {main: "tournamentProcedure"});
  }
});

FlowRouter.route('/contactevsd', {
  action: function() {
    BlazeLayout.render("view", {main: "contactevsd"});
  }
});

FlowRouter.route('/contactipace', {
  action: function() {
    BlazeLayout.render("view", {main: "contactipace"});
  }
});

FlowRouter.route('/contacttech', {
  action: function() {
    BlazeLayout.render("view", {main: "contacttech"});
  }
});
FlowRouter.route('/practiceCalendar', {
  action: function() {
    BlazeLayout.render("view", {main: "practiceCalendar"});
  }
});

FlowRouter.route('/tournamentCalendar', {
  action: function() {
    BlazeLayout.render("view", {main: "tournamentCalendar"});
  }
});

FlowRouter.route('/ForgotPassword', {
  action: function() {
    BlazeLayout.render("view", {main: "ForgotPassword"});
  }
});

FlowRouter.route('/ResetPassword', {
  action: function() {
    BlazeLayout.render("view", {main: "ResetPassword"});
  }
});

FlowRouter.route('/tournamentSignup', {
  action: function() {
    BlazeLayout.render("view", {main: "tournamentSignup"});
  }
});

FlowRouter.route('/judgeSignup', {
  action: function() {
    BlazeLayout.render("view", {main: "judgeSignup"});
  }
});

FlowRouter.route ('/editablePage_edit',{
  action:function(){
    BlazeLayout.render("view",{main: "editablePage_edit"});
  }
})
FlowRouter.route ('/editablePage_1',{
  action:function(){
    BlazeLayout.render("view",{main: "editablePage_1"});
  }
})
FlowRouter.route('/backupPayment', {
  action: function() {
    BlazeLayout.render("view", {main: "backupPayment"});
  }
});
FlowRouter.notFound = {
  action: function() {
    BlazeLayout.render("view", {main: "404"})
  }
};
