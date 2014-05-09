var PIXI = require('pixi');
var game = require('game');
var utils = require('utils');
var credits = require('assets/data/credits.json');
var controls = require('controls');
var config = require('config');

game.state.add('credits', {
  preload: function(){
    game.load.audio('credits', ['assets/audio/music/credits.mp3', 'assets/audio/music/credits.ogg']);
    game.input.keyboard.addCallbacks(this, this.onKeyPressed);
  },

  create: function(){
    utils.playSong('credits');
    for(var i = 0; i < credits.length; i++){
      var name = credits[i];
      var text = utils.newBitmapText(0,  config.world_height + (i + 1) * 25, 'big', name);
      text.position.x = (config.world_width - text.textWidth) / 2;
    }

    this.y = 0;
  },

  update: function(){
    this.y += (0.05 * game.time.elapsed);
    game.camera.y = this.y * game.camera.scale.y;
    if(game.camera.y / game.camera.scale.y > (credits.length * 25 + 500)){
      game.state.start('boot');
    }
  },

  shutdown: function(){
    game.input.keyboard.onDownCallback = null;
    game.camera.reset();
  },

  onKeyPressed: function(event){
    var code = event.keyCode;
    if(code === controls.UP){
      this.y = Math.max( this.y - 100, 300 );
    }
    else if(code === controls.DOWN){
      this.y = Math.min( this.y + 100, ( credits.length * 25 ) + 30 );
    }
    else if([controls.SELECT, controls.START, controls.JUMP, controls.ATTACK, controls.INTERACT, controls.LEFT, controls.RIGHT].indexOf(code) >= 0){
      game.state.start('boot');
    }
  }
});
