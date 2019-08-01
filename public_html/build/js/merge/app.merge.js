const { src, dest, parallel, series, watch } = require('gulp');  // , series
const pug = require('gulp-pug');
//const less = require('gulp-less');
const sass = require('gulp-sass');
//const scss = require('gulp-scss');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');
const browsersync = require('browser-sync').create();
const markdown = require('gulp-markdown'); 
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
    return src('src/README.md')
        .pipe(markdown())
        .pipe(dest('build/html'))
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

function js() {
  return src('src/js/*.js', { sourcemaps: true })
    .pipe(concat('app.min.js'))
    .pipe(dest('build/js', { sourcemaps: true }))
}

// Watch files
function watchFiles() {
    watch("src/css/*.sass", css);
    // watch("src/js/**/*", series(scriptsLint, scripts));
    watch(
        [
        "src/cnt/md/*.md"
//        "./_includes/**/*",
//        "./_layouts/**/*",
//        "./_pages/**/*",
//        "./_posts/**/*",
//        "./_projects/**/*"
        ],
        series(/*jekyll,*/browserSyncReload)
    );
    watch("src/cnt/img/**/*", imagemin);
}

exports.js = js;
exports.css = css;
exports.html = parallel(html, mdown);
exports.all = parallel(html, css, js);
exports.default = defaultTask;
exports.watch = parallel(watchFiles, browserSync);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImd1bHBmaWxlIGNvcHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLm1lcmdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBzcmMsIGRlc3QsIHBhcmFsbGVsLCBzZXJpZXMsIHdhdGNoIH0gPSByZXF1aXJlKCdndWxwJyk7ICAvLyAsIHNlcmllc1xyXG5jb25zdCBwdWcgPSByZXF1aXJlKCdndWxwLXB1ZycpO1xyXG4vL2NvbnN0IGxlc3MgPSByZXF1aXJlKCdndWxwLWxlc3MnKTtcclxuY29uc3Qgc2FzcyA9IHJlcXVpcmUoJ2d1bHAtc2FzcycpO1xyXG4vL2NvbnN0IHNjc3MgPSByZXF1aXJlKCdndWxwLXNjc3MnKTtcclxuY29uc3QgbWluaWZ5Q1NTID0gcmVxdWlyZSgnZ3VscC1jc3NvJyk7XHJcbmNvbnN0IGNvbmNhdCA9IHJlcXVpcmUoJ2d1bHAtY29uY2F0Jyk7XHJcbmNvbnN0IGltYWdlbWluID0gcmVxdWlyZSgnZ3VscC1pbWFnZW1pbicpO1xyXG5jb25zdCBhdXRvcHJlZml4ZXIgPSByZXF1aXJlKCdndWxwLWF1dG9wcmVmaXhlcicpO1xyXG5jb25zdCBicm93c2Vyc3luYyA9IHJlcXVpcmUoJ2Jyb3dzZXItc3luYycpLmNyZWF0ZSgpO1xyXG5jb25zdCBtYXJrZG93biA9IHJlcXVpcmUoJ2d1bHAtbWFya2Rvd24nKTsgXHJcbi8vY29uc3QgamVreWxsID0gcmVxdWlyZSgnamVreWxsJyk7XHJcblxyXG5cclxuLy8gQnJvd3NlclN5bmNcclxuZnVuY3Rpb24gYnJvd3NlclN5bmMoZG9uZSkge1xyXG4gICAgYnJvd3NlcnN5bmMuaW5pdCh7XHJcbiAgICAgICAgcHJveHk6ICdsb2MuY2FrZW5ldzo4MCcsXHJcbiAgICAgICAgYmFzZURpcjogXCIuL1wiLFxyXG4gICAgICAgIG9wZW46dHJ1ZSxcclxuICAgICAgICBub3RpZnk6ZmFsc2VcclxuICAgIH0pO1xyXG4gICAgZG9uZSgpO1xyXG59XHJcblxyXG4vLyBCcm93c2VyU3luYyBSZWxvYWRcclxuZnVuY3Rpb24gYnJvd3NlclN5bmNSZWxvYWQoZG9uZSkge1xyXG4gICAgYnJvd3NlcnN5bmMucmVsb2FkKCk7XHJcbiAgICBkb25lKCk7XHJcbn1cclxuXHJcbi8vIENsZWFuIGFzc2V0c1xyXG5mdW5jdGlvbiBjbGVhbigpIHtcclxuICByZXR1cm4gZGVsKFtcIi4vc3JjL1wiXSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlZmF1bHRUYXNrKGNiKSB7IFxyXG4gICAgLy8gcGxhY2UgY29kZSBmb3IgeW91ciBkZWZhdWx0IHRhc2sgaGVyZVxyXG4gICAgY2IoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaHRtbCgpIHtcclxuICByZXR1cm4gc3JjKCdzcmMvdGVtcGxhdGVzLyoucHVnJylcclxuICAgIC5waXBlKHB1ZygpKVxyXG4gICAgLnBpcGUoZGVzdCgnYnVpbGQvaHRtbCcpKVxyXG59XHJcbmZ1bmN0aW9uIG1kb3duKCkge1xyXG4gICAgcmV0dXJuIHNyYygnc3JjL1JFQURNRS5tZCcpXHJcbiAgICAgICAgLnBpcGUobWFya2Rvd24oKSlcclxuICAgICAgICAucGlwZShkZXN0KCdidWlsZC9odG1sJykpXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBjc3MoKSB7XHJcbiAgICByZXR1cm4gc3JjKCdzcmMvY3NzLyouc2FzcycpXHJcbiAgICAvLy5waXBlKGxlc3MoKSlcclxuICAgIC5waXBlKHNhc3MoKSlcclxuICAgIC5waXBlKGF1dG9wcmVmaXhlcih7XHJcbiAgICAgICAgY2FzY2FkZTogZmFsc2VcclxuICAgIH0pKVxyXG4gICAgLnBpcGUobWluaWZ5Q1NTKCkpXHJcbiAgICAucGlwZShkZXN0KCdidWlsZC9jc3MnKSlcclxufVxyXG5cclxuZnVuY3Rpb24ganMoKSB7XHJcbiAgcmV0dXJuIHNyYygnc3JjL2pzLyouanMnLCB7IHNvdXJjZW1hcHM6IHRydWUgfSlcclxuICAgIC5waXBlKGNvbmNhdCgnYXBwLm1pbi5qcycpKVxyXG4gICAgLnBpcGUoZGVzdCgnYnVpbGQvanMnLCB7IHNvdXJjZW1hcHM6IHRydWUgfSkpXHJcbn1cclxuXHJcbi8vIFdhdGNoIGZpbGVzXHJcbmZ1bmN0aW9uIHdhdGNoRmlsZXMoKSB7XHJcbiAgICB3YXRjaChcInNyYy9jc3MvKi5zYXNzXCIsIGNzcyk7XHJcbiAgICAvLyB3YXRjaChcInNyYy9qcy8qKi8qXCIsIHNlcmllcyhzY3JpcHRzTGludCwgc2NyaXB0cykpO1xyXG4gICAgd2F0Y2goXHJcbiAgICAgICAgW1xyXG4gICAgICAgIFwic3JjL2NudC9tZC8qLm1kXCJcclxuLy8gICAgICAgIFwiLi9faW5jbHVkZXMvKiovKlwiLFxyXG4vLyAgICAgICAgXCIuL19sYXlvdXRzLyoqLypcIixcclxuLy8gICAgICAgIFwiLi9fcGFnZXMvKiovKlwiLFxyXG4vLyAgICAgICAgXCIuL19wb3N0cy8qKi8qXCIsXHJcbi8vICAgICAgICBcIi4vX3Byb2plY3RzLyoqLypcIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgc2VyaWVzKC8qamVreWxsLCovYnJvd3NlclN5bmNSZWxvYWQpXHJcbiAgICApO1xyXG4gICAgd2F0Y2goXCJzcmMvY250L2ltZy8qKi8qXCIsIGltYWdlbWluKTtcclxufVxyXG5cclxuZXhwb3J0cy5qcyA9IGpzO1xyXG5leHBvcnRzLmNzcyA9IGNzcztcclxuZXhwb3J0cy5odG1sID0gcGFyYWxsZWwoaHRtbCwgbWRvd24pO1xyXG5leHBvcnRzLmFsbCA9IHBhcmFsbGVsKGh0bWwsIGNzcywganMpO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBkZWZhdWx0VGFzaztcclxuZXhwb3J0cy53YXRjaCA9IHBhcmFsbGVsKHdhdGNoRmlsZXMsIGJyb3dzZXJTeW5jKTsiXX0=