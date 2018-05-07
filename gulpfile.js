'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var prefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify-es').default;
var sass = require('gulp-sass');
var rigger = require('gulp-rigger');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var rimraf = require('rimraf');
var rename = require("gulp-rename");
var notify = require("gulp-notify");
var concat = require('gulp-concat');
var csso = require('gulp-csso');
var connect = require('gulp-connect');
var plumber = require('gulp-plumber');
var beep = require('beepbeep');
var ext_replace = require('gulp-ext-replace');
var run = require('gulp-run');
var version = require('gulp-version-number');
var svgSprite = require("gulp-svg-sprites");
var spritesmith = require('gulp.spritesmith');
var argv = require('yargs').argv;
var gulpif = require('gulp-if');
var useref = require('gulp-useref');
var gutil = require('gulp-util');
var composer = require("gulp-composer");
var spritesmith = require('gulp.spritesmith');

var path = {
    src: {
        html: 'src/*.html',
        scss: 'src/scss/index.scss',
        img: ['src/img/**/*.*','!src/img/sprite/*.*'],
        font: ['src/font/**/*.*', 'node_modules/flowplayer/dist/skin/icons/*.*'],
        favicon: 'src/favicon.ico',
        php: ['src/**/*.php', '!src/*.php'],
        htaccess: 'src/.htaccess',
        js_plugins: 'src/js_plugins/**/*.*'
    },
    build: {
        base: 'build/',
        css: 'src/css/',
        jsVendor: 'src/js/',
        img: 'build/img/',
        font: 'build/font/',
        js_plugins: 'build/js_plugins/'
    },
    watch: {
        html: 'src/**/*.html',
        favicon: 'src/favicon.ico',
        php: 'src/**/*.php',
        htaccess: 'src/.htaccess',
        js: 'src/js/**/*.js',
        scss: 'src/scss/**/*.scss',
        jsVendor: 'src/js/vendors/**/*.js',
        img: 'src/img/**/*.*',
        font: 'src/font/**/*.*',
        js_plugins: 'src/js_plugins/**/*.*'
    }
};

gulp.task('default', ['build','connect', 'watch']);

var onError = function(err) {
    notify.onError({
      title:    "Gulp error in " + err.plugin,
      message:  err.toString()
    })(err);
    beep(1);
    this.emit('end');
};

gulp.task('fontello', function() {
  return run('fontello-cli --config config.json --css src/css --font src/font install').exec();
})

gulp.task('js.vendor', function() {
    return gulp.src([
               'src/js/vendor/bootstrap-custom.js',
        ])
        .pipe(plumber({ errorHandler: onError }))
        .pipe(rigger())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(path.build.jsVendor));
});


gulp.task('scss', function() {
    return gulp.src(path.src.scss)
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sass({ compass: true, style: 'expanded', sourcemap: true }))
        .pipe(prefixer({
            browsers: //['> 1%', 'last 3 versions', 'Firefox ESR', 'Opera >8','ie >8']
            [
               "Android 2.3",
               "Android >= 4",
               "Chrome >= 20",
               "Firefox >= 24",
               "Explorer >= 8",
               "iOS >= 6",
               "Opera >= 12",
               "Safari >= 6"
            ]
        }))
        .pipe(rename('styles.css'))
        .pipe(gulp.dest(path.build.css));
});

gulp.task('html', ['scss'], function(){
    return gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(version({
         'replaces' : [/#{VERSION_REPlACE}#/g, '%MD5%']
         }))
        .pipe(useref())
        .pipe(gulpif(argv.production, gulpif('*.js', uglify())))
        .pipe(gulpif(argv.production, gulpif('*.css', csso())))
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(gulp.dest(path.build.base))
        .pipe(connect.reload());
});

gulp.task('favicon', function () {
    gulp.src(path.src.favicon)
        .pipe(gulp.dest(path.build.base))
        .pipe(connect.reload());
});

gulp.task('php', function () {
    gulp.src(path.src.php)
        .pipe(gulp.dest(path.build.base))
        .pipe(connect.reload());
});

gulp.task('htaccess', function () {
    gulp.src(path.src.htaccess)
        .pipe(gulp.dest(path.build.base))
        .pipe(connect.reload());
});

gulp.task('js.plugins', function () {
    gulp.src(path.src.js_plugins)
        .pipe(gulp.dest(path.build.js_plugins))
        .pipe(connect.reload());
});

gulp.task('image', function () {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(connect.reload());
});

gulp.task('font', function() {
    gulp.src(path.src.font)
        .pipe(gulp.dest(path.build.font))
        .pipe(connect.reload());
});

gulp.task('build', [
    'font',
    'favicon',
    'php',
    'htaccess',
    'html',
    'image',
    'js.plugins'
]);

gulp.task('watch', function(){


    watch([path.watch.html], function(event, cb) {
        gulp.start('html');
    });

    watch([path.watch.favicon], function(event, cb) {
        gulp.start('favicon');
    });

    watch([path.watch.php], function(event, cb) {
        gulp.start('php');
    });

    watch([path.watch.js], function(event, cb) {
        gulp.start('html');
    });

    watch([path.watch.scss], function(event, cb) {
        gulp.start('html');
    });

    watch([path.watch.jsVendor], function(event, cb) {
        gulp.start('html');
    });

    watch([path.watch.img], function(event, cb) {
        gulp.start('image');
    });

    watch([path.watch.font], function(event, cb) {
        gulp.start('font');
    });

    watch([path.watch.htaccess], function(event, cb) {
        gulp.start('htaccess');
    });

    watch([path.watch.js_plugins], function(event, cb) {
        gulp.start('js.plugins');
    });
});


gulp.task('connect', function() {
  connect.server({
    port:8888,
    root: 'app',
    livereload: true
  });
});

gulp.task('clear', function (cb) {
    rimraf(path.build.base, cb);
});

gulp.task("composer", function () {
    composer({
        "working-dir": "../"
    });
});

gulp.task('sprite', function() {
    var spriteData = 
        gulp.src('./src/img/sprite/*.*')
            .pipe(spritesmith({
                imgPath: '../img/sprite.png',
                imgName: 'sprite.png',
                cssName: '_sprite.scss',
                algorithm: 'diagonal',
                cssVarMap: function(sprite) {
                    //sprite.name = sprite.name
                    sprite.name = 'sprite-' + sprite.name
                }
            }));

    spriteData.img.pipe(gulp.dest('./src/img/'));
    spriteData.css.pipe(gulp.dest('./src/scss/utils/'));
});