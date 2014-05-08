require.config({
  baseUrl: 'src',
  paths : {
    lib: '../lib',
    assets: '../assets',
    Phaser: '../lib/phaser',
    PIXI: '../lib/pixi-wrapper',
    text: '../lib/text'
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

  require('states/master');

  game.state.start('setup');
});
