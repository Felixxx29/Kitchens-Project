const { task, src, dest, watch, series } = require('gulp')
const less = require('gulp-less');
const path = require('path');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const concatCss = require('gulp-concat-css');

exports.less = function () {
    return src('./src/styles/main.less', './src/styles/adaptive.less')
        .pipe(less({
            paths: [ path.join('./src/styles/*.less', 'less', 'includes') ]
        }))
        .pipe(concatCss("main.css"))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('./styles/css'));
};

exports.lessWatch = function () {
    watch('./src/styles/*.less', series('less'));
};
