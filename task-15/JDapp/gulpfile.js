/**
 * Created by Administrator on 2017/8/25 0025.
 */
var gulp=require('gulp'),
    concat=require('gulp-concat'),  //-多个文件合并为一个
    rename=require('gulp-rename'),
    cssmin = require('gulp-clean-css'),
    jsmin=require('gulp-uglify'),
    rev = require('gulp-rev'),      //-对文件名加MD5后缀
    revCollector = require('gulp-rev-collector'),   //-路径替换
    connect=require('gulp-connect');    //livereload


var apppath= {
    jsSrc:'src/js/*.js',
    jsDist:'dist/js',

    cssSrc:'src/css/*.css',
    cssDist:'dist/css',

    htmlSrc:'src/*.html',
    htmlDist:'dist/'

};

//定义js任务
gulp.task('js',function () {
    gulp.src(apppath.jsSrc)
        .pipe(concat('main.js'))
        .pipe(gulp.dest(apppath.jsDist))
        .pipe(rename({suffix:'.min'}))
        .pipe(jsmin())
        .pipe(rev())
        .pipe(gulp.dest(apppath.jsDist))
        .pipe(rev.manifest('js.json'))
        .pipe(gulp.dest('./rev'))
        .pipe(connect.reload())
});

//定义css任务
gulp.task('css',function () {
    gulp.src(apppath.cssSrc)
        .pipe(concat('main.css'))
        .pipe(cssmin())
        .pipe(gulp.dest(apppath.cssDist))
        .pipe(rename({suffix:'.min'}))
        .pipe(rev())
        .pipe(gulp.dest(apppath.cssDist))
        .pipe(rev.manifest('css.json'))
        .pipe(gulp.dest('./rev'))
        .pipe(connect.reload())
});

//定义HTML任务
gulp.task('html',function(){
    gulp.src(apppath.htmlSrc)
        .pipe(gulp.dest(apppath.htmlDist))
        .pipe(connect.reload())
});

//更改HTML文件静态资源路径
gulp.task('rev', function () {
    gulp.src(['./rev/*.json',apppath.htmlDist+'*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest(apppath.htmlDist))
});

//定义livereload任务
gulp.task('connect',function () {
    connect.server({
        livereload: true
    })
});


//定义监看任务
gulp.task('watch',function () {
    gulp.watch(apppath.htmlSrc,['html']);
    gulp.watch(apppath.jsSrc,['js']);
    gulp.watch(apppath.cssSrc,['css']);

});


//定义默认任务
gulp.task('default',['js','css','rev','html','watch','connect']);