module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      html: {
        files: ['src/html/*.html'],
        tasks: 'includeSource'
      },
      less: {
        files: ['src/**/*.less'],
        tasks: 'exec:compile_less'
      },
      includeNewSources: {
        files: ['src/javascript/lib/**/*.js', 'src/javascript/browser/**/*.js'],
        tasks: 'includeSource'
      },
      rebuildHeadless: {
        files: ['src/javascript/lib/**/*.js',
                'src/javascript/server/**/*.js'],
        tasks: 'concat'
      },
      includeNewSpecs: {
        files: ['spec/**/*.js'],
        tasks: 'includeSource:spec'
      },
      buildTemplates: {
        files: ['src/viewTemplates/**/*.html'],
        tasks: 'jst:compile'
      }
    },
    exec: {
      compile_less: './node_modules/.bin/lessc ./src/less/ordial.less ./src/css/ordial.css'
    },
    connect: {
      server: {
        options: {
          port: 8000
        }
      }
    },
    includeSource: {
      app: {
        files: {
          'index.html': 'src/html/index.template.html'
        }
      },
      spec: {
        files: {
          'SpecRunner.html': 'src/html/SpecRunner.template.html'
        }
      }
    },
    jst: {
      compile: {
        files: {
          "templates.js": ["src/viewTemplates/**/*.html"]
        }
      }
    },
    concat: {
        options: {
          separator: '\n\n/*********/\n\n',
        },
        headless: {
          src: [
            'src/javascript/server/shims.js',
            'src/javascript/lib/**/*.js',
            'src/javascript/server/**/*.js'],
          dest: 'headless.js',
        },
        vendorize: {
          src: [
            "node_modules/underscore/underscore.js",
            "node_modules/jquery/dist/jquery.js",
            "node_modules/backbone/backbone.js",
            "node_modules/snapsvg/dist/snap.svg.js",
            "node_modules/pixi.js/bin/pixi.js"
          ],
          dest: 'vendor/dependencies.js'
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-include-source');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.registerTask('default', ['includeSource', 'exec:compile_less', 'jst:compile', 'concat', 'connect:server', 'watch']);
};
