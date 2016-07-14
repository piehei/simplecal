var gulp = require('gulp');
var bump = require('gulp-bump');
var zip = require('gulp-zip');
var fs = require('fs');
var inject = require('gulp-inject');
var vfs = require('vinyl-fs');
var runSequence = require('run-sequence');



// Defined method of updating:
// Semantic
gulp.task('bumppaus', function(){

    return gulp.src('./src/manifest.json' )
        .pipe(bump())
        .pipe(gulp.dest('./src/'));
});


gulp.task('zippaa', function(){


    var info = JSON.parse(fs.readFileSync('./dist/manifest.json'));
    var extensionFileList = [ 'dist/**' ];
    var fileName = 'simpleCal-' + info.version + '.zip';

    console.log('creating a new zip: ' + fileName);

    return gulp.src(extensionFileList)
        .pipe(zip(fileName))
        .pipe(gulp.dest('zips'));
});

gulp.task('injekt', function(){

    var target = gulp.src('./dist/popup.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src(['./dist/ga.js'], {read: false}, {relative: true} );

    return target.pipe(inject(sources))
        .pipe(gulp.dest('./dist'));
});


gulp.task('copy', function () {

    var files = ['./src/**'];

    return gulp
        .src(files)
        .pipe(gulp.dest('dist'));
});


gulp.task('bump', ['bumppaus']);

gulp.task('zip', ['zippaa']);

gulp.task('injektoi', ['injekt']);

gulp.task('d', function(done) {
    runSequence('bumppaus', 'copy', 'injekt', 'zippaa', function() {
        console.log('Run something else');
        done();
    });
});
