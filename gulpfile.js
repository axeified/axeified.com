var path = require('path');
var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');

var parseArgs = require('minimist');
var args = parseArgs(process.argv);

var repository = 'github.com/axeified/axeified.github.io.git';
var src = ['./src/**/*'];
var dest = './dist';

var gitUser = args.user;
var gitPassword = args.password;

gulp.task('package', function () {
  return gulp.src(src)
    .pipe(gulp.dest(dest));
});

gulp.task('deploy', ['package'], function () {
  if (gitUser && gitPassword) {
    repository = gitUser + ':' + gitPassword + '@' + repository;
  }

  var options = {
    remoteUrl: 'https://' + repository
  };

  return gulp.src([path.join(dest, '**/*')])
    .pipe(ghPages(options));
});

gulp.task('default', function () {
  console.log('default task ran');
});