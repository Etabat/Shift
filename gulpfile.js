var nodemon = require('gulp-nodemon');
var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('feedback', function () {
  console.log('Change has occurred')
});

gulp.task('watch', function () {
  gulp.watch('*.js', ['test']);
});

gulp.task('test', function () {
  return gulp.src('server.js', {read:  false})
      .pipe(mocha({reporter: 'landing'}));
});

gulp.task('nodemon', function () {
  nodemon({
    script: 'server.js',
    ext: 'js'
  })
      .on('start', ['test', 'feedback', 'watch'], function () {
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