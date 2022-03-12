//用到的插件
var gulp = require("gulp");
var cleanCSS = require("gulp-clean-css"); // 压缩 CSS
// 压缩 HTML
var htmlmin = require("gulp-html-minifier-terser");
var htmlclean = require("gulp-htmlclean");
var terser = require("gulp-terser"); // gulp-tester，压缩 JS
var clean = require("gulp-clean"); //清理文件或文件夹
const { parallel } = require("gulp");
// const changed = require("gulp-changed"); // 仅传递已更改的文件

// gulp.task("clean-public", function () {
//   return gulp.src("./public/**/*", { read: false }).pipe(clean());
// });

gulp.task("copy", (done) => {
  gulp
    .src(["img/*.png", "img/*.jpg", "img/*.svg", "img/*.ico", "img/*.webp"])
    .pipe(gulp.dest("./public/img"));
  gulp
    .src(["font/*.ttf", "font/*.woff", "font/*.woff2", "font*.otf"])
    .pipe(gulp.dest("./public/font"));
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
    .src("*.html")
    .pipe(htmlclean())
    .pipe(
      htmlmin({
        removeComments: true, //清除html注释
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

gulp.task(
  "default",
    gulp.parallel("js-min", "css-min", "html-min", "copy"),
);
