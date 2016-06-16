var
    gulp = require('gulp'),
    pl = require('gulp-load-plugins')({
        lazy: false
    }),
    wiredep = require('wiredep').stream,
    browserSync = require('browser-sync'),
    webpack = require('webpack'),
    webpackConfig = require("./webpack.config.js"),
    compiler = webpack(webpackConfig),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware');

//Browser Sync
gulp.task('server', function () {
    browserSync({
        server: {
            baseDir: 'build',

            middleware: [
                webpackDevMiddleware(compiler, {
                    noInfo: true,
                    publicPath: webpackConfig.output.publicPath
                }),
                webpackHotMiddleware(compiler)
            ]
        },
        files: [
            'build/css/*.css',
            'build/*.html'
        ]
    });
});

//Add bower files
gulp.task('bower', function(){
    gulp.src('src/index.html')
        .pipe(pl.plumber())
        .pipe(wiredep())
        .pipe(pl.useref())
        .pipe(gulp.dest('build/'));
});

//Stylus
gulp.task('stylus', function () {
    gulp.src('src/styles/styles.styl')
        .pipe(pl.plumber())
        .pipe(pl.sourcemaps.init())
        .pipe(pl.stylus())
        .pipe(pl.sourcemaps.write())
        .pipe(gulp.dest('build/css/'));
});

//Watch
gulp.task('watch', function(){
    gulp.watch('src/styles/**/*.styl', ['stylus']);
});

//Default
gulp.task('default', ['stylus', 'bower', 'server', 'watch']);