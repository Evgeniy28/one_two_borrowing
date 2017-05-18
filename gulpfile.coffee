gulp         = require 'gulp'
connect      = require 'gulp-connect'
pug          = require 'gulp-pug'
sass         = require 'gulp-sass'
postcss      = require 'gulp-postcss'
autoprefixer = require 'autoprefixer'
rename       = require 'gulp-rename'
csso         = require 'gulp-csso'
htmlmin      = require 'gulp-htmlmin'
clean        = require 'gulp-clean'
run          = require 'run-sequence'

paths =
  scss: './src/assets/sass/'
  css: './build/assets/css/'
  pug: './src/views/'
  html: './build/'

# runs server
gulp.task 'connect', ->
  connect.server
    root: './build'
    port: 4000
    livereload: true

# cleans build/*
gulp.task 'clean:dir', ->
  gulp.src paths.html + '*', read: false
    .pipe do clean

# build .scss files and minify .css
gulp.task 'build:css', ->
  gulp.src paths.scss + '*.scss'
    .pipe sass().on('error', sass.logError)
    .pipe postcss([ autoprefixer() ])
    .pipe gulp.dest paths.css
    .pipe do csso
    .pipe rename suffix: '.min'
  	.pipe gulp.dest paths.css
    .pipe do connect.reload

# build .pug file
gulp.task 'build:html', ->
  gulp.src paths.pug + '*.pug'
    .pipe pug pretty: true
    .pipe gulp.dest paths.html
    .pipe do connect.reload

# watch .scss and .pug files
gulp.task 'watch', ->
  gulp.watch paths.scss + '**/*.scss', ['build:css']
  gulp.watch paths.pug + '**/*.pug', ['build:html']

# minify html
gulp.task 'minify:html', ->
  gulp.src paths.html + '*.html'
  	.pipe htmlmin collapseWhitespace: true
    .pipe gulp.dest paths.html

# Development
gulp.task 'default', (fn) ->
  run 'build:css',
      'build:html',
      'connect',
      'watch', fn
  return

# Production
gulp.task 'build', (fn) ->
  run 'clean:dir',
      'build:css',
      'build:html',
      'minify:html', fn
  return
