var gulp = require('gulp');
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');

gulp.task('feedback', function () {
  console.log('Change has occurred')
});

gulp.task('watch', function () {
  gulp.watch('./json/emotions.json', ['test', 'feedback']);
});

gulp.task('test', function () {
  return gulp.src('test.js', {read:  false})
      .pipe(mocha({reporter: 'landing'}));
});

gulp.task('minify', function () {
  return gulp.src('./public/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(uglify())
      .pipe(gulp.dest('./public/dist'))
});

gulp.task('nodemon', function () {
  nodemon({
    script: 'test.js',
    ext: 'js'
  })
      .on('start', ['watch',  'minify'], function () {
        console.log('Server has started')
      })
      .on('change', function () {
        console.log('Change has occurred')
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