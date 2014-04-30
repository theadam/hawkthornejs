define(function(require){
  require('states/intro');
  var game = require('game');
  var Phaser = require('phaser');
  var config = require('config');



  game.state.add('setup', {

    create: function(){
      game.world.scale.setTo(config.width / config.world_width, config.height / config.world_height);
      game.state.start('intro');
    }
  });

});