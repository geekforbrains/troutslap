if(Meteor.isClient) { // Must be within client, because the collection is "local" only
  Actions = new Mongo.Collection(null); // local collection

  var actionData = [
    // Attacks
    {
      type: 'attack',
      title: 'Wedgie',
      text: '{{player}} gives {{opponent}} a wedgie, how embarrassing!',
      effect: -10,
      cost: 1
    },
    {
      type: 'attack',
      title: 'Slap with trout',
      text: '{{player}} slaps {{opponent}} with a large trout, lol!',
      effect: -15,
      cost: 2
    },
    {
      type: 'attack',
      title: 'Drop-kick to the head',
      text: '{{player}} drop-kicks {{opponent}} in the head, ouch!',
      effect: -25,
      cost: 3
    },
    {
      type: 'attack',
      title: 'Block on Facebook',
      text: '{{player}} totally just blocked {{opponent}} on Facebook, not cool!',
      effect: -40,
      cost: 4
    },

    // Health
    {
      type: 'health',
      title: 'Bandage',
      text: '{{player}} bandages their wounds.',
      effect: +5,
      cost: 1
    },
    {
      type: 'health',
      title: 'Drink a beer',
      text: '{{player}} drinks an extra-strong ale, mmm.',
      effect: +20,
      cost: 3
    },
    {
      type: 'health',
      title: 'Eat a salad',
      text: '{{player}} sits down to eat a salad... really?',
      effect: +50,
      cost: 10
    }
  ];

  if(Actions.find().count() === 0) {
    _.each(actionData, function(i) {
      Actions.insert(i)
    });
  }
}
