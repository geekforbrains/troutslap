Template.game.events({
  'click #joinGame': function(e) {
    e.preventDefault();
    var game = currentGame();
    var player = _.clone(PlayerSchema);
    player.user_id = Meteor.userId();
    player.username = Meteor.user().username;

    Game.update(game._id, {
      $set: {'whos_turn': Meteor.userId()},
      $push: {
        'players': player,
        'timeline': Meteor.user().username + ' joined the game, they go first',
      }
    });
  }
});

Template.game.helpers({
  template: function() {
    var game = currentGame();

    // TODO handle logic for "spectators"
    if(game.winner)
      return 'gameover';

    else if(!Meteor.user())
      return 'login';

    else if(game.players.length > 1)
      return game.whos_turn == Meteor.userId() ? 'actions' : 'wait';

    else if(game.players[0].user_id != Meteor.userId())
      return 'join';
  },
  reverse: function(timeline) {
    return timeline.reverse();
  }
});
