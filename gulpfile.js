/*jslint browser: true, eqeq: true*/
var gulp = require('gulp'); // gulp task runner
var jshint = require('gulp-jshint'); // javascript error logging
var imagemin = require('gulp-imagemin'); // image optimizer
var uglify = require('gulp-uglify'); // javascript minification
var csslint = require('gulp-csslint'); // javascript minification
var less = require('gulp-less'); // stylesheet compiler
var browserSync = require('browser-sync').create(); // Server and browser syncing

// Task to check errors in js files
gulp.task('lint', function () {
    'use strict';
	return gulp.src('src/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// Task to compile all less
gulp.task('less', function () {
    'use strict';
	return gulp.src('src/less/*.less')
		.pipe(less())
		.pipe(gulp.dest('public/css/'));
});

// Task to minify all js files
gulp.task('scripts', function () {
    'use strict';
	return gulp.src('src/scripts/**/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('public/scripts/'));
});

// Task to copy over all HTML files from src to public
gulp.task('copy', function () {
    'use strict';
	return gulp.src('src/**/*.html')
		.pipe(gulp.dest('public'));
});

// Task to copy fonts
gulp.task('fontawesome', function () {
    'use strict';
	return gulp.src('bower_components/font-awesome/fonts/**/*.*')
		.pipe(gulp.dest('public/fonts/'));
});

// Images
gulp.task('images', function () {
    'use strict';
    return gulp.src('src/images/**/*')
        .pipe(imagemin())
        //.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('public/images'))
        //.pipe(notify({ message: 'Images task complete' }));
});

// CSS Lint
gulp.task('csslint', function() {
    gulp.src('public/css/*.css')
        .pipe(csslint())
        .pipe(csslint.reporter());
});

// Task to build files
//gulp.task('build', ['lint', 'sass', 'scripts', 'copy', 'images', 'fontawesome'],  function() {
gulp.task('build', ['lint', 'less', 'scripts', 'copy', 'fontawesome', 'images'],  function() {
	console.log('Build complete');
});

// Task for Browser sync
gulp.task('browser-sync', ['build'], function() {
	browserSync.init({
		server: {
			baseDir: "public",
			// The key is the URL to match
			// The value is which folder to serve (relative to your current working directory)
			routes: {
				"/bower_components": "bower_components"
			}
	 },
	browser: "chrome" //  Can be any browser
	});
});

// Watch task
gulp.task('default', ['browser-sync'], function(){
	gulp.watch("src/**/*.*", "src/less/**/*.less", ["build"]);
	gulp.watch("public/**/*.*").on('change', browserSync.reload);
});