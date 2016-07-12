var gulp = require('gulp');
var bump = require('gulp-bump');


// Defined method of updating:
// Semantic
gulp.task('bump', function(){
    gulp.src('./manifest.json')
        .pipe(bump())
        .pipe(gulp.dest('./'));
});




gulp.task('default', ['bump']);