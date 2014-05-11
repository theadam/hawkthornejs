var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var generateFonts = require('./tasks/generate-fonts');
var runSequence = require('gulp-run-sequence');
var zip = require('gulp-zip');
var es = require('event-stream')

var sourceStream = function(){
  return gulp.src('./src/main.js')
  .pipe(browserify({
    paths : ['./src', './lib', './'],
    shim: {
      phaser : {
        path : './lib/phaser.js',
        exports : 'Phaser',
        depends : {
          pixi : 'PIXI'
        }
      }
    }
  }))
  .pipe(rename('hawkthorne.js'));
}

gulp.task('clean', function(){
  return gulp.src(['./build/**', './dist/**'])
  .pipe(clean());
});

gulp.task('clean-build', function(){
  return gulp.src('./build/**')
  .pipe(clean());
});

gulp.task('clean-dist', function(){
  return gulp.src('./dist/**')
  .pipe(clean());
});

gulp.task('generate-fonts', generateFonts);

gulp.task('browserify', function(){
  sourceStream()
  .pipe(gulp.dest('./build'));
});

gulp.task('zip', ['clean-dist'], function(){
  var assets = gulp.src('./assets/**', {base: './'});
  var src = sourceStream();
  console.log(es.merge(src, assets));
  es.merge(src, assets)
    .pipe(zip('hawkthornejs.zip'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function(){
  gulp.watch('./src/**', ['browserify']);
});

gulp.task('default', function(cb){
  runSequence('clean-build', 'browserify', cb);
});
