'use strict';

/**

  TODO:
  - REGISTER TASKS FOR TEST
    Refer: https://github.com/creynders/load-grunt-configs/tree/master/demos/3.by-type/config

  - REGISTER NOTIFICATIONS

**/

module.exports = function(grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // options for all tasks
  var Options = function() {
    this.config = {
      src: 'config-grunt/*.js' // set folder for configuration tasks
    };

    this.domain = 'http://localhost:8000';

    this.paths = {
      // file to track for server reboot on nodemon restart
      rebootedFile: '.rebooted',
      tmp: '.tmp',
      tmpCss: '.tmp/css',
      tmpJs: '.tmp/js',
      img: 'public/images',
      css: 'public/css',
      cssSource: 'public/css/src',
      js: 'public/js',
      jsSource: 'public/js/app',
      less: 'public/less',
      views: 'views'
    };

    this.paths.publicImages = this.domain + '/images';
  };

  // loads the various task configuration files
  var configs = require('load-grunt-configs')(grunt, new Options());
  grunt.initConfig(configs);

  // BUIL SIMPLE WITHOUT CSS PREPROCESORS
  // grunt.registerTask('build-simple', [
  //   'clean', 'concat:css',
  //   'autoprefixer', ['copy:css', [, 'cssmin']],
  //   'concat:js', 'copy:js' ['uglify']
  // ]);

  grunt.registerTask('build', [
    'clean',
    'less:development',
    'autoprefixer',
    'copy:css'
  ]);

  grunt.registerTask('build-production', [
    'clean',
    'less:production',
    'autoprefixer',
    'cssmin',
    'concat:js',
    'uglify'
  ]);

  grunt.registerTask('launch', ['wait', 'open']);

  /*==========  PRINCIPAL TASKS  ==========*/

  // production mode (minify files)
  grunt.registerTask('production', [
    'newer:jshint', // run jshint only for new or modified files
    // 'test'
    'build-production',
    'launch'
  ]);

  grunt.registerTask('default', [
    'newer:jshint', // run jshint only for new or modified files
    // 'test',
    'build',
    // run concurrent tasks (nodemon, node-inspector, watch) only on development
    'concurrent',
    'launch'
  ]);
};
