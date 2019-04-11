const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');

// Compile scss into css
function style() {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
}

// Minify CSS

gulp.task('minify-css', () => {
    return gulp.src('css/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist'));
});

// Minify JS

gulp.task('compress', function () {
    return  gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// Minify HTML

gulp.task('htmlmin', () => {
    return gulp.src('./*.html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('dist'));
  });


// Watch files for changes

function watch() {
    browserSync.init({
        server: {
            baseiDir: './'
        }
    });
    gulp.watch('./scss/**/*.scss', style);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);;
}

exports.style = style;
exports.watch = watch;
