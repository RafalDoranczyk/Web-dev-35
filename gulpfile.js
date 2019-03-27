const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const useref = require('gulp-useref');
const gulpIf = require('gulp-if');
const cssnano = require('gulp-cssnano');
const gutil = require('gulp-util');
const concat = require('gulp-babili');
const del = require('del');
const ghPages = require('gulp-gh-pages');

function deploy() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages({
      remoteUrl: "https://github.com/RafalDoranczyk/webDev35.git",
      branch: "master"
    }));
}


//compile scss into css

function style() {
  //1. where is my scss file
  return gulp.src('./docs/scss/**/*.scss')
    //2. pass that file through the sass compliler
    .pipe(sass().on('error', sass.logError))
    //3. where do i save the compiled CSS?
    .pipe(gulp.dest('./docs/css'))
    //4. stream changes to all browers
    .pipe(browserSync.stream());
};

//watching
function watch() {
  browserSync.init({
    server: {
      baseDir: './docs'
    }
  });
  gulp.watch('./docs/scss/**/*.scss', style);
  gulp.watch('./docs/*.html').on('change', browserSync.reload);
  gulp.watch('./docs/js/**/*.js').on('change', browserSync.reload);
};

function images() {
  return gulp.src('./docs/images/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
};

function fonts() {
  return gulp.src('./docs/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
};

function usereff() {
  return gulp.src('./docs/*.html')
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
};

function scripts() {
  return gulp.src(['./docs/js/*.js'])
    .pipe(concat('main.min.js'))
    .pipe(babili({
      mangle: {
        keepClassNames: true
      }
    }))
    .on('error', function (err) {
      gutil.log(gutil.colors.red('[ERROR]'), err.toString())
    })
    .pipe(gulp.dest('dist/js'))
}

function clean() {
  return del.sync('dist')
}


exports.deploy = deploy;
exports.watch = watch;
exports.style = style;
exports.default = watch, style;