'use strict';

module.exports = function(grunt, options) {
  return {
    tasks: {
      pkg: grunt.file.readJSON('package.json'),

      autoprefixer: {
        options: {
          // List of options https://github.com/ai/autoprefixer#browsers
          browsers: [
            '> 1%', 'last 2 versions', 'Firefox ESR',
            'Opera 12.1', 'ie 8', 'ie 9', 'Android >= 2', 'ios > 3'
          ]
        }
      },

      jshint: {
        options : {
          jshintrc : '.jshintrc'
          // reporter : require('jshint-stylish')
        },
      },

      cssmin: {
        options: {
          banner: '/*CSS-MIN BANNER ' +
          '<%= grunt.template.today("yyyy-mm-dd") %>*/'
        }
      },

      uglify: {
        options: {
          banner: '/*! JS-MIN BANNER <%= grunt.template.today("yyyy-mm-dd") %> */',
          mangle: false, // change variables name (true or false)
          compress: {
            'drop_console': false // Drop console.* functions calls
          }
        }
      }
    }
  };
};
