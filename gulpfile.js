var gulp = require('gulp');

// default start
gulp.task('default', ['nodemon', 'sync']);

//task separation
require('require-dir')('./gulp');