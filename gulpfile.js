const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');



gulp.task('sass', async function() {
    return gulp.src('./assets/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./assets/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browserSync', function() {
    browserSync({
        server: { baseDir: './'},
        notify: false
    });
})


gulp.task('watch', function() {
    gulp.watch('./assets/scss/**/*.scss', gulp.parallel('sass'));
});
gulp.task('default', gulp.parallel('sass', 'browserSync', 'watch'));