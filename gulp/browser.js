var gulp = require('gulp');
var browserSync = require('browser-sync').create();

// browser sync with watch
gulp.task('sync', function() {
  browserSync.init({
    proxy: 'localhost:1337'
  });
  gulp.watch('./public/*', ['min', 'test']).on('change', browserSync.reload);
});