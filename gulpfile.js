let gulp = require('gulp');
let imagemin = require('gulp-imagemin');
let uglify = require('gulp-uglify');
let sass = require('gulp-sass');
let concat = require('gulp-concat');
let browserSync = require('browser-sync').create();

/**
 * Top Level Functions
 * gulp.task - Define tasks
 * gulp.src - Points to files to use
 * gulp.dest - Points to folder to use
 * gulp.watch - Watch files and folders for changes
 */

// Logs message
gulp.task('message', () => {
    return console.log('Gulp task is running...')
});

// Copy HTML files
gulp.task('copyHTML', () =>
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
);

// Optimize images
gulp.task('imageMin', () => {
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
});

// Minify JS
gulp.task('minify', () => {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

// Compile sass
gulp.task('sass', () => {
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Scripts
gulp.task('scripts', () => {
    gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

// Browser Sync
gulp.task('browserSync', () => {
    browserSync.init({
        server: {
            baseDir: './dist'
        },
    })
});

// Watch Task
gulp.task('watch', ['browserSync', 'sass'], () => {
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/images/*', ['imageMin']);
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/*.html', ['copyHTML']);

    // Reloads the browser whenever HTML or JS files change
    gulp.watch('src/*.html', browserSync.reload); 
    gulp.watch('src/js/**/*.js', browserSync.reload);
});

// Default Task
gulp.task('default', ['message', 'copyHTML', 'imageMin', 'sass', 'scripts'], () => {
    return console.log('Default Gulp task is running...');
});