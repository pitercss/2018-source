const autoprefixer = require('autoprefixer');
const csso = require('gulp-csso');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const postcss = require('gulp-postcss');
const rsync = require('gulp-rsync');
const sync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');

// HTML

gulp.task('html', () => {
    return gulp.src('src/*.html')
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dest'))
        .pipe(sync.stream({
            once: true
        }));
});

// CSS

gulp.task('css', () => {
    return gulp.src('src/css/**/*.css')
        .pipe(plumber())
        .pipe(concat('style.css'))
        .pipe(postcss([autoprefixer]))
        .pipe(csso())
        .pipe(gulp.dest('dest/css'))
        .pipe(sync.stream({
            once: true
        }));
});

// Copy

gulp.task('copy', () => {
    return gulp.src([
            'src/*',
            'src/fonts/*',
            '!src/css/*',
            '!src/*.html'
        ], {
            base: 'src'
        })
        .pipe(gulp.dest('dest'))
        .pipe(sync.stream({
            once: true
        }));
});

// Server

gulp.task('server', () => {
    sync.init({
        ui: false,
        notify: false,
        server: {
            baseDir: 'dest'
        }
    });
});

// Watch

gulp.task('watch:html', () => {
    return gulp.watch('src/*.html', gulp.series('html'));
});

gulp.task('watch:css', () => {
    return gulp.watch('src/css/*.css', gulp.series('css'));
});

gulp.task('watch:copy', () => {
    return gulp.watch([
        'src/*',
        'src/fonts/*',
        '!src/css/*',
        '!src/*.html'
    ], gulp.series('copy'));
});

gulp.task('watch', gulp.parallel(
    'watch:html',
    'watch:css',
    'watch:copy'
));

// Build

gulp.task('build', gulp.parallel(
    'html',
    'css',
    'copy'
));

// Deploy

gulp.task('deploy', () => {
	return gulp.src('dest/**')
		.pipe(rsync({
			root: 'dest',
			hostname: 'pitercss.com',
			destination: '/var/www/pitercss.com/html/',
			recursive: true,
			clean: true,
			incremental: true,
			exclude: '.DS_Store'
		}));
});

// Default

gulp.task('default', gulp.series(
    'build',
    gulp.parallel(
        'watch',
        'server'
    )
));
