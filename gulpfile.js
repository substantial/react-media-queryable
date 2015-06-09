'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var reactify = require('reactify');
var umd = require('gulp-umd');

gulp.task('javascript', function () {
  var b = browserify({
    entries: './index.js',
    debug: true,
    transform: [ reactify ]
  });
  b.external('react');

  return b.bundle()
    .pipe(source('media_queryable.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('umd', ['javascript'], function() {
  return gulp.src('dist/media_queryable.js')
    .pipe(umd({
      exports: function(file) {
        return "MediaQueryable";
      },
      dependencies: function(file) {
        return [
          {
            name: 'react',
            param: 'React'
          }
        ];
      }
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['umd']);
