const gulp = require('gulp');
const babel = require('gulp-babel');

//npm install --save-dev gulp-babel babel-preset-2015 

gulp.task('default', () =>
    gulp.src('final/components.js')
        .pipe(babel({
            presets: ['es2015', 'react']
        }))
        .pipe(gulp.dest('dist'))
);