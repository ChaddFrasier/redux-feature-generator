var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
const del = require('del');
const { series } = require('gulp');

var files = [
  './templates/**'
];

function clean () {
  return del('build/**', {force:true});
}

function distribute() {
  return gulp.src(files , { base: './' }).pipe(gulp.dest('build'));
}

function build() {
  return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("build"));
}

exports.build = build;
exports.default = series(clean, distribute ,build);