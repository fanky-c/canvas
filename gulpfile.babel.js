'use strict';
import path from 'path';
import fs from 'fs';
import util from './lib/util';
import gulp from 'gulp';
import babel from 'gulp-babel';
import sass from 'gulp-ruby-sass';
import autoprefixer from 'gulp-autoprefixer';
import notify from 'gulp-notify';
import browserSync from 'browser-sync';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import clean from 'gulp-clean';
import plumber from 'gulp-plumber';
import gulpJade from 'gulp-jade';
import runSequence from 'run-sequence';
import es from 'event-stream';
import through from 'through2';
import filter from 'gulp-filter';
import rename from 'gulp-rename'; // rename the files
import concat from 'gulp-concat'; // concat the files into single file
import replacePath from 'gulp-replace-path';
import 'colors';


// browserify
import browserify from 'browserify';
import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import babelify from 'babelify';

var reload = browserSync.reload;
var hostname = 'http://web.yystatic.com/project/group_act/2017spring/mobile';

gulp.task('test',() => {
    console.log(('11111').red);
})

//清除文件
gulp.task('clean', () => {
    gulp.src([util.joinFormat(__dirname,'dist')])
        .pipe(clean({force:true}))
        .pipe(notify({ message: 'clean task complete'}))
});

//css
gulp.task('css',() => {
    
    process.chdir(util.joinFormat(__dirname, 'src', 'components'));   //改变当前目录
    
    return sass('./', { style: 'nested'}) //, 'compass': true 默认是false,不引入项目sass配置
        .pipe(filter('@(p-)*/*.css'))
        .pipe(through.obj(function(file, enc, next){
            var iCnt = file.contents.toString();
            var pathReg = /(url\s*\(['"]?)([^'"]*?)(['"]?\s*\))/ig;
            var pathReg2 = /(src\s*=\s*['"])([^'" ]*?)(['"])/ig;
            var dirname = util.joinFormat(__dirname, 'src', 'css');

            var replaceHandle = function(str, $1, $2, $3){
                var iPath = $2,
                    rPath = '';

                if(iPath.match(/^(about:|data:)/)){
                    return str;
                }

                var fDirname = path.dirname(path.relative(dirname, file.path));
                rPath = path.join(fDirname, iPath)
                    .replace(/\\+/g,'/')
                    .replace(/\/+/, '/')
                    ;
                if(fs.existsSync(util.joinFormat(dirname, rPath).replace(/\?.*?$/g,''))){
                    return $1 + rPath + $3;

                } else {
                    console.log(([
                        '',
                        '[error] css url replace error!',
                        file.history,
                        '[' + rPath + '] is not found!'].join("\n")
                    ).yellow);
                    return str;
                }

            };
            iCnt = iCnt
                .replace(pathReg, replaceHandle)
                .replace(pathReg2, replaceHandle);

            file.contents = new Buffer(iCnt, 'utf-8');
            this.push(file);
            next();
        }))
        .pipe(rename(function(path){
            path.dirname = '';
            path.basename = path.basename.replace(/^p-/,'');
        }))
        .pipe(gulp.dest('../css/'))
        // 替换全局 图片
        .pipe(replacePath(
            util.joinFormat(
                path.relative(
                    path.join(__dirname, 'src', 'css'),
                    path.join(__dirname, 'src', 'components')
                )
            ),
            util.joinFormat(hostname, 'images', 'globalcomponents')
        ))
        .pipe(replacePath('../images', util.joinFormat(hostname, 'images')))
        .pipe(replacePath('../components', util.joinFormat(hostname, 'images', 'components')))         
        .pipe(gulp.dest(util.joinFormat(__dirname, 'dist', 'css')))
})


//images
gulp.task('images',['images-components','images-img']);

gulp.task('images-components', () => {
     return gulp.src([
            util.joinFormat(__dirname, 'src', 'components/**/*.*'),
            '!**/*.tpl',
            '!**/*.jade',
            '!**/*.js',
            '!**/*.scss',
            '!**/*.html',
            '!**/*.css',
            '!**/*.md',
            '!**/*.psd'
        ], {
            base: util.joinFormat(__dirname, 'src', 'components')
        })
        .pipe(plumber())
        .pipe(imagemin({ progressive: true, use: [pngquant()]}))
        .pipe(gulp.dest( util.joinFormat(__dirname, 'dist', 'images', 'components')))
})

gulp.task('images-img', () => {
    return gulp.src([util.joinFormat(__dirname, 'src', 'images/**/*.*')], {base: util.joinFormat(__dirname, 'src', 'images')})
        .pipe(filter(['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.bmp', '**/*.gif']))
        .pipe(imagemin({progressive: true, use: [pngquant()] }))
        .pipe(gulp.dest(util.joinFormat(__dirname, 'dist', 'images')))      
})

//css
// gulp.task('sass', () => {
//   gulp.src('src/css/*.scss')
//     .pipe(plumber())
//     .pipe(sass())
//     .pipe(autoprefixer())
//     .pipe(gulp.dest('dist/css'))
//     .pipe(browserSync.reload({stream:true}))
//     .pipe(notify({ message: 'sass task complete'}));
// })

//html
gulp.task('html',() => {
   gulp.src('src/html/*.html')
   .pipe(plumber())
   .pipe(gulp.dest('dist/html'))
   .pipe(notify({ message: 'html task complete' }));
});

//images
// gulp.task('images', () => {
//     gulp.src(['src/images/*','src/images/**/*'])
//     .pipe(plumber())
//     .pipe(imagemin({
//        progressive: true,
//        use: [pngquant()] //使用pngquant来压缩png图片
//     }))
//     .pipe(gulp.dest('dist/images'))
//     .pipe(notify({ message: 'images task complete'}))
// });

//js
gulp.task('babel',() => {
  gulp.src('src/js/*.js')
    .pipe(plumber())
    .pipe(babel())       
    .pipe(gulp.dest('dist/js'))
    .pipe(notify({ message: 'babel task complete' }));
})

gulp.task('js-watch', ['babel'], browserSync.reload);

// set browserify task
gulp.task('browserify',()=> {
        return browserify({
            entries: ['src/js/main.js'],          
            // entries: ['src/js/main.js'
            //            ,'src/js/foo.js'
            //            ,'src/js/letAndConst.js'
            //            ,'src/js/string.js'
            //            ,'src/js/assignmentAndresolution.js'],
            debug: true
        })       
        .transform("babelify", {presets: ["es2015"]})        
        .bundle()
        .on('error', function(err){
          console.log(err.message);
          this.emit('end');
        })        
        .pipe(source('bundle.js'))   //生成入口文件
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))        
        .pipe(sourcemaps.write({
            includeContent: false,
            sourceRoot: 'src'
        }))      
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({ message: 'browserify task complete' }));
})


// The static server
gulp.task('serve', ['html','sass','images','babel'], () => {
    browserSync.init({
        server: {
            baseDir: ['./dist']
        },
        port: 9998
    });

    gulp.watch("src/html/*.html").on('change', browserSync.reload);
    gulp.watch('src/css/*.scss', ['sass']);
    gulp.watch("src/js/*.js", ['js-watch']);
});

gulp.task('default', ['html','sass','images','babel','serve','browserify','watch']);

gulp.task('watch', () => {
    gulp.watch("src/html/*.html",['html']); 
    gulp.watch('src/css/app.scss',['sass']);
    gulp.watch('src/images/*.{jpg,png,gif}',['images']);
    gulp.watch('src/app.js', ['babel']);
    gulp.watch('src/js/*.js', ['browserify']);
})
