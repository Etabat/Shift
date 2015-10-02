var gulp = require('gulp');
var mocha = require('gulp-mocha');

// mocha test
gulp.task('test' ,function () {
  return gulp.src('test.js', {read:  false})
      .pipe(mocha({reporter: 'landing'}));
});