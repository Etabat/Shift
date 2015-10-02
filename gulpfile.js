var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var minifyImage = require('gulp-imagemin');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync').create();

// minification of public files
gulp.task('min', ['html', 'css', 'js', 'image']);

gulp.task('js',function () {
  return gulp.src('./public/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/dist'))
});

gulp.task('css', function () {
  return gulp.src('./public/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('./public/dist'))
});

gulp.task('html', function () {
  var opts = {
    conditionals: true
  };
  return gulp.src('./public/*.html')
    .pipe(minifyHtml(opts))
    .pipe(gulp.dest('./public/dist'))
});

gulp.task('image', ['reload'], function () {
  return gulp.src('./public/images/*')
    .pipe(minifyImage())
    .pipe(gulp.dest('./public/dist/images'))
});

// browser sync with watch
gulp.task('sync', function() {
  browserSync.init({
    proxy: 'localhost:1337'
  });
  gulp.watch('./public/*', ['min', 'test']).on('change', browserSync.reload);
});

// nodemon on server & mocha test
gulp.task('nodemon', function () {
  nodemon({
    script: 'server.js',
    ext: 'js'
  })
    .on('start', ['test']);
});

gulp.task('test' ,function () {
  return gulp.src('test.js', {read:  false})
      .pipe(mocha({reporter: 'landing'}));
});

// default start
gulp.task('default', ['nodemon', 'sync']);