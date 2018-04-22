const gulp = require('gulp');

//scss
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const csso = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');

//js
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

//вспомогательные плагины
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const del = require('del');

//сжатие картинок
const imagemin = require('gulp-imagemin');

//пути app - разработка, build - готовая сборка

const paths = {
    app: './app/',
    build: './dist/'
};

//html

gulp.task('htmls', function () {
    return gulp.src(paths.app + '**/*.html')
        .pipe(plumber())
        .pipe(gulp.dest(paths.build));
});

//scss

gulp.task('styles', function () {
    return gulp.src(paths.app + 'scss/main.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(autoprefixer(['last 10 versions'], { cascade: false }))
        .pipe(csso())
        .pipe(rename({ suffix: ".min"}))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(paths.build + 'css/'));
});

//js

gulp.task('js', function () {
    return gulp.src([paths.app + 'js/**/*.js', '!./app/js/libs/**/*'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(concat('script.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.build + 'js/'))
});

//js libs

gulp.task('libsJs', function () {
    return gulp.src(paths.app + 'js/libs/*')
        .pipe(gulp.dest(paths.build + 'js/libs/'));
});

gulp.task('images', function () {
    return gulp.src(paths.app + 'images/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: false},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest(paths.build + 'images/'))
});

gulp.task('fonts', function () {
    return gulp.src(paths.app + 'fonts/*.*')
        .pipe(gulp.dest(paths.build + 'fonts/'))
});

//browser-sync

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: paths.build
        }
    });
    browserSync.watch(paths.build + '**/*.*').on('change', browserSync.reload);
});

//очистка

gulp.task('clean', function () {
    return del('dist/')
});

//watch html, scss, js

gulp.task('watch', function () {
    gulp.watch( paths.app + '**/*.html', gulp.series('htmls'));
    gulp.watch( paths.app + 'scss/**/*.scss', gulp.series('styles'));
    gulp.watch( paths.app + 'js/**/*.js', gulp.series('js'));
});

//gulp

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('htmls', 'styles', 'js', 'libsJs', 'images', 'fonts'),
    gulp.parallel('watch', 'serve')
));