Template.actions.events({
  'submit form': function(e) {
    e.preventDefault();
    var game = currentGame();
    var actionId = e.target.action.value;
    var action = Actions.findOne(actionId);
    var player = getPlayer();
    var opponent = getOpponent();
    var timeline = action.text.replace('{{player}}', player.username)
                          .replace('{{opponent}}', opponent.username);

    // Ensure player can perform this action
    if(action.cost > player.tokens) {
      alert('You dont have enough tokens');
      return;
    }

    // Perform action on player/opponent
    switch(action.type) {
      case 'attack':
        opponent.health += action.effect;
        break;

      case 'health':
        (player.health + action.effect) > 100 ? 100 : player.health += action.effect;
        break;
    }

    // Update player tokens
    player.tokens -= action.cost;
    winner = opponent.health <= 0 ? player.username : null;

    Game.update(game._id, {
      $push: {'timeline': timeline},
      $set: {
        'winner': winner,
        'players': [player, opponent]
      }
    });
  },
  'click #endTurn': function(e) {
    e.preventDefault();
    var game = currentGame();
    var player = getPlayer();
    var opponent = getOpponent();

    opponent.tokens += 1;

    Game.update(game._id, {
      $set: {
        whos_turn: opponent.user_id,
        players: [player, opponent]
      },
      $push: {timeline: 'Its your turn, ' + opponent.username}
    });
  }
});

Template.actions.helpers({
  actions: function() {
    return Actions.find();
  }
});
