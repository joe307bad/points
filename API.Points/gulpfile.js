var gulp = require('gulp');
var install = require('gulp-install');
var zip = require('gulp-zip');
var rename = require('gulp-rename');

const PROD_DEST = './dist';

gulp.task('default', function () {
    return gulp.src(['./package.json'])
        .pipe(gulp.dest(PROD_DEST));
});

gulp.task('copyEnvProd', function () {
    return gulp.src('./.env.prod')
        .pipe(rename('.env'))
        .pipe(gulp.dest(PROD_DEST));
});

gulp.task('zip', () =>
    gulp.src(PROD_DEST + '/**/**')
        .pipe(zip('dist.zip'))
        .pipe(gulp.dest('./'))
);