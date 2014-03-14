module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {   
            dist: {
                src: [
                    'js/jquery-1.11.0.min.js',
                    'js/jquery.cycle2.min.js',
                    'js/*.js'
                ],
                dest: 'js/build/production.js',
                nonull: true,
            }
        },

        uglify: {
            options: {
              banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("2014-03-14") %> */'
            },
            build: {
                src: 'js/build/production.js',
                dest: 'js/build/production.min.js'
            }
        },

        compass: {
            dist: {
                options: {
                httpPath:"../",
                sassDir: 'sass',
                cssDir: 'css',
                // environment: 'production'
                }
            },
        },

        cssmin: {
          add_banner: {
            options: {
              banner: '/* My minified css file */'
            },
            files: {
              'css/production.min.css': [
                'css/bootstrap.css',
                'css/custom.css',
                'css/*.css',
                '!css/production.min.css'
              ]
            }
          }
        },

        watch: {
            scripts: {
                files: ['js/*.js', 'js/libs/*.js'],
                tasks: ['concat', 'uglify'],
            },
           csstosass: {
                files: ['sass/*.sass','sass/*.scss'],
                tasks: ['compass'],
            },
            css: {
                files: ['css/*.css'],
                tasks: ['cssmin'],
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['concat','uglify','compass','cssmin','watch']);
};