TournamentList = new Mongo.Collection('tournamentList');

TournamentList.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});