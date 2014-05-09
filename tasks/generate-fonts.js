var pngparse = require('pngparse');
var path = require('path');
var builder = require('xmlbuilder');
var console = require('console')
var fs = require('fs');
var glob = require('glob');
var async = require('async');

var glyphs = " abcdefghijklmnopqrstuvwxyz" +
"ABCDEFGHIJKLMNOPQRSTUVWXYZ0" +
"123456789.,!?-+/\\:;%&`'*#=\"$()<>{}" +
"|||||||||" +
"^";

var getColorString = function(data, i){
  var start = i * 4;
  return data[start] + '|' + data[start + 1] + '|' + data[start + 2] + '|' + data[start + 3];
};

module.exports = function(cb){

  var task = this;
  var pngs = glob.sync('./assets/fonts/*.png');

  console.log(pngs);

  async.forEach(pngs, function(element, callback){
    console.log('generating font for file: ' + element);
    pngparse.parseFile(element, function(err, data) {

      if(err){
        callback(err);
        return;
      }

      var startingColor = getColorString(data.data, 0);

      var face = path.basename(element).split('.')[0];
      var xmlPath = path.dirname(element) + '/' + face + '.xml';

      var glyphIndex = -1;
      var inGlyph = false;
      var startingIndex = null;

      var fontXml = builder.create('font');
      fontXml.ele('info', {face: face, size: data.height});
      fontXml.ele('common', {lineHeight: data.height});
      fontXml.ele('pages').ele('page', {id: 0, texture: path.basename(element)});
      var charsXml = fontXml.ele('chars');

      for(var i = 0; i < data.width; i++){
        var color = getColorString(data.data, i);
        if(color == startingColor){
          if(inGlyph){
            inGlyph = false;
            charsXml.ele('char', {
              id: glyphs.charCodeAt(glyphIndex),
              x: startingIndex,
              y: 0,
              width: i - startingIndex,
              height: data.height,
              xoffset: 0,
              yoffset: 0,
              xadvance: i - startingIndex + 2
            });
          }
        }
        else{
          if(!inGlyph){
            inGlyph = true;
            startingIndex = i;
            glyphIndex++;
          }
        }
      }
      fs.writeFileSync(xmlPath, fontXml.end({pretty: true}));
      callback();
    });
  }, function(error){cb(error);});
};
