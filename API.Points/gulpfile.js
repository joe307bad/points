var gulp = require('gulp');
var install = require('gulp-install');
var zip = require('gulp-zip');

const PROD_DEST = './dist';

gulp.task('default', function () {
    return gulp.src(['./package.json'])
        .pipe(gulp.dest(PROD_DEST))
        .pipe(install({
            args: ['--only production']
        }));
});

gulp.task('zip', () =>
    gulp.src(PROD_DEST + '/*/**')
        .pipe(zip('dist.zip'))
        .pipe(gulp.dest('./'))
);