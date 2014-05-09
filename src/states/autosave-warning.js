var game = require('game');

//TODO: Add warning
game.state.add('autosave-warning', {
  preload: function(){
    game.state.start('scanning');
  }
});
