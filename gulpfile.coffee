gulp         = require 'gulp'
connect      = require 'gulp-connect'
pug          = require 'gulp-pug'
sass         = require 'gulp-sass'
postcss      = require 'gulp-postcss'
autoprefixer = require 'autoprefixer'
rename       = require 'gulp-rename'
csso         = require 'gulp-csso'
htmlmin      = require 'gulp-htmlmin'
uglify       = require 'gulp-uglify'
clean        = require 'gulp-clean'
run          = require 'run-sequence'

paths =
  scss: './src/assets/sass/'
  css: './build/assets/css/'
  src_js: './src/assets/js/'
  js: './build/assets/js/'
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
  gulp.src paths.scss + '*.sass'
    .pipe sass().on('error', sass.logError)
    .pipe postcss([ autoprefixer() ])
    .pipe gulp.dest paths.css
    .pipe do csso
    .pipe rename suffix: '_v0.4.min'
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
  gulp.watch paths.scss + '**/*.sass', ['build:css']
  gulp.watch paths.pug + '**/*.pug', ['build:html']
  gulp.watch paths.src_js + '**/*.js', ['minify:js']
  gulp.watch './src/*.php', ['copy:send_mail']

# minify html
gulp.task 'minify:html', ->
  gulp.src paths.html + '*.html'
  	.pipe htmlmin collapseWhitespace: true
    .pipe gulp.dest paths.html

# minify js
gulp.task 'minify:js', ->
  gulp.src paths.src_js + '*.js'
  	.pipe do uglify
    .pipe rename suffix: '_v0.4.min'
    .pipe gulp.dest paths.js
    .pipe do connect.reload

# copy files
gulp.task 'copy:files', ->
  gulp.src ['./src/assets/fonts/**', './src/assets/images/**'], base: './src'
    .pipe gulp.dest paths.html

# copy normalize.css
gulp.task 'copy:normalize', ->
  gulp.src './node_modules/normalize.css/normalize.css'
    .pipe gulp.dest paths.css

# copy jquery.min.js
gulp.task 'copy:jquery', ->
  gulp.src './node_modules/jquery/dist/jquery.min.js'
    .pipe gulp.dest paths.js

# copy jquery.mask.min.js
gulp.task 'copy:jquery-mask', ->
  gulp.src './node_modules/jquery-mask-plugin/dist/jquery.mask.min.js'
    .pipe gulp.dest paths.js

# copy scrollreveal.min.js
gulp.task 'copy:scrollreveal', ->
  gulp.src './node_modules/scrollreveal/dist/scrollreveal.min.js'
    .pipe gulp.dest paths.js

# copy send_mail.php
gulp.task 'copy:send_mail', ->
  gulp.src './src/*.php'
    .pipe gulp.dest paths.html
    .pipe do connect.reload

# copy swipe.min.js
gulp.task 'copy:swipe', ->
  gulp.src './node_modules/swipejs/build/swipe.min.js'
    .pipe gulp.dest paths.js

# Development
gulp.task 'default', (fn) ->
  run 'clean:dir',
      'copy:files',
      'copy:normalize',
      'copy:jquery',
      'copy:send_mail',
      'copy:jquery-mask',
      'copy:scrollreveal',
      'copy:swipe',
      'build:css',
      'minify:js',
      'build:html',
      'connect',
      'watch', fn
  return

# Production
gulp.task 'build', (fn) ->
  run 'clean:dir',
      'copy:files',
      'copy:normalize',
      'copy:jquery',
      'copy:send_mail',
      'copy:jquery-mask',
      'copy:scrollreveal',
      'copy:swipe',
      'build:css',
      'minify:js',
      'build:html',
      'minify:html', fn
  return
