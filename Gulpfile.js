var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var generateFonts = require('./tasks/generate-fonts');

gulp.task('clean', function(){
  return gulp.src('./build/**')
  .pipe(clean());
});

gulp.task('generate-fonts', generateFonts);

gulp.task('browserify', ['clean'], function(){
  gulp.src('./src/main.js')
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
  .pipe(rename('hawkthorne.js'))
  .pipe(gulp.dest('./build'));
});

gulp.task('default', ['browserify']);
