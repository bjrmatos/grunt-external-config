'use strict';

module.exports = function(grunt, options) {
  return {
    tasks: {

      /*==========  JSHINT  ==========*/
      'jshint:all': {
        src: [
          'Gruntfile.js',
          '<%= paths.jsSource %>/{,*/}*.js',
          '!<%= paths.js %>/lib/*'
        ]
        //   'test/spec/{,*/}*.js'
      },

      /*==========  NOTIFY  ==========*/
      // See https://github.com/dylang/grunt-notify/
      // for Notification Systems for every platform
      'notify:open': {
        options: {
          title: 'Open page',
          message: 'Open browser in: <%= domain %>'
        }
      }

    }
  };
};
