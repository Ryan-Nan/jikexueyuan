/**
 * Created by Administrator on 2017/1/16 0016.
 */

var gulp=require('gulp');
var concat=require('gulp-concat');  /*合并文件*/
var autoprefixer=require('gulp-autoprefixer');/*自动补全css样式前缀*/
var browserify=require('gulp-browserify');/*管理js依赖*/
var browserSync=require('browser-sync').create();/*浏览器自动刷新*/
var reload=browserSync.reload;      /*什么东西？？？*/
var cssmin=require('gulp-minify-css');  /*压缩css模块*/
var rename=require('gulp-rename');  /*重命名模块*/
var jsmin=require('gulp-uglify');   /*js压缩*/
var htmlmin=require('gulp-htmlmin'),  /*html mini*/
    imagemin=require('gulp-imagemin'),  /*图片压缩*/
    pngquant = require('imagemin-pngquant'),

    rev=require('gulp-rev'),    /*对文件名加MD5后缀*/
/*gulp-rev 把静态文件名改成hash的形式。哈希值文件，有什么好处，怎么比对检验计算出来的md5，求解*/

    revCollector = require('gulp-rev-collector');   /*路径替换*/
var clean=require('gulp-clean');    /*清除文件*/
var runSequence=require('run-sequence');/*用于按顺序执行 gulp任务插件*/




/*-------------------开发环境，gulp dev--------------------------*/

//合并压缩css
gulp.task('cssmin',function(){
    //console.log("ok!!!");
    gulp.src('./src/css/*.css')
        .pipe(concat('all.css'))
        .pipe(cssmin())
        .pipe(rename('all.min.css'))/*更命名为baidu.min.css*/

        .pipe(gulp.dest('./src/css'))/*gulp.dest处理完后文件生成的路径*/
        .pipe(reload({stream:true}));
});

//合并压缩js文件
gulp.task('jsmin',['libs'],function(){
   gulp.src('./src/js/index.js')
       .pipe(browserify())
       .pipe(jsmin())
       .pipe(rename('all.min.js'))
       .pipe(gulp.dest('./src/js'))
       .pipe(reload({stream:true}));

});


gulp.task('libs',function(){
    return gulp.src(['bower_components/jquery/dist/*.min.js'])
        .pipe(rename('jquery.js'))
        .pipe(gulp.dest('./src/js'))
        .pipe(gulp.dest('./dist/js/'));
});

//监听任务
gulp.task('watch',function(){
    gulp.watch('./src/js/*.js',['jsmin']);
});

gulp.task('dev',function(){
    /*按顺序执行gulp任务*/
    runSequence(['cssmin','jsmin','watch']);
    browserSync.init({
        server:"./src"
    });
    gulp.watch([
        './src/**/*.*'
    ]).on('change',reload);
});




/*--------------产品上线，文件合并，压缩，加  MD5后缀，更改路径，gulp release---------------*/

//css中的图片压缩并加上MD5后缀
gulp.task('cssImagemin',function(){
    return gulp.src('./src/images/*.{png,jpg,gif,jpeg,ico}')
        .pipe(imagemin())
        .pipe(rev())
        .pipe(gulp.dest('./dist/stylesheets/images'))
        .pipe(rev.manifest('cssimages.json'))
        .pipe(gulp.dest('./cssimagerev'));
});

//css加MD5后缀
gulp.task('cssMd5',function(){
    return gulp.src('./src/css/all.min.css')
        .pipe(rev())
        .pipe(gulp.dest('./dist/css'))
        .pipe(rev.manifest('css.json'))
        .pipe(gulp.dest('./rev'));
});

//js add MD5后缀
gulp.task('jsMd5',function(){
    return gulp.src('./src/js/all.min.js')
        .pipe(rev())
        .pipe(gulp.dest('./dist/js'))
        .pipe(rev.manifest('scripts.json'))
        .pipe(gulp.dest('./rev'));

});


//更改css，js文件中图片名称
gulp.task('cssimagerev',function(){
   return gulp.src(['./cssimagerev/cssimages.json','./dist/css/*'])
       .pipe(revCollector())
       .pipe(gulp.dest('./dist/css'));
});
gulp.task('jsimagerev',function(){
    return gulp.src(['./cssimagerev/cssimages.json','./dist/js/*'])
        .pipe(revCollector())
        .pipe(gulp.dest('./dist/js'));
});

//压缩html
gulp.task('htmlmin',function(){
    return gulp.src('./src/index.html')
        .pipe(htmlmin())
        .pipe(gulp.dest('./dist'))
        .pipe(reload({stream:true}));
});

//压缩html中的图片并加MD5后缀
gulp.task('imagemin', function () {
     return gulp.src('./src/images/*.{png,jpg,gif,jpeg,ico}')
        .pipe(imagemin())
        .pipe(rev())
        .pipe(gulp.dest('./dist/images'))
        .pipe(rev.manifest('images.json'))
        .pipe(gulp.dest('./rev'));
});


//更改html中的图片名称，js，css路径
gulp.task('htmlrev',function(){
    return gulp.src(['./rev/*.json','./dist/*.html'])
        .pipe(revCollector({
            replaceReved: true
             /*dirReplacements: {
                'css': '/dist/css',
                '/js/': '/dist/js/',
                'cdn/': function(manifest_value) {
                    return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
                }
            }*/
        }))
        .pipe(gulp.dest('./dist'));
});

//清空发布根目录文件
gulp.task('clean',function(){
    return gulp.src(['dist','rev'],{read:false})
        .pipe(clean());
});

gulp.task('serve',function(){
    browserSync.init({
        server:"./dist"
    });
});


gulp.task('default',['clean'],function(){

    /*按顺序执行gulp任务*/
    runSequence('clean',['cssmin','jsmin','cssImagemin','imagemin','htmlmin'],['cssMd5','jsMd5'],['cssimagerev','jsimagerev'],['htmlrev'],['serve']);
});

//为什么有的加return，有的不加return，什么区别啊？
