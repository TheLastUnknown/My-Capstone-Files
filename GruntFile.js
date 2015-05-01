/**
 * Created by Tim on 6/13/14.
 */

module.exports = function(grunt){
    // Configuration here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                strict: false
            },
            all: ['GruntFile.js', 'assets/js/<%= pkg.name %>.js']
        },
        jasmine: {
            pivotal: {
                src: 'assets/js/*.js',
                    options: {
                    specs: 'spec/*Spec.js',
                        helpers: 'spec/*Helper.js'
                }
            }
        },
        uglify: {
            all: {
                files: {
                'js/<%= pkg.name %>.min.js': 'assets/js/<%= pkg.name %>.js'
                }
            }
        },
        smushit: {
            path: {
                src: 'assets/img/'
            }
        }
    });

    // Plugins here
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-smushit');

    // Tasks here
    grunt.registerTask('default', ['jshint', 'jasmine', 'uglify', 'smushit']);
};
