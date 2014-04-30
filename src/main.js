require.config({
  baseUrl: 'src',
  paths : {
    lib: '../lib',
    media: '../media',
    Phaser: '../lib/phaser',
    PIXI: '../lib/phaser'
  },
  map: {
    '*' : {
      phaser : 'Phaser',
      pixi : 'PIXI'
    }
  }
});

define(function(require){
  var game = require('game');

  require('states/setup');

  game.state.start('setup');
});