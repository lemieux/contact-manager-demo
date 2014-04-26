module.exports = function(grunt) {
    'use strict';

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    RegExp.quote = function(string) {
        return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
    };

    var fs = require('fs');
    var path = require('path');

    // Project configuration.
    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: ['_site/js']
        },

        jshint: {
            options: {
                jshintrc: 'js/.jshintrc'
            },
            src: {
                src: [
                'js/**/*.js',
                '!js/libs/**/*.js'
                ]
            },
            test: {
                src: 'js/tests/unit/**/*.js'
            }
        },

        jscs: {
            options: {
                config: 'js/.jscsrc'
            },
            src: {
                src: '<%= jshint.src.src %>'
            },
            test: {
                src: '<%= jshint.test.src %>'
            }
        },

        connect: {
            server: {
                options: {
                    port: 8080,
                    base: '_site'
                }
            }
        },

        watch: {
            options: {
                livereload: true,
            },

            js: {
                files: [
                    '<%= jshint.src.src %>',
                    'js/templates/**/*.hbs'
                ],
                tasks: ['jshint:src', 'dist']
            },

            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test']
            },

            grunt: {
                files: [
                    'Gruntfile.js'
                ],
                tasks: ['dist']
            }
        },

        requirejs: {
            minified: {
                options: {
                    almond: true,
                    baseUrl: '.',
                    include: ['js/main'],
                    mainConfigFile: 'js/config.js',
                    name: 'bower_components/almond/almond',
                    out: '_site/js/<%= pkg.name %>.min.js',
                    optimize: 'uglify2',

                    generateSourceMaps: true,
                    preserveLicenseComments: false,
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt, {
        scope: 'devDependencies'
    });
    require('time-grunt')(grunt);

    grunt.registerTask('dist-js', ['requirejs:minified']);

    grunt.registerTask('dist', ['clean', 'dist-js']);

    grunt.registerTask('default', ['test', 'dist']);

    grunt.registerTask('dev', ['connect', 'watch']);
};