Router.route('/', {
  name: 'main'
});

Router.route('/:_id', {
  name: 'game',
  data: function() {
    return Game.findOne(this.params._id);
  }
});
