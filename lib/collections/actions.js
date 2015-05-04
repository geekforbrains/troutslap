if(Meteor.isClient) {
  Actions = new Mongo.Collection(null); // local collection

  if(Actions.find().count() === 0) {
    _.each([
      {
        type: 'attack',
        title: 'Wedgie',
        text: '{{player}} gives {{opponent}} a wedgie',
        effect: -1,
        cost: 1
      },
      {
        type: 'attack',
        title: 'Slap with trout',
        text: '{{player}} slaps {{opponent}} with a large trout',
        effect: -2,
        cost: 2
      },
      {
        type: 'attack',
        title: 'Drop-kick to the head',
        text: '{{player}} drop-kicks {{opponent}} in the head!',
        effect: -5,
        cost: 3
      },
      {
        type: 'health',
        title: 'Drink lager',
        text: '{{player}} drinks an extra-strong lager',
        effect: +2,
        cost: 2
      },
      {
        type: 'health',
        title: 'Eat carrot',
        text: '{{player}} eats a tiny little carrot',
        effect: +1,
        cost: 1
      }
    ], function(i) {
      Actions.insert(i);
    });
  }
}
