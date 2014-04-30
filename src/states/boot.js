define(function(require){
  var game = require('game');
  var Phaser = require('phaser');
  var config = require('config');
  var utils = require('utils');

  game.state.add('boot', {

    preload: function(){
      this.menu = [ 'start', 'controls', 'options', 'credits', 'exit' ];

      game.load.audio('ending', 'media/audio/music/ending.ogg');

      game.load.image('outline', 'media/images/menu/openingmenu.png');
      game.load.image('arrow', 'media/images/menu/small_arrow.png');

      this.line = (" terminal:// \n\n operations://loadprogram:(true) \n\n" +
                   " program:-journey-to-the-center-of-hawkthorne \n\n loading simulation ...").split('');
      game.load.bitmapFont('courier', 'media/images/fonts/courier.png', 'media/images/fonts/courier.xml');
      game.load.bitmapFont('big', 'media/images/fonts/big.png', 'media/images/fonts/big.xml');

      this.line_short = "";
      this.line_count = 1;
      this.line_timer = 0;
    },

    create: function(){
      utils.playSong('ending');
      var text_color = Phaser.Color.RGBtoHexstring(Phaser.Color.getColor(48, 254, 31));

      this.text = utils.newBitmapText(50, 50, 'courier', this.line_short, 0.5);
      this.text.alpha = 225 / 255;
      this.text.tint = text_color;

      var notice = utils.newBitmapText(0, config.world_height - 32, 'big', 'JUMP or ATTACK: select item', 0.5);
      notice.position.x = (config.world_width - notice.textWidth) / 2;

      var splash = game.add.sprite(0, 0, 'outline');
      var x = (config.world_width - splash.width) / 2;
      var y =  2*config.world_height / 3 - splash.height / 2;

      splash.position.setTo(x, y);

      var arrow = game.add.sprite(x + 12, y + 10, 'arrow');
      
      for(var i = 0; i < this.menu.length; i++){
        var item = this.menu[i];
        utils.newBitmapText(x + 23, y + 12 * i + 10, 'big', item, 0.5);
      }
    },

    update: function(){
      this.line_timer += game.time.elapsed;
      if(this.line_timer > 50){
        this.line_timer = 0;
        this.line_short += this.line.splice(0,1);
        this.text.text = this.line_short;
      }
    }
  });

});