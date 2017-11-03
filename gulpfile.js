//빌드같은 걸 해주는 md 요즘은 웹팩도 많이 쓴다. 서버는 걸프가 더 편한것같아서 걸프를 씀.

var gulp = require("gulp");
var ts = require("gulp-typescript");
var tslint = require("gulp-tslint");
var tsProject = ts.createProject("tsconfig.json");
var sourcemap = require("gulp-sourcemaps");
var clean = require('gulp-clean');
var nodemon = require('gulp-nodemon');
var mocha = require("gulp-mocha");

gulp.task('clean', function () {
  return gulp.src('./dist', {read: false}).pipe(clean());
});

gulp.task('compile:resources', function () {
  return gulp.src('./src/resources/*')
    .pipe(gulp.dest('./dist/resources'));
})

gulp.task('compile:typescript', ['compile:resources'], function () {
  return gulp.src(['./src/**/*.ts'])
    .pipe(sourcemap.init())
    .pipe(tsProject())
    .pipe(sourcemap.write(".", {sourceRoot: "../src"}))
    .pipe(gulp.dest("dist"));
})

gulp.task('lint:typescript', function() {
  return gulp.src('./src/**/*.ts')
    .pipe(tslint({formatter: 'prose'}))
})

gulp.task('build', ['lint:typescript', 'compile:typescript']);

gulp.task("watch", ['build'], function () {
  return nodemon({
    ext: "ts js json",
    script: "bin/www",
    watch: ["src/*", "test/*"],
    tasks: ['build']
  });
});

gulp.task('test', ['compile:typescript'], function () {
  return gulp.src('./test/spec/**/*.ts')
    .pipe(mocha({
      reporter: 'spec',
      require: 'ts-node/register'
    }));
});