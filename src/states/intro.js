define(function(require){
  require('states/boot');
  var game = require('game');
  var Phaser = require('phaser');
  var config = require('config');
  var utils = require('utils');


  game.state.add('intro', {

    preload: function(){
      game.load.audio('ending', 'media/audio/music/ending.ogg');
      game.load.image('splash', 'media/images/menu/splash.png');
    },

    create: function(){
      utils.playSong('ending');
      this.logo = game.add.sprite(0, 0, 'splash');
      this.logo.position.setTo(config.world_width / 2 - this.logo.width / 2, config.world_height / 2 - this.logo.height / 2);
      this.logo.alpha = 0;
      this.tween = game.tweens.create(this.logo).to({alpha: 1}, 2550, null, true);
      this.tween.onComplete.addOnce(function(){
        game.time.events.add(1000, function(){game.state.start('boot');});
      });
    }
  });

});