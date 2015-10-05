var gulp = require('gulp');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var minifyImage = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');

// minification of public files. runs tasks in series
gulp.task('image', ['inject'], function () {
  return gulp.src('./public/images/*')
      .pipe(minifyImage())
      .pipe(gulp.dest('./public/dist/images'));
});

gulp.task('html', ['image'] ,function () {
  var opts = {
    conditionals: true
  };
  return gulp.src('./public/*.html')
      .pipe(minifyHtml(opts))
      .pipe(gulp.dest('./public/dist'))
});

gulp.task('css', ['image', 'html'] ,function () {
  return gulp.src('../public/*.css')
      .pipe(minifyCss())
      .pipe(gulp.dest('./public/dist'))
});

gulp.task('js', ['image', 'html', 'css'], function () {
  return gulp.src('./public/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/dist'))
});

gulp.task('min', ['image', 'html', 'css', 'js']);
