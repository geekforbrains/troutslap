Game = new Mongo.Collection('games');

GameSchema = {
  players: [],
  whos_turn: null,
  winner: null,
  timeline: [],
  created_at: null
};

PlayerSchema = {
  user_id: null,
  username: null,
  health: 100,
  tokens: 3
}

if(Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });
}
