'use strict';

module.exports = function(grunt, options) {
  return {
    tasks: {
      /*==========  CLEAN DIRECTORIES  ==========*/
      'clean:tmp': {
        src: ['<%= paths.tmp %>']
      },

      'clean:css': {
        src: ['<%= paths.css %>/*.css']
      },

      'clean:js': {
        src: ['<%= paths.js %>/*.js']
      },

      /*==========  COPY FILES  ==========*/
      'copy:css': {
        // copy all css from /paths.tmpCss to paths.css
        files : [
          {
            expand: true,
            cwd: '<%= paths.tmpCss %>',
            dest: '<%= paths.css %>',
            src: ['*.css']
          }
        ]
      },

      'copy:js': {
        // copy all css from /paths.tmpJs to paths.js
        files : [
          {
            expand: true,
            cwd: '<%= paths.tmpJs %>',
            dest: '<%= paths.js %>',
            src: ['*.js']
          }
        ]
      },

      /*==========  AUTOPREFIXER - VENDOR PREFIXES  ==========*/
      'autoprefixer:dist': {
        // autoprefix all css in /paths.tmpCss to /paths.tmpCss (override files)
        files : [
          {
            expand : true,
            cwd    : '<%= paths.tmpCss %>/',
            src    : '*.css', // use {,*/}*.css for processing inside directories
            dest   : '<%= paths.tmpCss %>/'
          }
        ]
      },

      /*==========  BUILD - CSS  ==========*/
      'concat:css': {
        // concat all css in /paths.cssSource (and inside) to /paths.tmpCss
        src: '<%= paths.cssSource %>/**/*.css',
        dest: '<%= paths.tmpCss %>/main.css'
      },

      'cssmin:minify': {
        // minify all css in /paths.tmpCss -> to /paths.css/*.min.css
        files : [
          {
            expand: true,
            cwd: '<%= paths.tmpCss %>/',
            src: ['*.css', '!*.min.css'],
            dest: '<%= paths.css %>/',
            ext: '.min.css'
          }
        ]
      },

      /*==========  BUILD - LESS  ==========*/
      'less:development': {
        options: {
          modifyVars: {
            imgPath: '"<%= paths.publicImages %>"',
          },
          // Enforce the css output is compatible with Internet Explorer 8
          // wich limits data-uris to 32KB,
          ieCompat: true,
          sourceMap: true
        },
        files: {
          '<%= paths.tmpCss %>/main.css': '<%= paths.less %>/main.less'
        }
      },

      'less:production': {
        options: {
          modifyVars: {
            imgPath: '"<% paths.publicImages %>"',
          },
          ieCompat: true
        },
        files: {
          '<%= paths.tmpCss %>/main.css': '<%= paths.less %>/main.less'
        }
      },

      /*==========  BUILD - JS  ==========*/
      'concat:js': {
        // concat all js in /paths.jsSource (and inside) to /paths.tmpJs
        options: {
          separator: ';'
        },
        src: '<%= paths.jsSource %>/**/*.js',
        dest: '<%= paths.tmpJs %>/app.js'
      },

      'uglify:minify': {
        // minify all js in /paths.tmpJs -> to /paths.js/*.min.js
        files: [
          {
            expand: true,
            cwd: '<%= paths.tmpJs %>/',
            src: ['*.js', '!*.min.js'],
            dest: '<%= paths.js %>/',
            ext: '.min.js'
          }
        ]
      }
    }
  };
};
