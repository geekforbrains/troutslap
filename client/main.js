if(Meteor.isClient) {
  Template.main.events({
    'click #createGame': function(e) {
      e.preventDefault();

      var player = _.clone(PlayerSchema);
      player.user_id = Meteor.userId();
      player.username = Meteor.user().username;

      var game = _.clone(GameSchema);
      game.players.push(player);
      game.timeline.push({
        icon: 'plus-square',
        text: Meteor.user().username + ' created a game'
      });
      game.created_at = new Date();

      var gameId = Game.insert(game);
      return Router.go('game', {_id: gameId});
    }
  });
}
