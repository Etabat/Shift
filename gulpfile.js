var gulp = require('gulp');

// default start
gulp.task('default', ['min', 'nodemon', 'test', 'sync']);

//task separation
require('require-dir')('./gulp');