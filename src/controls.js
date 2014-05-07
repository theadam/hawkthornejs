define(function(require){
  var Phaser = require('phaser');
  var game = require('game');

  var controls = {
    _keyCache: [],

    UP : Phaser.Keyboard.UP,
    DOWN : Phaser.Keyboard.DOWN,
    LEFT : Phaser.Keyboard.LEFT,
    RIGHT : Phaser.Keyboard.RIGHT,
    SELECT : Phaser.Keyboard.S,
    START : Phaser.Keyboard.ESC,
    JUMP : Phaser.Keyboard.SPACEBAR,
    ATTACK : Phaser.Keyboard.A,
    INTERACT : Phaser.Keyboard.D,

    resetKeys: function(){
      for(var i = 0; i < this._keyCache.length; i++){
        this._keyCache[i].reset(true);
      }
      this._keyCache = [];
    },

    addKey: function(keyCode){
      var key = game.input.keyboard.addKey(keyCode);
      this._keyCache.push(key);
      return key;
    }
  };

  return controls;

});