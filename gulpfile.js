var gulp = require("gulp");
var pegjs = require("gulp-pegjs");

const defaultConfigure = {
    optimize: "speed",
    // format: "globals",
    // exportVar: "parser"
};

const genParser = (trace) => {
  return gulp
    .src("grammar/*.pegjs")
    .pipe(pegjs({ ...defaultConfigure, trace: trace}))
    .pipe(gulp.dest("src/parser"));
};

gulp.task("genparser", function (done) {
    return genParser(false).on("end", () => done());
})

gulp.task("genparser_trace", function (done) {
    return genParser(true).on("end", () => done());
})
