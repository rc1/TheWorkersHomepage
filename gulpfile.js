// Modules
// =======
var path = require( 'path' );
var gulp = require( 'gulp' );
var less = require( 'gulp-less' );
var sourcemaps = require( 'gulp-sourcemaps' );
var autoprefixer = require( 'gulp-autoprefixer' );
var uglify = require( 'gulp-uglify' );
var concat = require( 'gulp-concat' );
var plumber = require( 'gulp-plumber' );
var livereload = require( 'gulp-livereload' );
var babel = require( 'gulp-babel' );
var jade = require( 'gulp-jade' );
var del = require( 'del' );
var serve = require( 'gulp-serve' );

// Basic
// =====
gulp.task( 'default', [ 'clean', 'jade', 'less', 'js', 'copy' ] );

gulp.task( 'watch', function () {
    livereload.listen();
    gulp.watch( './less/**/*.less', [ 'less' ] );
    gulp.watch( './jade/**/*.jade', [ 'jade' ] );
    gulp.watch( './js/**/*.js', [ 'js' ] );
    gulp.watch( './copy/**/*.js', [ 'copy' ] );
});

gulp.task( 'serve', serve( './build' ) );

// Tasks
// =====
gulp.task( 'clean', function () {
    return del( 'build/**/*', '!build/.gitkeep' );
});


gulp.task( 'jade', function () {
    return gulp.src( './jade/*.jade' )
        .pipe( jade( { pretty: false } ) )
        .pipe( gulp.dest( './build' ) )
        .pipe( livereload() );
});

gulp.task( 'less', function () {
    gulp.src( './less/*.less' )
        .pipe( plumber() )
        .pipe( sourcemaps.init() )
        .pipe( less() )
        .pipe( autoprefixer( { browsers: [ 'last 2 versions', 'Explorer >= 9' ] }) )
        .pipe( sourcemaps.write() )
        .pipe( gulp.dest( './build' ) )
        .pipe( livereload() );
});

gulp.task( 'js', function () {
    gulp
        .src( [ './js/*.js' ])
        .pipe( plumber() )
        .pipe( sourcemaps.init() )
        .pipe( babel() )
        .pipe( uglify() )
        .pipe( sourcemaps.write() )
        .pipe( gulp.dest( './build' ) )
        .pipe( livereload() );
});

gulp.task( 'copy', function () {
    gulp.src( [ './img/**' ] )
        .pipe(gulp.dest( './build' ));
});
