define(function(require){
  var game = require('game');
  var Phaser = require('phaser');
  var PIXI = require('pixi');

  var music = {};
  var playing = null;

  return {
    playSong: function(key){
      var song = music[key];
      if(!song){
        song = game.add.audio(key);
        music[key] = song;
      }

      if(song != playing){
        if(playing && playing.isPlaying){
          playing.stop();
        }
        song.play('', 0, 1, true, false);
        playing = song;
      }
    },

    playSfx: function(key){
      game.sound.play(key, 1, false);
    },

    newBitmapText: function(x, y, font, text, scale){
      return game.add.bitmapText(x, y, font, text, PIXI.BitmapText.fonts[font].size * (scale || 1));
    },

    parseArguments: function(){
      var query = location.search.substr(1);
      var data = query.split("&");
      var result = {};
      for(var i=0; i<data.length; i++) {
        var item = data[i].split("=");
        result[decodeURIComponent(item[0])] = decodeURIComponent(item[1]);
      }
      return result;
    }

  };
});