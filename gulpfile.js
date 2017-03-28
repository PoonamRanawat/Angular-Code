var gulp = require('gulp');
var changed = require('gulp-changed')
var autoprefix = require('gulp-autoprefixer'); 
var minifyCSS = require('gulp-minify-css'); 
var concat = require('gulp-concat'); 
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify'); 
var minify = require('gulp-minify-css');
var del = require('del');

gulp.task('imagemin', function() { 
  var img_src = 'src/assets/images/**/*', 
      img_dest = 'build/assets/images';  
  gulp.src(img_src) 
    .pipe(changed(img_dest)) 
    .pipe(imagemin()) 
    .pipe(gulp.dest(img_dest)); 
});

gulp.task('styles', function() { 
  gulp.src(['src/assets/styles/*.css']) 
    .pipe(concat('styles.css')) 
    .pipe(autoprefix('last 2 versions')) 
    .pipe(minifyCSS()) 
    .pipe(gulp.dest('build/assets/styles/'))
    .pipe(browserSync.reload({ 
       stream: true 
    }))
}); 

gulp.task('browserSync', function() { 
  browserSync.init({ 
    server: { 
      baseDir: 'build' 
    }, 
  }) 
});

gulp.task('js', function(){ 
 gulp.src('src/assets/scripts/*.js') 
    .pipe(concat('script.js')) 
    .pipe(uglify()) 
    .pipe(gulp.dest('build/scripts/')); 
}); 

gulp.task('js-ctrl', function(){ 
 gulp.src('src/controllers/*.js') 
    .pipe(concat('script.js')) 
    .pipe(uglify()) 
    .pipe(gulp.dest('build/scripts/controllers')); 
}); 

gulp.task('clean:build', function() { 
  //return del.sync('build'); 
  return del([ 
      'build/temp/', 
      // instructs to clean temp folder 
      '!build/package.json' 
      // negate to instruct not to clean package.json file  
  ]); 
});

gulp.task('default', ['browserSync', 'styles'], function() {  
     gulp.watch('src/styles/*.css', ['styles']); 
});
