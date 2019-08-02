const { src, dest, parallel, series, watch } = require('gulp');  // , series
const browsersync = require('browser-sync').create();
const rename = require('gulp-rename');

const markdown = require('gulp-markdown');
const pug = require('gulp-pug');

//const less = require('gulp-less');
const sass = require('gulp-sass');
//const scss = require('gulp-scss');
const minifyCSS = require('gulp-csso');

const concat = require('gulp-concat');
const uglify = require("gulp-uglify-es").default;

const autoprefixer = require('gulp-autoprefixer');

const imagemin = require('gulp-imagemin');
const imgCompress  = require('imagemin-jpeg-recompress');
//const imagemin = require('imagemin');
//const imageminWebp = require('imagemin-webp');
//const jekyll = require('jekyll');


// BrowserSync
function browserSync(done) {
    browsersync.init({
        proxy: 'loc.cakenew:80',
        baseDir: "./",
        open:true,
        notify:false
    });
    done();
}

// BrowserSync Reload
function browserSyncReload(done) {
    browsersync.reload();
    done();
}

// Clean assets
function clean() {
  return del(["./src/"]);
}

function defaultTask(cb) {
    // place code for your default task here
    cb();
}

function html() {
  return src('src/templates/*.pug')
    .pipe(pug())
    .pipe(dest('build/html'))
}
function mdown() {
    return src('src/cnt/md/*.md')
        .pipe(markdown())
        .pipe(dest('build/cnt/html'))
}


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

function jsmerge() {
    return src('src/js/*.js', { sourcemaps: true })
        .pipe(concat('app.merge.js'))
        .pipe(dest('build/js/merge', { sourcemaps: true }))
}
function jsmin(){
    return src('build/js/merge/*.merge.js', { sourcemaps: true })
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(dest('build/js', { sourcemaps: true }))
}
/*function js() {
    series(jsmerge, jsmin)
}*/

/*function js() {
  return src('src/js/*.js', { sourcemaps: true })
        .pipe(concat('app.merge.js'))
        .pipe(dest('build/js', { sourcemaps: true }))
}
*/

// Optimize images var1 сжимает лучше, от второго варианта отличаются настройками и модулем обработки jpeg
function imgmin(){
    return src('src/cnt/img/**/*')
        .pipe(imagemin([
            imgCompress({
              loops: 4,
              min: 70,
              max: 80,
              quality: 'high'
            }),
            imagemin.gifsicle(),
            imagemin.optipng(),
            imagemin.svgo()
        ]))
        .pipe(dest('build/cnt/img'))
}

// Optimize images var2
function imgmin2() {       //v
    return src('src/cnt/img/**/*')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(dest('build/cnt/img'))
}


/*
imagemin(['cnt/img/*.{jpg,png}'], 'build/cnt/img', {
	use: [
		imageminWebp({quality: 50})
	]
}).then(() => {
	console.log('Images optimized');
});
*/

/*
// Таск для оптимизации изображений
gulp.task('img:prod', function () {
	return gulp.src(path.src.img) //Выберем наши картинки
		.pipe(debug({title: 'building img:', showFiles: true}))
		.pipe(plumber(plumberOptions))
		.pipe(gulp.dest(path.prod.img)) //Копируем изображения заранее, imagemin может пропустить парочку )
		.pipe(imagemin([
			imagemin.gifsicle({interlaced: true}),
			imageminJpegRecompress({
				progressive: true,
				max: 80,
				min: 70
			}),
			imageminPngquant({quality: '80'}),
			imagemin.svgo({plugins: [{removeViewBox: true}]})
		]))
		.pipe(gulp.dest(path.prod.img)); //И бросим в prod отпимизированные изображения
});
*/

// Watch files
function watchFiles() {
    watch("src/css/*.sass", css);
    watch("src/js/**/*", series(jsmerge, jsmin));  //series(scriptsLint, scripts)
    watch("src/cnt/md/**/*.md", mdown);//series(scriptsLint, scripts)
    watch(
        [
        "build/css/*.css",
        "src/css/*.sass",
        "src/cnt/md/*.md",
        "src/js/**/*",
        "src/cnt/img/**/*"
//        "./_includes/**/*",
//        "./_layouts/**/*",
//        "./_pages/**/*",
//        "./_posts/**/*",
//        "./_projects/**/*"
        ],
        series(/*jekyll,*/browserSyncReload)
    );
    watch("src/cnt/img/**/*", imgmin);
    //watch("src/cnt/img/**/*", imgmin2);
}

//exports.js = js;
exports.css = css;
exports.html = parallel(html, mdown);
exports.all = parallel(html, css/*, js*/);
exports.default = defaultTask;
exports.watch = parallel(watchFiles, browserSync);