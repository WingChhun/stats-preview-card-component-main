const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const browserSync = require('browser-sync').create();
const { src, dest, watch, series } = require('gulp');

// SASS task
function scssTask() {
  return src('sass/main.scss', {
    sourcemaps: true,
  })
    .pipe(sass())
    .pipe(postcss([cssnano()]))
    .pipe(
      dest('dist', {
        sourcemaps: '.',
      })
    );
}

// Browsersync Tasks
function browserSyncServer(cb) {
  browserSync.init({
    server: {
      baseDir: '.',
    },
  });

  // Complete
  cb();
}

function browserSyncReload(cb) {
  browserSync.reload();
  cb();
}

// watch task
function watchTask() {
  watch('*.html', browserSyncReload);
  watch('sass/*.scss', series(scssTask, browserSyncReload));
}

// Default gulp task
exports.default = series(scssTask, browserSyncServer, watchTask);
