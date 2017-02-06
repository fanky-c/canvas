'use strict';
import path from 'path';
import fs from 'fs';
import os from 'os';
import querystring from 'querystring';
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
import prettify from 'gulp-prettify';
import es from 'event-stream';
import through from 'through2';
import filter from 'gulp-filter';
import rename from 'gulp-rename'; // rename the files
import concat from 'gulp-concat'; // concat the files into single file
import replacePath from 'gulp-replace-path';
import inlinesource from 'gulp-inline-source';
import requirejsOptimize from 'gulp-requirejs-optimize';
import gulpOpen from 'gulp-open';
import connect from 'gulp-connect';
import livereload from 'gulp-livereload'; 
import minifycss from 'gulp-minify-css';
import jshint from 'gulp-jshint'; 
import uglify from 'gulp-uglify'; 
import 'colors';


// browserify
import browserify from 'browserify';
import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import babelify from 'babelify';

var reload = browserSync.reload;
var hostname = 'http://web.yystatic.com/project/group_act/2017spring/mobile';

//清除文件
gulp.task('clean', () => {
    gulp.src([util.joinFormat(__dirname,'dist')])
        .pipe(clean({force:true}))
        .pipe(notify({ message: 'clean task complete'}))
});

//html
gulp.task('html', () => {
      let events = [];
      let tmplStream = null;
      let htmlStream = null;

      tmplStream = gulp.src(util.joinFormat(__dirname,'src','components/@(p-)*/*.jade'))
            .pipe(plumber())
            .pipe(gulpJade({
                pretty: true,
                client: false
            }))
            .pipe(through.obj(function(file, enc, next){
                var iCnt = file.contents.toString();
                var pathReg = /(src|href|data-main|data-original)\s*=\s*(['"])([^'"]*)(["'])/ig;
                // script 匹配
                var scriptReg = /(<script[^>]*>)([\w\W]*?)(<\/script\>)/ig;
                var dirname = util.joinFormat(__dirname, 'src', 'html');
                iCnt = iCnt
                    // 隔离 script 内容
                    .replace(scriptReg, function(str, $1, $2, $3){
                        return $1 + querystring.escape($2) + $3;
                    })
                    .replace(pathReg, function(str, $1, $2, $3, $4){
                        var iPath = $3,
                            rPath = '';

                        if(iPath.match(/^(data:image|javascript:|#|http:|https:|\/)/) || !iPath){
                            return str;
                        }


                        var fDirname = path.dirname(path.relative(dirname, file.path));
                        rPath = util.joinFormat(fDirname, iPath)
                            .replace(/\\+/g,'/')
                            .replace(/\/+/, '/')
                            ;

                        return $1 + '=' + $2 + rPath + $4;
                    })
                    // 取消隔离 script 内容
                    .replace(scriptReg, function(str, $1, $2, $3){
                        return $1 + querystring.unescape($2) + $3;
                    });

                file.contents = new Buffer(iCnt, 'utf-8');
                this.push(file);
                next();
            }))
            .pipe(rename(function(path){
                path.basename = path.basename.replace(/^p-/g,'');
                path.dirname = '';
            }))
            .pipe(prettify({indent_size: 4}))
            .pipe(gulp.dest(util.joinFormat(__dirname, 'src', 'html')))
            .pipe(livereload({quiet: true}));                    
         
         events.push(tmplStream);  //template流

         htmlStream = gulp.src( util.joinFormat(__dirname, 'src', 'html/*.html'))
            .pipe(plumber())
            //内嵌js
            .pipe(inlinesource())
            // 删除requirejs的配置文件引用
            .pipe(replacePath(/<script [^<]*local-usage\><\/script>/g, ''))

            // 替换全局 图片
            .pipe(replacePath(
                util.joinFormat(
                    path.relative(
                        path.join(__dirname, 'src', 'html'),
                        path.join(__dirname, 'components')
                    )
                ),
                util.joinFormat(hostname, 'images', 'globalcomponents')
            ))
            .pipe(replacePath('../js/lib', util.joinFormat(hostname, 'js/lib')))
            .pipe(replacePath(/\.\.\/components\/p-\w+\/p-(\w+).js/g, util.joinFormat(hostname, 'js', '/$1.js')))

            .pipe(replacePath('../css', util.joinFormat(hostname, 'css')))

            .pipe(replacePath('../images', util.joinFormat(hostname, 'images')))
            .pipe(replacePath(/\.\.\/(components\/[pw]-\w+\/images)/g, util.joinFormat(hostname, 'images', '$1')))
            .pipe(gulp.dest(util.joinFormat(__dirname, 'dist', 'html' )))
            .pipe(livereload({quiet: true}));

            events.push(htmlStream);  //html流

            return es.concat.apply(es, events);   //concat --> merge       

})

//css
gulp.task('css', () => {
    
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
        .pipe(minifycss({
            compatibility: 'ie7'
        }))
        .pipe(gulp.dest(util.joinFormat(__dirname, 'dist', 'css')))
        .pipe(livereload({quiet: true}));
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
        .pipe(livereload({quiet: true}));
})

gulp.task('images-img', () => {
    return gulp.src([util.joinFormat(__dirname, 'src', 'images/**/*.*')], {base: util.joinFormat(__dirname, 'src', 'images')})
        .pipe(filter(['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.bmp', '**/*.gif']))
        .pipe(imagemin({progressive: true, use: [pngquant()] }))
        .pipe(gulp.dest(util.joinFormat(__dirname, 'dist', 'images')))
        .pipe(livereload({quiet: true}));      
})


//js
gulp.task('js', () => { 
    let rjsFilter = null;
    let jsStream = null; 
    let jsLibStream = null; 

    /* requirejs 主模块列表 & 页面js [start] */
     rjsFilter = filter(function (file) {
            var result = /([pj]\-[a-zA-Z0-9_]*)[\\\/]([pj]\-[a-zA-Z0-9_]*)\.js$/.test(file.path);
            if(result){
                file.base = util.joinFormat(file.path.replace(/([pj]\-[a-zA-Z0-9_]*)\.js$/, ''));
            }
            return result;
        });
    /* requirejs 主模块列表 & 页面js [end] */

        // jsTask
         jsStream = gulp.src(path.join(__dirname, 'src', 'components/**/*.js'))
            .pipe(plumber())
            .pipe(jshint.reporter('default'))
            .pipe(rjsFilter)
            .pipe(jshint())
            /* 合并主文件中通过 requirejs 引入的模块 [start] */
            .pipe(requirejsOptimize({
                optimize: 'none',
                mainConfigFile: util.joinFormat(__dirname, 'src', 'js/rConfig/rConfig.js')
            }))
            .pipe(uglify())
            .pipe(rename(function(path){                
                path.basename = path.basename.replace(/^[pj]-/g,'');
                path.dirname = '';
            }))
            .pipe(gulp.dest(util.joinFormat(__dirname, 'dist', 'js')))
            .pipe(livereload({quiet: true}));

        // js lib Task
         jsLibStream = gulp.src(util.joinFormat(__dirname, 'src', 'js/lib/**/*.js'))
            .pipe(plumber())
            .pipe(uglify())
            .pipe(gulp.dest(util.joinFormat('dist', 'js/lib')));

    return es.concat.apply(es, [jsStream, jsLibStream]);
})


//watch
gulp.task('watch', () => {
    
    livereload.listen();


    gulp.watch([util.joinFormat(__dirname, 'src', '**/*.scss'),
                util.joinFormat(__dirname, 'src', 'components/*.scss'),
                util.joinFormat(__dirname, 'src', 'sass/*.scss')], ['css']);


    gulp.watch([
        util.joinFormat(__dirname, 'src', 'components/**/*.js'),
        util.joinFormat(__dirname, 'src', 'js/lib/**/*.js')
    ], ['js']);


    gulp.watch([
        util.joinFormat(__dirname, 'src', 'images/*.*'),
        util.joinFormat(__dirname, 'src', 'components/**/images/*.*')
    ], ['images']);

    gulp.watch([
        util.joinFormat(__dirname, 'src', 'components/**/*.jade'),
        util.joinFormat(__dirname, 'src', 'templates/**/*.jade')
    ], ['html']);

})

//server
let host = {
     path: util.joinFormat(__dirname, 'src'),
     port: 3008,
    //html: 'index.html'     
};

let browser = os.platform() === 'linux' ? 'Google chrome' : (
              os.platform() === 'darwin' ? 'Google chrome' : (
              os.platform() === 'win32' ? 'chrome' : 'firefox'));


gulp.task('connect', () => {
    connect.server({
        root: host.path,
        port: host.port,
        livereload: true
    });      
});

gulp.task('open', (done)=> {
        gulp.src('')
        .pipe(gulpOpen({
            app: browser,
            uri: 'http://localhost:'+ host.port
            //uri: 'http://localhost:'+ host.port +'/html/'
        }))
        .on('end', done);
});

//all
gulp.task('all',(done) => {
    runSequence('js','css','images','html',done)
})

//dev
gulp.task('watchAll', () => {
      runSequence(['all'], 'watch','connect','open')
})




// //js
// gulp.task('babel',() => {
//   gulp.src('src/js/*.js')
//     .pipe(plumber())
//     .pipe(babel())       
//     .pipe(gulp.dest('dist/js'))
//     .pipe(notify({ message: 'babel task complete' }));
// })

// gulp.task('js-watch', ['babel'], browserSync.reload);

// // set browserify task
// gulp.task('browserify',()=> {
//         return browserify({
//             entries: ['src/js/main.js'],          
//             // entries: ['src/js/main.js'
//             //            ,'src/js/foo.js'
//             //            ,'src/js/letAndConst.js'
//             //            ,'src/js/string.js'
//             //            ,'src/js/assignmentAndresolution.js'],
//             debug: true
//         })       
//         .transform("babelify", {presets: ["es2015"]})        
//         .bundle()
//         .on('error', function(err){
//           console.log(err.message);
//           this.emit('end');
//         })        
//         .pipe(source('bundle.js'))   //生成入口文件
//         .pipe(buffer())
//         .pipe(sourcemaps.init({loadMaps: true}))        
//         .pipe(sourcemaps.write({
//             includeContent: false,
//             sourceRoot: 'src'
//         }))      
//         .pipe(gulp.dest('dist/js'))
//         .pipe(notify({ message: 'browserify task complete' }));
// })


// // The static server
// gulp.task('serve', ['html','sass','images','babel'], () => {
//     browserSync.init({
//         server: {
//             baseDir: ['./dist']
//         },
//         port: 9998
//     });

//     gulp.watch("src/html/*.html").on('change', browserSync.reload);
//     gulp.watch('src/css/*.scss', ['sass']);
//     gulp.watch("src/js/*.js", ['js-watch']);
// });

// gulp.task('default', ['html','sass','images','babel','serve','browserify','watch']);

