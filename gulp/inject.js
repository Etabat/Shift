var gulp = require('gulp');
var wiredep = require('wiredep').stream;

gulp.task('inject', function () {
  gulp.src('./public/index.html')
      .pipe(wiredep({
        optional: 'configuration',
        goes: 'here'
      }))
      .pipe(gulp.dest('./public/dist2'));
});