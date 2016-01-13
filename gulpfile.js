var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');


var paths = {
    cssVendor:['./resources/css/vendor/*.css'],
    jsVendor:['./resources/js/vendor/jquery*.js'],
    watch:[]
};

gulp.task('default', function() {
    console.log('that\'s a default task');
});

gulp.task('compress', function() {
    gulp.src(paths.jsVendor)
    .pipe(uglify())
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest('public/js/vendor/'));

    gulp.src(paths.cssVendor)
    .pipe(cssmin())
    .pipe(concat('vendor.min.css'))
    .pipe(gulp.dest('public/css/vendor/'));
});
