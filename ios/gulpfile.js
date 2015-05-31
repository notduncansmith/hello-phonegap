var gulp = require('gulp')
  , shell = require('gulp-shell')
  , less = require('gulp-less')
  , autoprefixer = require('gulp-autoprefixer')
  , browserify = require('browserify')
  , reactify = require('reactify')
  , cache = require('gulp-cached')
  , source = require('vinyl-source-stream')
  , watchify = require('watchify')
  , _ = require('lodash');

var paths = {
  scripts: 'www/src/*.js',
  app: './www/src/app.js',
  appStyles: 'www/less/app.less',
  styles: 'www/less/*.less',
  modules: 'node_modules',
  html: 'www/index.html',
  www: 'www/**/*.*'
};

gulp.task('scripts', function () {
  var builtOnce = false;
  var opts = _.extend({}, watchify.args, {
    entries: [paths.app], // Only need initial file, browserify finds the deps
    transform: [reactify], // We want to convert JSX to normal javascript
    debug: true, // Gives us sourcemapping
    cache: {},
    packageCache: {},
    verbose: true
  });

  var bundler = watchify(browserify(opts), {verbose: true});

  bundler.on('update', bundle);
  bundler.on('time', function (time) {
    if (builtOnce) {
      console.log('Built bundle in ' + (time / 1000).toFixed(2) + 's');
    }
  });

  return bundle();

  function bundle () {
    if (builtOnce) {
      console.log('Building bundle...');
    }

    builtOnce = true;
    return bundler.bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./www/js'))
  }
});

gulp.task('styles', function () {
  return gulp.src(paths.appStyles)
  .pipe(less())
  .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
  }))
  .pipe(gulp.dest('www/css'));
});

gulp.task('build', ['scripts', 'styles']);

gulp.task('build:ios', shell.task('phonegap build'));

gulp.task('watch', ['build'], function () {
  gulp.watch([paths.html], ['build']);
  gulp.watch([paths.styles], ['styles']);
});

gulp.task('watch:ios', ['build:ios'], function () {
  gulp.watch([paths.styles, paths.scripts, paths.html], ['build:ios']);
});

gulp.task('default', ['build', 'watch']);
