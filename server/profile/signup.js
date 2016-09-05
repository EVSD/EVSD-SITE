 Meteor.methods({
  createreguser: function(student, parent, misc, waiver){
    // Checks Student, parent, and misc for pattern
    check(student, {
      firstName: String,
      lastName: String,
      DOB: String,
      studentGrade: String,
      emailAddress: String,
      password: String,
      studentPhoneNo: String,
      studentId: String,
      facebookAccount: String,
      facebook: String,
      schoolloop: String
    });
    check(parent, {
      firstParent: String,
      firstParentPhoneNo: String,
      firstParentEmailAddress: String,
      firstParentEmployer: String,
      secondParent: String,
      secondParentPhoneNo: String,
      secondParentEmailAddress: String,
      secondParentEmployer: String
    });
    check(misc, {
        findOut: String,
        whyjoin: String,
        concerns: String
    });
    check(waiver, String);

    let x = Math.floor((Math.random() * 100000));
    let name = student.firstName+student.lastName+x;
    //creates the user
    var user = Accounts.createUser({
      // MARK: give the ability to change all of this
      username: name,
      password: student.password,
      email: student.emailAddress,
      profile: {

        firstName: student.firstName,
        lastName: student.lastName,
        birthdate: student.DOB,
        studentGrade: student.studentGrade,
        studentPhoneNo: student.studentPhoneNo,
        studentId: student.studentId,
        facebookAccount: student.facebookAccount,
        facebook: student.facebook,
        schoolloop: student.schoolloop,

        firstParent: parent.firstParent,
        firstParentPhoneNo: parent.firstParentPhoneNo,
        firstParentEmailAddress: parent.firstParentEmailAddress,
        firstParentEmployer: parent.firstParentEmployer,
        secondParent: parent.secondParent,
        secondParentPhoneNo: parent.secondParentPhoneNo,
        secondParentEmailAddress: parent.secondParentEmailAddress,
        secondParentEmployer: parent.secondParentEmployer,

        findOut: misc.findOut,
        whyjoin: misc.whyjoin,
        concerns: misc.concerns,

        // keeps track of account balance
        balance: 0,
        payContribution: "no",
        accountBalanceLog: [],
        waiverUrl: waiver,

      }
    });

    if (student.emailAddress == 'test@gmail.com'){
      Roles.addUsersToRoles(user, 'admin');
    }else{
      Roles.addUsersToRoles(user, 'frozen');
    }

     console.log('successfully created user');

  }
});
