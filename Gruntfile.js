module.exports = function(grunt){

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['build'],
    requirejs: {
      compile: {
        options: {
          baseUrl: "src",
          mainConfigFile: "src/main.js",
          name: "main",
          out: "build/hawkthorne.js"
        }
      }
    },
    compress: {
      main: {
        options: {
          archive: 'build/hawkthornejs.zip'
        },
        files: [
        {expand: true, cwd: 'build/', src: ['hawkthorne.js'], dest: '.'},
        {expand: true, cwd: 'assets/', src: ['**'], dest: 'assets/'},
        ]
      }
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['clean', 'generate-fonts', 'requirejs', 'compress']);

};
