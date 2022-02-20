var gulp = require("gulp");
var ts = require("gulp-typescript");
const del = require('del');
const { series } = require('gulp');
var tsProject = ts.createProject("tsconfig.json");


var copyFiles = [
  './templates/**'
];

function clean () {
  console.log("Cleaning Build Folder")
  return del(['build/**', 'test/src/features/*'], {force:true});
}

function distribute() {
  console.log("Templates Copied")
  return gulp.src(copyFiles , { base: './' }).pipe(gulp.dest('build'));
}

function build() {
  console.log("Compilation Finished")
  return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("build"));
}

exports.build = build;
exports.default = series(clean, distribute ,build);