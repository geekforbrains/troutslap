Router.route('/', {
  name: 'main',
  data: function() {
    return {
      openGames: Game.find({players: {$size: 1}}),
      activeGames: Game.find({players: {$size: 2}, winner: null})
    };
  }
});

Router.route('/:_id', {
  name: 'game',
  data: function() {
    return Game.findOne(this.params._id);
  }
});
