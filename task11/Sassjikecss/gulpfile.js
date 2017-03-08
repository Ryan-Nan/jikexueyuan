/**
 * Created by Administrator on 2017/2/5 0005.
 */

var gulp=require('gulp');
var cssmini=require('gulp-minify-css');
var sass=require('gulp-sass');
var rename=require('gulp-rename');
var browserSync=require('browser-sync').create();
var reload      = browserSync.reload;


// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./sass-BusSchedule"
    });

    gulp.watch("sass-BusSchedule/scss/*.scss", ['sass']);
    gulp.watch("sass-BusSchedule/*.html").on('change', reload);
});

// scss编译后的css将注入到浏览器里实现更新
gulp.task('sass', function() {
    return gulp.src("sass-BusSchedule/scss/bus.scss")
        .pipe(sass())
        .pipe(gulp.dest("sass-BusSchedule/css"))
        .pipe(reload({stream: true}));
});

//压缩并合并css文件
/*gulp.task('cssmini',function(){
   return gulp.src("src/css/!*.css")
       .pipe(cssmini())
       .pipe(rename('jikemin.css'))
       .pipe(gulp.dest("src/css"));
});*/

gulp.task('default', ['serve']);



