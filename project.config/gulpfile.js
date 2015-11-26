var gulp = require('gulp');
var less = require('gulp-less');
var prefix = require('gulp-autoprefixer');
var path = require('path');

var path_config = {
	src: path.resolve(__dirname, 'static/css/res_css/*.less'),
	dist: './static/css/dist'
};

gulp.task('less', function() {
	return gulp.src(path_config.src)
		.pipe(less({
			paths: [ path.join(__dirname, 'css', 'res_css') ]
		}))
		.pipe(prefix("last 8 version", "> 1%", "ie 8", "ie 7"), {cascade:true})
		.pipe(gulp.dest(path_config.dist));
});

gulp.task('watch', function() {
	gulp.watch(path_config.src, ['less']);
});

gulp.task('default', ['watch']);