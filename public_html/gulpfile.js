/*jshint esversion: 6 */
const localDomainUrl = 'loc.cakenew:80';
const { src, dest, parallel, series, watch, task} = require('gulp');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const concat = require('gulp-concat');
const rename = require('gulp-rename');
// const php = require('gulp-connect-php');
const del = require('del');
const markdown = require('gulp-markdown');  // vulnerable
// const pug = require('gulp-pug');  //not used
// const twig = require('gulp-twig');  //fucnction twigto not work
const sass = require('gulp-sass');
//const less = require('gulp-less');
//const scss = require('gulp-scss');
const browserslist = require('browserslist');  //maybe not need init, but need for gulp-autoprefixer
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');  // minify css
const uglify = require("gulp-uglify");  // es5
const uglify6 = require("gulp-uglify-es").default;  // es6
const imagemin = require('gulp-imagemin');
const imgCompress  = require('imagemin-jpeg-recompress');
const webp = require('imagemin-webp');
const changed = require('gulp-changed');  // No more wasting precious time on processing unchanged files.
const lineec = require('gulp-line-ending-corrector');  // одинаковые окончания строк
const sourcemaps = require('gulp-sourcemaps');  // Используется, но вроде можно штатными средствами gulp4.
// const extReplace = require('gulp-ext-replace');
// const jekyll = require('jekyll');
// const minifyCSS = require('gulp-csso');

// Вторжение
const themename = 'devwp';  // !!!
const root = './' + themename + '/';  // ../
const scss = root + 'src/sass/';
const scssDEST = root + 'src/css/';
const js = root + 'src/js/';
const jsdist = root + 'dest/js';
const phpWatchFiles = root + '**/*.php';
const styleWatchFiles = [scss + '**/*.scss', scss + '**/*.sass'];  // [root + '**/*.scss', root + '**/*.sass']
const jsSRC = [
    /*js + '', js + '', js + '', js + '', js + '', js + '', js + '',*/
    js + '**/*.js'
];
const cssSRC = [
    './node_modules/normalize.css/normalize.css',
    //root + 'src/css/bootstrap.css',
    root + 'src/css/all.css',
    root + 'src/css/prism.css',
    root + 'src/css/style.css'
];
const cssDEST = root + 'dest/css';
const imgSRC = root + 'src/images/**/*';  // ['src/cnt/img/**/*.jpg', 'src/cnt/img/**/*.png', 'src/cnt/img/**/*.gif']
const imgDEST = root + 'dest/images';
const articleSRC = root + 'src/articles/**/*.md';
const articleDEST = root + 'dest/articles';
// const templateSRC = root + 'src/templates/**/*.pug';
// const templateDEST = root + 'dest/templates';
// const staticSRC = root + 'src/static/**/*.pug';
// const staticDEST = root + 'dest/static';
// const twigSRC = 'src/twig/**/*.twig';
// const twigDEST = 'dest/twig';

function css() {
    return src([scss + '**/*.sass', scss + '**/*.style.scss'])
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass({
        outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(lineec())
    .pipe(dest(scssDEST)); // root
}

function concatCSS() {
    return src(cssSRC)
    .pipe(sourcemaps.init({loadMaps: true, largeFile: true}))
    .pipe(concat('style.css'))
    .pipe(dest(cssDEST))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(cleanCSS({
        level: 2
    }))
    .pipe(sourcemaps.write('./maps/'))
    .pipe(lineec())
    .pipe(dest(cssDEST));
}

function javascript() {
    return src(jsSRC)
    .pipe(concat(themename + '.js'))
    .pipe(dest(jsdist))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(uglify({
        toplevel: true
    }))
    .pipe(lineec())
    .pipe(dest(jsdist));
}

function imgmin() {
    return src(imgSRC)
    .pipe(changed(imgDEST))
    .pipe(imagemin([
        imgCompress({
          loops: 4,
          min: 70,
          max: 80,
          quality: 'high'
        }),
        imagemin.gifsicle({interlaced: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(dest(imgDEST))
    .pipe(imagemin([
        webp({
        quality: 75
        })
    ]))
    .pipe(rename({ extname: '.webp' }))
    .pipe(dest(imgDEST));
}

/*
function pugtohtml() {
    return src(staticSRC)
    .pipe(pug())
    .pipe(dest(staticDEST));
}
*/
/*
function pugtophp() {
    return src(templateSRC)
    .pipe(pug({pretty: true}))
    .pipe(rename({extname: '.php'}))
    .pipe(dest(templateDEST));
}
*/
/*
function twigtophp() {
    return src(twigSRC)
    .pipe(twig({
        data: {
            title: 'Gulp and Twig',
            benefits: [
                'Fast',
                'Flexible',
                'Secure'
            ]
        }
    }))
    .pipe(dest(twigDEST));
}
*/

function mdown() {
    return src(articleSRC)
    .pipe(markdown())
    .pipe(dest(articleDEST));
}

/*
function serverphp(){
    php.server({ base: 'build', port: 8010, keepalive: true});
}
*/

function watcher() {
    /*  // server html+css+userjs
    browserSync.init({
        open: 'external',
        proxy: 'http://localhost/dev',
        port: 8080,
    });
    */
   /*
    //Server php notested
    serverphp;
    browserSync.init({
        proxy: '127.0.0.1:8010',
        port: 8080,
        open: true,
        notify: false
    });
    */
    // server php OpenServer
    browserSync.init({
        proxy: localDomainUrl,
        baseDir: "./",
        open:true,
        notify:false //,
        //tunnel: true
    });

    watch(styleWatchFiles, series([css, concatCSS]));
    watch(jsSRC, javascript);
    watch(imgSRC, imgmin);
    watch([phpWatchFiles, jsdist + 'devwp.js', cssDEST + 'style.min.css']).on('change', reload);
    watch(articleSRC, mdown);
    // watch(templateSRC, pugtophp);
    // watch(staticSRC, pugtohtml);
    // watch(twigSRC, twigtophp);
}

function clean(cb) {  // очистка минифицированной сборки
    del.sync(['devwp/dest/*']);
    cb();
}

exports.clean = clean;
exports.imgmin = imgmin;
exports.javascript = javascript;
exports.mdown = mdown;
exports.css = css;
exports.concatCSS = concatCSS;
// exports.pugtophp = pugtophp;
// exports.pugtohtml = pugtohtml;
// exports.twigtophp = twigtophp;
// exports.serverphp = serverphp;
exports.watcher = watcher;

exports.build = build = series(
    clean,
    parallel(
        imgmin,
        javascript,
        mdown,
        series(
            css,
            concatCSS
        )
    ));

task('default', build);
task('dev', series(build, watcher));



//.pipe(less())
/*  // OFF plumber? debug?
		.pipe(debug({title: 'building img:', showFiles: true}))
		.pipe(plumber(plumberOptions))
*/