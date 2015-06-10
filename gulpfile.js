'use strict';

var gulp = require('gulp');
var webpack = require('webpack-stream');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var path = require('path');

var basename = 'react_media_queryable';

gulp.task('bundle', function() {
  return gulp.src(path.join('./src/media_queryable.js'))
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./'));
});

gulp.task('compress', ['bundle'], function() {
  return gulp.src(path.join('./' + basename + '.js'))
    .pipe(uglify())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(rename(basename + '.min.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['compress']);
