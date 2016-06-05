/**
* @Author: Walter Bonetti <IniterWorker>
* @Date:   2016-06-06T01:35:06+02:00
* @Email:  walter.bonetti@epitech.eu
* @Last modified by:   IniterWorker
* @Last modified time: 2016-06-06T01:46:27+02:00
* @License: MIT
*/

var gulp = require('gulp');
var jsdoc = require("gulp-jsdoc");

gulp.task('default', function() {
  console.log("Empty Default Task")
});

gulp.task('doc', function() {
  gulp.src("./source/*.js")
    .pipe(jsdoc('./doc'))
})
