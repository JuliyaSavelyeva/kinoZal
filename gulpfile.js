// const gulp = require('gulp');
// const sass = require('gulp-sass');
// const browserSync = require('browser-sync');



// gulp.task('sass', async function() {
//     return gulp.src('./assets/scss/**/*.scss')
//         .pipe(sass())
//         .pipe(gulp.dest('./assets/css'))
//         .pipe(browserSync.reload({stream: true}))
// });

// gulp.task('browserSync', async function() {
//     browserSync({
//         server: { baseDir: './'},
//         notify: false
//     });
// })


// gulp.task('watch', async function() {
//     gulp.watch('./assets/scss/**/*.scss', gulp.parallel('sass'));
// });
// gulp.task('default', gulp.parallel('sass', 'browserSync', 'watch'));

const {task, series, parallel, src, dest, watch} = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const notify = require('gulp-notify');
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const csscomb = require('gulp-csscomb');

const plugins = [cssnano({preset: 'default'})];

const path = {
  scssStyle: './assets/scss/style.scss',
  scssFiles: './assets/scss/**/*.scss',
  scssFolder: './assets/scss',
  cssFolder: './assets/css',
  htmlFiles: './*.html'
};

function scss() {
  return src(path.scssStyle).
    pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)).
    pipe(dest(path.cssFolder)).
    pipe(browserSync.reload({stream: true}));
}

function scssMin() {
  return src(path.scssStyle).
    pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)).
    pipe(postcss(plugins)).
    pipe(rename({suffix: '.min'})).
    pipe(dest(path.cssFolder)).
    pipe(browserSync.reload({stream: true}));
}

function comb() {
  return src(path.scssFiles).
    pipe(csscomb()).
    on(
      'error',
      notify.onError(function (err) {
        return 'File: ' + err.message;
      })
    ).
    pipe(dest(path.scssFolder));
}

function syncInit() {
  browserSync({
    server: {baseDir: './'},
    notify: false
  });
}

async function sync() {
  browserSync.reload();
}

function watchFiles() {
  syncInit();
  watch(path.scssFiles, scss);
  watch(path.htmlFiles, sync);
}

task('min', scssMin);
task('scss', scss);
task('comb', comb);
task('watch', watchFiles);