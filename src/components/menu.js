var utils = require('utils');

var Menu = function(navSound, selectSound){
  this.options = [];
  this.curSelection = 0;
  this.handlers = {};
  this.navSound = navSound;
  this.selectSound = selectSound;
};

Menu.prototype.addOption = function(selection, callback){
  this.options.push(selection);
  this.handlers[selection] = callback;
};

Menu.prototype.next = function(){
  utils.playSfx(this.navSound);
  this.curSelection = (this.curSelection + 1) % this.options.length;
};

Menu.prototype.previous = function(){
  utils.playSfx(this.navSound);
  this.curSelection = (this.curSelection - 1 + this.options.length) % this.options.length;
};

Menu.prototype.select = function(){
  utils.playSfx(this.selectSound);
  if(this.handlers[this.options[this.curSelection]]){
    this.handlers[this.options[this.curSelection]]();
  }
};

module.exports = Menu;
