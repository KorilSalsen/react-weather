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

//Sass
gulp.task('sass', function () {
    return gulp.src('src/styles/styles.scss')
        .pipe(pl.plumber())
        .pipe(pl.sass({
            style: 'compressed',
            errLogToConsole: true,
            sourcemaps: false
        }))
        .on('error', pl.sass.logError)
        .pipe(pl.autoprefixer({
            browsers: ['last 3 versions'],
            cascade: true
        }))
        .pipe(gulp.dest('build/css/'));
});

//Default
gulp.task('default', ['sass', 'bower', 'server']);