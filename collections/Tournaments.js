Tournaments = new Mongo.Collection('tournament');

Tournaments.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});