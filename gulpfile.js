//用到的插件
var gulp = require("gulp");
// 删除文件
var del = require("del");
// 压缩 CSS
var cleanCSS = require("gulp-clean-css");
// 压缩 HTML
var htmlmin = require("gulp-html-minifier-terser");
var htmlclean = require("gulp-htmlclean");
// gulp-tester，压缩 JS
var terser = require("gulp-terser");
// 合并文件
var concat = require("gulp-concat");
// var order = require("gulp-order");
// js、css请求合并
var useref = require("gulp-useref");

// 请求合并
gulp.task("unite", function () {
  return gulp
    .src("./public/index.html")
    .pipe(useref())
    .pipe(gulp.dest("./public"));
});

// 清除
gulp.task("clean", function () {
  return del([
    "./public/**/*",
    "./public/*.html",
    "./js/all.js",
    "./css/all.css",
    "!./public/.git",
    "!./public/Push.bat",
  ]);
});

// css、js合并
gulp.task("concat", function (done) {
  gulp
    .src("./js/*.js") //要合并的文件
    .pipe(concat("all.js")) // 合并匹配到的js文件，并命名为 "all.js"
    .pipe(gulp.dest("./js"));
  gulp
    .src("./css/*.css") //要合并的文件
    .pipe(concat("all.css")) // 合并匹配到的css文件，并命名为 "all.css"
    .pipe(gulp.dest("./css"));
  done();
});

// 复制
gulp.task("copy", (done) => {
  gulp
    .src(["img/*.png", "img/*.jpg", "img/*.svg", "img/*.ico", "img/*.webp"])
    .pipe(gulp.dest("./public/img"));
  gulp
    .src(["font/*.ttf", "font/*.woff", "font/*.woff2", "font*.otf"])
    .pipe(gulp.dest("./public/font"));
  gulp.src(["index.html"]).pipe(gulp.dest("./public/"));
  done();
});

// 压缩js
gulp.task(
  "js-min",
  () =>
    gulp
      .src(["./js/*.js", "!./js/*.min.js"]) //原文件所在目录
      .pipe(terser())
      .pipe(gulp.dest("./public/js")) //压缩输出目录
);

//压缩css
gulp.task("css-min", function () {
  return gulp
    .src(["./css/*.css", "!./css/*.min.css"])
    .pipe(
      cleanCSS({
        compatibility: "ie11",
      })
    )
    .pipe(gulp.dest("./public/css"));
});

//压缩html
gulp.task("html-min", function () {
  return gulp
    .src("./public/index.html")
    .pipe(htmlclean())
    .pipe(
      htmlmin({
        removeComments: false, //清除html注释
        collapseWhitespace: true, //压缩html
        collapseBooleanAttributes: true,
        //省略布尔属性的值，例如：<input checked="true"/> ==> <input />
        removeEmptyAttributes: true,
        //删除所有空格作属性值，例如：<input id="" /> ==> <input />
        removeScriptTypeAttributes: true,
        //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,
        //删除<style>和<link>的 type="text/css"
        minifyJS: true, //压缩页面 JS
        minifyCSS: true, //压缩页面 CSS
        minifyURLs: true, //压缩页面URL
      })
    )
    .pipe(gulp.dest("./public"));
});

// 按顺序进行任务
gulp.task(
  "default",
  gulp.series(
    "clean",
    "copy",
    "concat",
    "js-min",
    "css-min",
    "unite",
    "html-min"
  )
);
