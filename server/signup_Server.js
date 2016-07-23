 Meteor.methods({
  createreguser: function(student){
    // Chec our customer object against our expected pattern.
    check(student, {
      firstName: String,
      middleName: String,
      lastName: String,
      DOB: String,
      studentGrade: String,
      emailAddress: String,
      password: String,
      studentPhoneNo: String,
      studentId: String,
      facebookAccount: String,
      facebookEvsd: String,
      schoolloopEvsd: String
    });

    var username = student.emailAddress;
    var email = student.emailAddress;
    var password = student.password;

    var user = Accounts.createUser({
      username: username,
      email: email,
      password: password,
      profile: {
        firstName: student.firstName,
        middleName: student.middleName,
        lastName: student.lastName,
        DOB: student.DOB,
        studentGrade: student.studentGrade,
        studentPhoneNo: student.studentPhoneNo,
        studentId: student.studentId,
        facebookAccount: student.facebookAccount,
        facebookEvsd: student.facebookEvsd,
        schoolloopEvsd: student.schoolloopEvsd
      }
    });
  }
});