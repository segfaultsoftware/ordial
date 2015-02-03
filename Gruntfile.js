module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      less: {
        files: ['src/**/*.less'],
        tasks: 'exec:compile_less'
      }
    },
    exec: {
      compile_less: 'lessc ./src/less/ordial.less ./src/css/ordial.css'
    }
  });

  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['watch']);
};