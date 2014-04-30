define(function(require){
  var config = {};
  
  config.width = 1056;
  config.height = 672;
  config.scale = 0.5;
  config.world_width = config.width * config.scale;
  config.world_height = config.height * config.scale;
    
  return config;
});