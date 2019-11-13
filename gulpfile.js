const gulp = require("gulp");
const del = require("del");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const cleanCss = require("gulp-clean-css");

const config = require("./gulp.config.json");

const path = {
    js: `${config.root}/${config.path.js}`,
    css: `${config.root}/${config.path.css}`
};
const bundleJsFileName = `${config.package}.min.js`;
const bundleCssFileName = `${config.package}.min.css`;
const pathBundleJs = `${path.js}/${bundleJsFileName}`;
const pathBundleCss = `${path.css}/${bundleCssFileName}`;
const globJs = `${path.js}/*.js`;
const globCss = `${path.css}/*.css`;

const deleteBundleJs = () => del(pathBundleJs);
const deleteBundleCss = () => del(pathBundleCss);

const bundleJs = () => gulp
    .src([globJs, `!${path.js}/start.js`])
    .pipe(concat(bundleJsFileName))
    .pipe(uglify())
    .pipe(gulp.dest(path.js))

const bundleCss = () => gulp
    .src(globCss)
    .pipe(concat(bundleCssFileName))
    .pipe(cleanCss())
    .pipe(gulp.dest(path.css))

const buildJs = gulp.series(deleteBundleJs, bundleJs);
const buildCss = gulp.series(deleteBundleCss, bundleCss);

exports.build = gulp.parallel(buildJs, buildCss);
