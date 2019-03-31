var path = require('path');
module.exports = function (grunt) {


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      // html: {
      //   files: ['src/html/*.html'],
      //   tasks: 'includeSource'
      // },
      less: {
        files: ['src/**/*.less'],
        tasks: 'exec:compile_less'
      },
      // includeNewSources: {
      //   files: ['src/javascript/lib/**/*.js', 'src/javascript/browser/**/*.js'],
      //   tasks: 'includeSource'
      // },
      // rebuildHeadless: {
      //   files: ['src/javascript/lib/**/*.js',
      //           'src/javascript/server/**/*.js'],
      //   tasks: 'concat'
      // },
      // includeNewSpecs: {
      //   files: ['spec/**/*.js'],
      //   tasks: ['includeSource:spec']
      // },
      buildTemplates: {
        files: ['src/viewTemplates/**/*.html'],
        tasks: 'jst:compile'
      },
      express: {
        files: ['headless.js'],
        tasks: ['express:dev'],
        options: {
          spawn: false
        }
      }
    },
    exec: {
      compile_less: './node_modules/.bin/lessc ./src/less/ordial.less ./src/css/ordial.css'
    },
    express: {
      dev: {
        options: {
          script: 'headless.js'
        }
      }
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
          'public/compiled/index.html': 'src/html/index.template.html'
        }
      },
      spec: {
        files: {
          'public/compiled/SpecRunner.html': 'src/html/SpecRunner.template.html'
        }
      }
    },
    jst: {
      compile: {
        files: {
          'public/compiled/templates.js': ["src/viewTemplates/**/*.html"]
        }
      }
    },
    copy: {
      spec: {
        files: [
          { expand: true, src: ['spec/**'], dest: 'public/compiled/' }
        ]
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
        dest: 'headless.js'
      },
      vendorize: {
        src: [
          "node_modules/underscore/underscore.js",
          "node_modules/jquery/dist/jquery.js",
          "node_modules/backbone/backbone.js",
          "node_modules/snapsvg/dist/snap.svg.js",
          "node_modules/pixi.js/dist/pixi.js",

          //TODO i don't like this being in a prod vendorize
          // "node_modules/jasmine-jquery/lib/jasmine-jquery.js"
        ],
        dest: 'vendor/dependencies.js'
      }
    },
    createEntrypoint: {
      specs: {
        options: {
          beforeText: "require('../spec/SpecHelper');"
        },
        src: ["spec/**/*.js"],
        dest: "compiled/specEntrypoint.js"
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-include-source');

  grunt.registerMultiTask('createEntrypoint', 'creates an entrypoint for all jasmine tests to get compiled by webpack', function () {
    var options = this.options({
      encoding: grunt.file.defaultEncoding,
      // processContent/processContentExclude deprecated renamed to process/noProcess
      processContent: false,
      processContentExclude: [],
      timestamp: false,
      mode: false,
      beforeText: "",
      afterText: ""
    });

    this.files.forEach(function (srcDestPair) {
      var workingDir = ".";

      var dest = path.join(workingDir, srcDestPair.dest);
      var sources = srcDestPair.src;
      var content = sources.map(function (sourcePath) {
        console.log('srcDestPair.dest', dest)

        var relativePath = path.relative(path.dirname(dest), path.join(workingDir, sourcePath));
        console.log('relativePath', relativePath)
        return "require('" + relativePath + "');\n"
      }).join("");

      grunt.file.write(srcDestPair.dest, options.beforeText + "\n\n" + content + "\n"  + options.afterText);
    });
  });


  grunt.registerTask('default', ['createEntrypoint:specs', 'includeSource', 'exec:compile_less', 'jst:compile', 'express:dev', 'watch']);
};
