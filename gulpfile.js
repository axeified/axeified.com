var path = require('path');
var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');

var src = ['./src/**/*'];
var dest = './dist';

gulp.task('package', function () {
  return gulp.src(src)
    .pipe(gulp.dest(dest));
});

gulp.task('deploy', ['package'], function () {
  return gulp.src([path.join(dest, '**/*')])
    .pipe(ghPages());
});

gulp.task('default', function () {
  console.log('default task ran');
});