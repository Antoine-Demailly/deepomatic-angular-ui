'use strict';

// Common dependencies
const gulp   = require('gulp');
const rename = require('gulp-rename');

// CSS dependencies
const csso         = require('gulp-csso');
const sass         = require('gulp-sass');
const csscomb      = require('gulp-csscomb');
const cssbeautify  = require('gulp-cssbeautify');
const autoprefixer = require('gulp-autoprefixer');

// JS dependencies
const concat     = require('gulp-concat');
const uglify     = require('gulp-uglify');
const ngAnnotate = require('gulp-ng-annotate');

/// Dirs constants
///////

const dirs = {
  dest: './build',
  lib: './lib/',
  npm: './node_modules/',
  sass: './sass',
  js: './js'
};

/// CSS task: gulp css
///////

const sassConfig = {
  task: 'css',
  src: `${dirs.sass}/app.scss`,
  dest: `${dirs.dest}/css/`,
  watch: `${dirs.sass}/**/*.scss`
};

gulp.task(sassConfig.task, function() {
  return gulp.src(sassConfig.src)
    .pipe(sass())
    .pipe(csscomb())
    .pipe(cssbeautify({
      indent: '  '
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest(sassConfig.dest))
    .pipe(csso())
    .pipe(rename({
      suffix: '.min',
    }))
    .pipe(gulp.dest(sassConfig.dest));
});

/// JS task: gulp js
///////

const jsConfig = {
  task: 'js',
  fileName: 'app.js',
  dest: `${dirs.dest}/js/`,
  watch: `${dirs.js}/**/*.js`
};

const jsFiles = [
  './node_modules/angular/angular.js',
  './node_modules/ng-file-upload/dist/ng-file-upload.js',
  './js/app.module.js',
  './js/config/*.run.js',
  './js/config/*.config.js',

  './js/components/**/*.module.js',
  './js/components/**/*.service.js',
  './js/components/**/*.controller.js',
  './js/components/**/*.filter.js',
  './js/components/**/*.factory.js',
];

gulp.task(jsConfig.task, function() {
  gulp.src(jsFiles)
  .pipe(concat(jsConfig.fileName))
  .pipe(ngAnnotate({
    add: true,
    single_quotes: true,
  }))
  .pipe(gulp.dest(jsConfig.dest))
  .pipe(rename({
    suffix: '.min',
  }))
  .pipe(uglify())
  .pipe(gulp.dest(jsConfig.dest));
});

/// Watch: gulp watch
///////

gulp.task('watch', function() {
  gulp.watch(sassConfig.watch, [sassConfig.task]);
  gulp.watch(jsConfig.watch, [jsConfig.task]);
});

/// Exec all task: gulp all
gulp.task('all', [
  sassConfig.task,
  jsConfig.task
]);
