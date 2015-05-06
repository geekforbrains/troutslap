/**
 * Gets the current game based on the uri id.
 */
currentGame = function() {
  return Game.findOne(Router.current().params._id);
}

/**
 * Gets the current users player object from the current game
 */
getPlayer = function() {
  var game = currentGame();
  return game.players[0].user_id == Meteor.userId() ? game.players[0] : game.players[1];
}

/**
 * Gets the current users opponent from a given game.
 */
getOpponent = function() {
  var game = currentGame();
  return game.players[0].user_id == Meteor.userId() ? game.players[1] : game.players[0];
}

isGameOver = function() {
  var game = currentGame();
  return !!game.winner;
}
