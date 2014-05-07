define(function(require){
  var Phaser = require('phaser'),
      config = require('config'),
      game = new Phaser.Game(config.width, config.height, Phaser.AUTO);
  
  return game;
});