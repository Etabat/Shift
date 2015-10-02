var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

// nodemon on server & mocha test
gulp.task('nodemon', function () {
  nodemon({
    script: 'server.js',
    ext: 'js'
  })
      .on('start', ['test']);
});