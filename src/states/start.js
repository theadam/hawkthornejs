define(function(require){
  var game = require('game');
  
  
  //TODO: ADD GAMESAVE FUNCTIONALITY
  game.state.add('start', {
    preload: function(){
      game.state.start('autosave-warning');
    }
  });
});