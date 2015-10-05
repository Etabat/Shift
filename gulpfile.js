var gulp = require('gulp');

// default start
gulp.task('default', ['sync']);

//task separation
require('require-dir')('./gulp');
