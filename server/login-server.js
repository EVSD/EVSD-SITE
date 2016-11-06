Meteor.methods({
  recordLogin(userId) {
    Meteor.users.update(userId, {
      $set: {"profile.lastLogin": new Date()}
    });
  }
});
