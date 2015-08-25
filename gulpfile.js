var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var ghPages = require('gulp-gh-pages');

var parseArgs = require('minimist');
var args = parseArgs(process.argv);

var src = ['./src/**/*'];
var dest = './dist';

var gitUser = args.user;
var gitPassword = args.password;

gulp.task('package', function () {
  return gulp.src(src)
    .pipe(gulp.dest(dest));
});

gulp.task('deploy', ['package'], function () {
  if (!gitUser || !gitPassword)
    throw new gutil.PluginError({
      plugin: 'deploy',
      message: 'You must specify both the username and password for the GitHub account'
    });

  var options = {
    remoteUrl: 'https://' + gitUser + ':' + gitPassword + '@github.com/axeified/axeified.github.io.git'
  };

  return gulp.src([path.join(dest, '**/*')])
    .pipe(ghPages(options));
});

gulp.task('default', function () {
  console.log('default task ran');
});