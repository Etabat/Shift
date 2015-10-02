var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var minifyImage = require('gulp-imagemin');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync').create();

gulp.task('watch', ['sync'], function() {
  gulp.watch('./public/*', ['min', 'reload']);
});

gulp.task('test' ,function () {
  return gulp.src('test.js', {read:  false})
    .pipe(mocha({reporter: 'landing'}));
});

gulp.task('min', ['html', 'css', 'js']);

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

gulp.task('sync', function() {
  browserSync.init({
    proxy: 'localhost:1337'
  });
});

gulp.task('reload', browserSync.reload(['./public/dist/*']));

gulp.task('nodemon', function () {
  nodemon({
    script: 'server.js',
    ext: 'js'
  })
    .on('start', ['min', 'watch'], function () {
      console.log('Server has started')
    })
    .on('change', function () {
      console.log('Change has occurred -nodemon')
    })
    .on('crash', function () {
      console.log('Server has crashed!')
    })
    .on('restart', function () {
      console.log('Restarted!')
    })
});

// default start
gulp.task('default', ['nodemon']);