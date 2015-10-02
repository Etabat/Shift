var gulp = require('gulp');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var minifyImage = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');

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
  return gulp.src('../public/*.css')
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

gulp.task('image', function () {
  return gulp.src('./public/images/*')
      .pipe(minifyImage())
      .pipe(gulp.dest('./public/dist/images'))
});
