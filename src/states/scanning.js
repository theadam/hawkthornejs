define(function(require){
  var game = require('game');
  var config = require('config');
  var utils = require('utils');

  game.state.add('scanning', {
    preload: function(){
      game.load.spritesheet('background', 'assets/images/scanning/backgrounds.png', 400, 250);
      game.load.spritesheet('computer', 'assets/images/scanning/computer.png', 75, 19);

      game.load.audio('opening', ['assets/audio/music/opening.mp3', 'assets/audio/music/opening.ogg']);
    },

    create: function(){
      utils.playSong('opening');
      // sets length of time for animation
      var seconds = 10.0;
      var frames = 7;

      var background = game.add.sprite(0, 0, 'background');
      var xCorner = (config.world_width - background.width) / 2;
      var yCorner = (config.world_height - background.height) / 2;
      background.position.setTo(xCorner, yCorner);
      background.animations.add('cycle', [1,2,3,4,5,6,7], 6/seconds);
      background.animations.play('cycle');

      var computer = game.add.sprite(xCorner + 162, yCorner + 150, 'computer');
      computer.animations.add('processing', [1,2,3,4,5,6,7,8,9], 12.5, true);
      computer.play('processing');
    }
  });
});
