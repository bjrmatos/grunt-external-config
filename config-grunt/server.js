'use strict';

module.exports = function(grunt, options) {
  return {
    tasks: {
      /*==========  JSHINT  ==========*/
      jshint: {
        all : {
          src: [
            'Gruntfile.js',
            '<%= paths.jsSource %>/{,*/}*.js',
            '!<%= paths.js %>/lib/*'
          ]
        }
        //   'test/spec/{,*/}*.js'
      },

      /*==========  LAUNCH - TASKS  ==========*/
      wait: {
        // wait some seconds before start another task
        options: {
          delay: 1000
        },
        pause: {
          options: {
            before: function(options) {
              console.log('pausing %dms before launching page', options.delay);
            },
            after: function() {
              console.log('pause end, heading to page (using default browser)');
            }
          }
        }
      },

      open: {
        // open default browser in the url specified
        server: {
          path: options.domain
        }
      },

      /*==========  WATCH - TASKS  ==========*/
      // For LIVERELOAD use the browser extension:
      // https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
      'watch:jshint': {
        // watch for newer or modified js files in /paths.jsSource for lint
        // and reload browser
        files: [
          '<%= paths.jsSource %>/{,*/}*.js'
        ],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: true
        }
      },

      'watch:less': {
        // watch for newer or modified less files in /paths.less
        // and compile, autoprefix and copy
        files: ['<%= paths.less %>/**/*.less'],
        tasks: ['less:development', 'autoprefixer', 'copy:css'],
        options: {
          livereload: true
        }
      },

      'watch:reboot': {
        files: ['<%= paths.tmp %>/<%= rebootedFile %>'],
        options: {
          livereload: true
        }
      },

      'watch:livereload': {
        // watch for changes in views, js (client),images
        // for reload browser
        files: [
          '<%= paths.views %>/**/*',
          '<%= paths.jsSource %>/{,*/}*.js',
          '<%= paths.img %>/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
        ],
        options: {
          livereload: true
        }
      },

      /*==========  NODEMON  ==========*/
      // VER SI SIENTO QUE ES MEJOR SEPARAR NODEMON Y NODEINSPECTOR
      // FUERA DE GRUNT, SI HAGO ESO DEBO IMPLEMENTAR LA FORMA
      // QUE AL MOMENTO DE QUE NODEMON REINICIE EL SERVER MI NAVEGADOR
      // SE REFRESQUE
      'nodemon:dev': {
        script: '<%= pkg.main %>',
        options: {
          // args: ['dev'],
          nodeArgs: ['--debug'],
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });

            // refreshes browser when server reboots
            nodemon.on('restart', function () {
              setTimeout(function() {
                require('fs').writeFileSync(options.rebootedFile, 'rebooted');
              }, 1000);
            });
          },
          // env: {
          //   PORT: ''
          // },
          cwd: __dirname,
          ignore: [
            'node_modules/**',
            'public/js/**',
            'Gruntfile.js',
            'config-grunt/**'
          ],
          ext: 'js',
          delay: 1000,
          legacyWatch: true
        }
      },

      /*==========  NODEINSPECTOR  ==========*/
      'node-inspector:dev': {
        //launch the tasks with default options
      },

      /*==========  CONCURRENT - TASKS  ==========*/
      'concurrent:all': {
        tasks: ['nodemon', 'node-inspector', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  };
};
