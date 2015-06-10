'use strict';

var gulp = require('gulp');
var webpack = require('webpack-stream');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var path = require('path');

var basename = 'media_queryable';

gulp.task('bundle', function() {
  return gulp.src(path.join('src', basename + '.js'))
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('dist/'));
});

gulp.task('compress', ['bundle'], function() {
  return gulp.src(path.join('dist', basename + '.js'))
    .pipe(uglify())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(rename(basename + '.min.js'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['compress']);
