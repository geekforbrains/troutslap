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
        'timeline': {
          icon: 'user',
          text: Meteor.user().username + ' joined the game, they go first'
        }
      }
    });
  },
  'click .action': function(e) {
    e.preventDefault();
    var actionId = e.target.attributes['data-id'].value;
    var action = Actions.findOne(actionId);
    var game = currentGame();
    var player = getPlayer();
    var opponent = getOpponent();
    var actionText = action.text.replace('{{player}}', player.username)
                          .replace('{{opponent}}', opponent.username);

    // Ensure player can perform this action
    if(action.cost > player.tokens) {
      alert('You dont have enough gems');
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
    var winner = opponent.health <= 0 ? player.username : null;
    var timeline = game.timeline;

    timeline.push({
      icon: action.type === 'attack' ? 'bolt' : 'medkit',
      text: actionText
    });

    var chance = Math.floor((Math.random() * 5) + 1);
    console.log('chance: ' + chance);
    var chanceTokens = Math.floor((Math.random() * 3) + 1);
    if(chance === 3) {
      timeline.push({
        icon: 'diamond',
        text: player.username + ' randomly finds ' + chanceTokens + ' gems, how nice!'
      });
      player.tokens += chanceTokens;
    }

    if(winner) {
      timeline.push({
        icon: 'gift',
        text: winner + ' wins, game over!'
      });
    }

    Game.update(game._id, {
      $set: {
        'winner': winner,
        'players': [player, opponent],
        'timeline': timeline
      }
    });
  },
  'click #endTurn': function(e) {
    e.preventDefault();
    var game = currentGame();
    var player = getPlayer();
    var opponent = getOpponent();

    // Number of tokens a user gets at the start of their turn
    opponent.tokens += 2;

    Game.update(game._id, {
      $set: {
        whos_turn: opponent.user_id,
        players: [player, opponent]
      },
      $push: {
        timeline: {
          icon: 'arrows-h',
          text: 'Its your turn, ' + opponent.username
        }
      }
    });
  }
});

Template.game.helpers({
  // Gets the current user, if they're a player in the game
  player: function() {
    return getPlayer();
  },

  // Determines if its the current players turn
  playersTurn: function() {
    var game = currentGame();
    if(game.players.length < 2 || isGameOver()) return false;
    return game.whos_turn === Meteor.userId();
  },

  // Gets the other player object, if any
  opponent: function() {
    return getOpponent();
  },

  reverse: function(timeline) {
    return timeline.reverse().slice(0, 10);
  },

  health: function() {
    return Actions.find({type: 'health'});
  },

  attacks: function() {
    return Actions.find({type: 'attack'});
  },

  gameNotOver: function() {
    return !isGameOver();
  }
});
