define(function(require){
  var game = require('game');
  var Phaser = require('phaser');
  var config = require('config');
  var utils = require('utils');

  game.state.add('setup', {

    preload: function(){
      //fonts
      game.load.bitmapFont('big', 'assets/fonts/big.png', 'assets/fonts/big.xml');
      game.load.bitmapFont('courier', 'assets/fonts/courier.png', 'assets/fonts/courier.xml');
      game.load.bitmapFont('arial', 'assets/fonts/arial.png', 'assets/fonts/arial.xml');
      game.load.bitmapFont('small', 'assets/fonts/small.png', 'assets/fonts/small.xml');
    },

    create: function(){
      //set resize on fonts
      //PIXI.BaseTextureCache.big.scaleMode = PIXI.scaleModes.NEAREST;
      //PIXI.BaseTextureCache.courier.scaleMode = PIXI.scaleModes.NEAREST;
      //PIXI.BaseTextureCache.arial.scaleMode = PIXI.scaleModes.NEAREST;
      //PIXI.BaseTextureCache.small.scaleMode = PIXI.scaleModes.NEAREST;
      
      game.stage.smoothed = false;
      
      game.world.scale.setTo(config.width / config.world_width, config.height / config.world_height);
      
      game.time.advancedTiming = true;
      game.plugins.add({
        render: function(){
          var font = '16px Courier';
          this.game.debug.context.font = font;
          var text = game.time.fps + " FPS";
          var width = this.game.debug.context.measureText(text).width;
          this.game.debug.text(text, config.width - width - 5, 16, '#FFFFFF', font);
        }
      });

      game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
      game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
      
      game.camera.bounds = null;

      var state = 'intro';

      var args = utils.parseArguments();
      if(args.state){
        state = args.state;
      }

      game.state.start(state);
    }
  });

});