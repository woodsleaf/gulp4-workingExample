const localDomainUrl = 'loc.cakenew:80';
const { src, dest, parallel, series, watch, task} = require('gulp');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload; /* now not used */
const rename = require('gulp-rename');

//const markdown = require('gulp-markdown');  // vulnerable
const pug = require('gulp-pug');

const sass = require('gulp-sass');
//const less = require('gulp-less');
//const scss = require('gulp-scss');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const minifyCSS = require('gulp-csso');

const concat = require('gulp-concat');
const uglify = require("gulp-uglify");
const uglify6 = require("gulp-uglify-es").default;

const imagemin = require('gulp-imagemin');
const imgCompress  = require('imagemin-jpeg-recompress');
const webp = require('imagemin-webp');
const extReplace = require('gulp-ext-replace');
const changed = require('gulp-changed');
const lineec = require('gulp-line-ending-corrector');
//const jekyll = require('jekyll');
const sourcemaps = require('gulp-sourcemaps');  // Кажется не требуется

// Вторжение
const themename = 'devwp';  // !!!
const root = './' + themename + '/';  // ../
const scss = root + 'sass/';

const js = root + 'src/js/';
const jsdist = root + 'dest/js';

const phpWatchFiles = root + '**/*.php';
const styleWatchFiles = [root + '**/*.scss', root + '**/*.sass'];  // [root + '**/*.scss', root + '**/*.sass']

const jsSRC = [
    /*js + '',
    js + '',
    js + '',
    js + '',
    js + '',
    js + '',
    js + '',*/
    js + '**/*.js'
];

const cssSRC = [
    //root + 'src/css/bootstrap.css',
    root + 'src/css/all.css',
    root + 'src/css/prism.css',
    root + 'style.css'
];

const imgSRC = root + 'src/images/**/*';  // ['src/cnt/img/**/*.jpg', 'src/cnt/img/**/*.png', 'src/cnt/img/**/*.gif']
const imgDEST = root + 'dest/images';

const templateSRC = root + 'src/templates/**/*.pug';
const templateDEST = root + 'dest/templates';
const articleSRC = root + 'src/articles/**/*.md';
const articleDEST = root + 'dest/articles';

function css() {
    return src([scss + '**/*.sass', scss + '**/*.style.scss'])
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass({
        outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(sourcemaps.write())
    .pipe(lineec())
    .pipe(dest(root));
}

function concatCSS() {
    return src(cssSRC)
    .pipe(sourcemaps.init({loadMaps: true, largeFile: true}))
    .pipe(concat('style.min.css'))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('./maps/'))
    .pipe(lineec())
    .pipe(dest(scss));
}

function javascript() {
    return src(jsSRC)
    .pipe(concat(themename + '.js'))
    .pipe(dest(jsdist))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(uglify())
    .pipe(lineec())
    .pipe(dest(jsdist));
}

function imgmin() {
    return src(imgSRC)
    .pipe(changed(imgDEST))
    /*.pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5})
    ]))*/
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

function html() {
    return src(templateSRC)
    .pipe(pug())
    .pipe(dest(templateDEST));
}

function php() {
    return src(templateSRC)
    .pipe(pug({pretty: true}))
    .pipe(rename({extname: '.php'}))
    .pipe(dest(templateDEST));
}

/*
function mdown() {
    return src(articleSRC)
    .pipe(markdown())
    .pipe(dest(articleDEST));
}
*/

function watcher() {
    /*
    browserSync.init({
        open: 'external',
        proxy: 'http://localhost/dev',
        port: 8080,
    });
    */
    browserSync.init({
        proxy: localDomainUrl,
        baseDir: "./",
        open:true,
        notify:false
    });
    watch(styleWatchFiles, series([css, concatCSS]));
    watch(jsSRC, javascript);
    watch(imgSRC, imgmin);
    watch([phpWatchFiles, jsdist + 'devwp.js', scss + 'style.min.css']).on('change', reload);
    watch(templateSRC, php);  // html
    watch(articleSRC/*, mdown*/);
}

exports.css = css;
exports.concatCSS = concatCSS;
exports.javascript = javascript;
exports.watcher = watcher;
exports.imgmin = imgmin;
exports.php = php;  // exports.html = html;
// exports.mdown = mdown;

const build = parallel(watcher);
task('default', build);

/* по другому настроен прификс
function css() {
    return src('src/css/*.sass')
    //.pipe(less())
    .pipe(sass())
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(minifyCSS())
    .pipe(dest('build/css'))
}
*/

/*  // OFF plumber? debug?
		.pipe(debug({title: 'building img:', showFiles: true}))
		.pipe(plumber(plumberOptions))
*/