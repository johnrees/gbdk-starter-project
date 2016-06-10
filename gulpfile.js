'use strict';

let gulp =  require('gulp'),
    shell = require('gulp-shell'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    del = require('del'),

    srcHTML = './src/*.html',
    srcJS = './src/js/**/*.js',
    srcC = './src/rom/*.c',
    srcROM = './src/rom/*.gb';

gulp.task('clean', () => del('dist/'));

gulp.task('make', function () {
  return gulp.src(srcC, {read: false})
    .pipe(shell([
      'lcc -Wa-l -Wl-m -Wl-j -o <%= f(file.path) %> <%= file.path %>'
    ], {
      templateData: {
        f: function (s) {
          return s.replace('.c', '.gb')
        }
      }
    }))
    .pipe(connect.reload());
});

gulp.task('rom', () => {
  return gulp.src(srcROM)
    .pipe(gulp.dest('dist/rom/'))
    .pipe(connect.reload());
});

gulp.task('html', () => {
  return gulp.src(srcHTML)
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());
});

gulp.task('scripts', function() {
  return gulp.src(srcJS)
    .pipe(concat('game.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

gulp.task('watch', () => {
  let watches = [
    [srcC, 'make'],
    [srcHTML, 'html'],
    [srcROM, 'rom'],
    [srcJS, 'js']
  ];
  let onChanged = (event) => console.info(event.path + ' was ' + event.type + '. Running tasks...');

  for (let watch of watches) {
    gulp.watch(watch[0], [watch[1]]).on('change', onChanged);
  }

});

gulp.task('default', [ 'connect', 'make', 'html', 'scripts', 'watch' ]);
