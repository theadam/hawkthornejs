var game = require('game');
var Phaser = require('phaser');
var config = require('config');
var utils = require('utils');
var controls = require('controls');
var Menu = require ('components/menu');

var disabled = ['controls', 'options', 'exit'];

var getStateSwitchFunction = function(option){
  return function(){
    game.state.start(option);
  };
};

var buildMenu = function(menu, options){
  for(var i = 0; i < options.length; i++){
    menu.addOption(options[i], getStateSwitchFunction(options[i]));
  }
};

game.state.add('boot', {

  preload: function(){
    game.load.audio('ending', ['assets/audio/music/ending.mp3', 'assets/audio/music/ending.ogg']);
    game.load.audio('click', ['assets/audio/sfx/click.ogg', 'assets/audio/sfx/click.mp3']);
    game.load.audio('confirm', ['assets/audio/sfx/confirm.ogg', 'assets/audio/sfx/confirm.mp3']);

    this.menu = new Menu('click', 'confirm');
    buildMenu(this.menu, ['start', 'controls', 'options', 'credits', 'exit']);

    game.load.image('outline', 'assets/images/menu/openingmenu.png');
    game.load.image('arrow', 'assets/images/menu/small_arrow.png');

    this.line = (" terminal:// \n\n operations://loadprogram:(true) \n\n" +
                 " program:-journey-to-the-center-of-hawkthorne \n\n loading simulation ...").split('');

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
    var y = this.baseY =  2*config.world_height / 3 - splash.height / 2;

    splash.position.setTo(x, y);

    this.arrow = game.add.sprite(x + 12, y + 10, 'arrow');

    for(var i = 0; i < this.menu.options.length; i++){
      var item = this.menu.options[i];
      var text = utils.newBitmapText(x + 23, y + 12 * i + 10, 'big', item, 0.5);
      if(disabled.indexOf(item) >= 0){
        text.alpha = 0.5;
      }

    }

    controls.addKey(controls.UP).onDown.add(this.handleUp, this);
    controls.addKey(controls.DOWN).onDown.add(this.handleDown, this);
    controls.addKey(controls.JUMP).onDown.add(this.handleAction, this);
    controls.addKey(controls.ATTACK).onDown.add(this.handleAction, this);
    controls.addKey(controls.INTERACT).onDown.add(function(){game.scale.startFullScreen();}, this);
  },

  update: function(){
    this.line_timer += game.time.elapsed;
    if(this.line_timer > 50){
      this.line_timer = 0;
      this.line_short += this.line.splice(0,1);
      this.text.text = this.line_short;
    }
  },

  shutdown: function(){
    controls.resetKeys();
  },

  setArrowPosition: function(){
    this.arrow.position.y = this.baseY + 12 * this.menu.curSelection + 10;
  },

  handleDown: function(){
    this.menu.next();
    this.setArrowPosition();
  },

  handleUp: function(){
    this.menu.previous();
    this.setArrowPosition();
  },

  handleAction: function(){
    this.menu.select();
  }

});
