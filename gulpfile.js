var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
//var cssmin = require('gulp-cssmin');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');
var livereload = require('gulp-livereload');
var rev = require('gulp-rev');

var notify = require('gulp-notify');


var paths = {
    cssVendor:['./resources/css/vendor/*.css'],
    jsVendor:['./resources/js/vendor/*.js'],
    css:['./resources/css/*.css', '!./resources/css/vendor/**/*.css'],
    js:['./resources/js/*.js', '!.resources/js/vendor/**/*.js'],
    images:['resources/images/**/*.*'],
    watch:['./resources/css/**/*.css', './resources/js/**/*.js','resources/images/**/*.*']
};


//release
gulp.task('default', ['clean'], function() {
    gulp.start('compress');
});

//dev
gulp.task('watch', function() {

    livereload.listen();

    gulp.watch(paths.watch, function(event) {
        console.log('Event type: ' + event.type); // added, changed, or deleted
        console.log('Event path: ' + event.path); // The path of the modified file
        gulp.start('dev');
    })
    .on('change', livereload.changed);
});

gulp.task('dev', ['clean'], function() {
    gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public/assets/js/'));

    gulp.src(paths.css)
    .pipe(autoprefixer('last 2 version'))
    .pipe(rename('app.css'))
    .pipe(gulp.dest('public/assets/css/'));

    gulp.src(paths.images)
    .pipe(cache(imagemin({optimizationLevel : 5})))
    .pipe(gulp.dest('public/assets/images/'));
    //.pipe(notify('test'));
});

gulp.task('compress', function() {
    gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(rev())
    .pipe(gulp.dest('public/assets/js/'));

    gulp.src(paths.css)
    .pipe(autoprefixer('last 2 version'))
    .pipe(rename('app.min.css'))
    .pipe(cssnano())
    .pipe(rev())
    .pipe(gulp.dest('public/assets/css/'));

    gulp.src(paths.images)
    .pipe(cache(imagemin({optimizationLevel : 5})))
    .pipe(gulp.dest('public/assets/images/'));
});

gulp.task('compressVendor', function() {
    gulp.src(paths.jsVendor)
    .pipe(uglify())
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest('public/assets/js/vendor/'));

    gulp.src(paths.cssVendor)
    .pipe(cssnano())
    .pipe(concat('vendor.min.css'))
    .pipe(gulp.dest('public/assets/css/vendor/'));
});

gulp.task('clean', function() {
    return del(['public/asset/**/*.*', '!public/**/app-*.*']);
});
