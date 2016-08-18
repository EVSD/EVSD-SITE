Users = new Mongo.Collection('user');

Users.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});