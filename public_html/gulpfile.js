const { src, dest, parallel } = require('gulp');  // , series
const pug = require('gulp-pug');
const less = require('gulp-less');
//const scss = require('gulp-scss');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
//const imagemin = require('gulp-imagemin');

function defaultTask(cb) {
    // place code for your default task here
    cb();
}

function html() {
  return src('src/templates/*.pug')
    .pipe(pug())
    .pipe(dest('build/html'))
}

function css() {
  return src('src/templates/*.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(dest('build/css'))
}

function js() {
  return src('src/js/*.js', { sourcemaps: true })
    .pipe(concat('app.min.js'))
    .pipe(dest('build/js', { sourcemaps: true }))
}

exports.js = js;
exports.css = css;
exports.html = html;
exports.all = parallel(html, css, js);
exports.default = defaultTask;