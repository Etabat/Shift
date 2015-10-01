var nodemon = require('gulp-nodemon');
var gulp = require('gulp');
var mocha = require('gulp-mocha');

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

gulp.task('nodemon', function () {
  nodemon({
    script: 'test.js',
    ext: 'js'
  })
      .on('start', ['watch'], function () {
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