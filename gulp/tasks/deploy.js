'use strict';

import gulp from 'gulp';
import config from '../config';
import del from 'del';

gulp.task('deploy', ['prod'], function() {

  // NOTE: copies the dist files to the backend!

  del([config.backendDir]);
  return gulp.src(config.buildDir + '**')
    .pipe(gulp.dest(config.backendDir));

});
