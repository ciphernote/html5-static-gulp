// package import
var gulp = require('gulp');
var browser = require("browser-sync");
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var jade = require('gulp-jade');
var uglify = require('gulp-uglify');

/*  Config for your environment */

gulp.task("server", function() {
    browser({
        server: {
            baseDir: "build/static"
        }
    });
});
gulp.task('sass', function() {
	gulp.src('assets/**/*scss')
	.pipe(sass())
	.pipe(autoprefixer())
	.pipe(gulp.dest('./build/static/css'))
	.pipe(browser.reload({stream:true}))
});

gulp.task('jade', function () {
	gulp.src('assets/**/*.jade')
	.pipe(jade({
		pretty: true
	}))
	.pipe(gulp.dest('./build/static/'))
	.pipe(browser.reload({stream:true}))
});

gulp.task('js', function() {
	gulp.src(['assets/js/**/*.js','!assets/js/**/*.js'])
	.pipe(uglify())
	.pipe(gulp.dest('./build/static/js'))
	.pipe(browser.reload({stream:true}))
});

gulp.task("default",['server','jade','sass','js'], function() {
	gulp.watch(["assets/js/**/*.js","!!assets/js/**/*.js'"],["js"]);
	gulp.watch("sass/**/*.scss",["sass"]);
	gulp.watch("assets/**/*.jade",["jade"]);
});