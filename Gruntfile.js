module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      html: {
        files:['src/html/*.html'],
        tasks: 'includeSource'
      },
      less: {
        files: ['src/**/*.less'],
        tasks: 'exec:compile_less'
      },
      includeNewSources: {
        files: ['src/**/*.js'],
        tasks: 'includeSource'
      },
      includeNewSpecs: {
        files: ['spec/**/*.js'],
        tasks: 'includeSource:spec'
      },
      buildTemplates: {
        files: ['src/templates/**/*.html'],
        tasks: 'jst:compile'
      }
    },
    exec: {
      compile_less: 'lessc ./src/less/ordial.less ./src/css/ordial.css'
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
          "templates.js": ["src/templates/**/*.html"]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-include-source');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.registerTask('default', ['connect:server', 'watch']);
};
