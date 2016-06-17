module.exports = function (grunt) { /*require('jit-grunt')(grunt);*/
    var globalConfig = {
        images: 'images', /* папка для картинок сайта */
        styles: 'css', /* папка для готовый файлов css стилей */
        fonts: 'fonts', /* папка для шрифтов */
        scripts: 'js', /* папка для готовых скриптов js */
        src: 'src', /* папка с исходными кодами js, less , etc. */
        distr: 'distr.tmp', /* папка для формирования дистрибутива. */
        bower_path: 'bower_components' /* папка где хранятся библиотеки jquery, bootstrap, SyntaxHighlighter, etc. */
    };
    /* Project configuration.*/
    grunt.initConfig({
        globalConfig: globalConfig,
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            distr: ['<%= globalConfig.distr %>/*'],
            distr_js: ['<%= globalConfig.distr %>/<%= globalConfig.scripts %>/*'],
            distr_css: ['<%= globalConfig.distr %>/<%= globalConfig.styles %>/*'],
            distr_fonts: ['<%= globalConfig.distr %>/<%= globalConfig.fonts %>/*'],
            js: ['<%= globalConfig.scripts %>/*'],
            css: ['<%= globalConfig.styles %>/*'],
            fonts: ['<%= globalConfig.fonts %>/*']
        },
        less: {
            development: {
                options: {
                    compress: false,
                    yuicompress: false,
                    optimization: 2
                },
                files: {
                    "css/school.css": "less.src/school.less"
                }
            }
        },
        image_resize: {
            resize: {
                options: {
                    width: 200,
                    //height: 100,
                    overwrite: true
                },
                src: 'images.src/*.png',
                dest: 'images/'
            }
        },

        responsive_images: {
            myTask: {
                options: {
                    engine: 'gm',
                    sizes: [{
                        name: 'nrm',
                        width: 180,
                        suffix: "",
                        //height: 240
                    }]
                },
                files: [{
                    expand: true,
                    src: ['**.{jpg,gif,png}'],
                    cwd: 'images.src/',
                    dest: 'images/'
                }]
            }
        },

        uglify: {
            options: {
                mangle: false,
                compress : false,
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'js.src/school.js',
                dest: 'js/school.min.js'
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= globalConfig.scripts %>',
                    //src: ['*.js', '!*.min.js'],
                    src: ['school.js', '!*.min.js'],
                    dest: '<%= globalConfig.distr %>/<%= globalConfig.scripts %>'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: '<%= globalConfig.scripts %>/',
                    src: '*',
                    dest: '<%= globalConfig.distr %>/<%= globalConfig.scripts %>/',
                    filter: 'isFile'
                },
                    {
                        expand: true,
                        flatten: true,
                        cwd: '<%= globalConfig.styles %>/',
                        src: '*',
                        dest: '<%= globalConfig.distr %>/<%= globalConfig.styles %>/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        flatten: true,
                        cwd: '<%= globalConfig.fonts %>/',
                        src: '*',
                        dest: '<%= globalConfig.distr %>/<%= globalConfig.fonts %>/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        flatten: true,
                        cwd: '<%= globalConfig.images %>/',
                        src: '*',
                        dest: '<%= globalConfig.distr %>/<%= globalConfig.images %>/',
                        filter: 'isFile'
                    }
                ]
            },
            main: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: '<%= globalConfig.bower_path %>/jquery/dist/jquery.<%= globalConfig.minified %>js',
                    dest: '<%= globalConfig.scripts %>/',
                    filter: 'isFile'
                }, /* { expand : true, flatten : true, src : '<%= globalConfig.bower_path %>/html5shiv/dist/html5shiv.min.js', dest : '<%= globalConfig.scripts %>/', filter : 'isFile' }, */ {
                    expand: true,
                    flatten: true,
                    src: '<%= globalConfig.bower_path %>/bootstrap/dist/js/bootstrap.<%= globalConfig.minified %>js',
                    dest: '<%= globalConfig.scripts %>/',
                    filter: 'isFile'
                }, {
                    expand: true,
                    flatten: true,
                    src: '<%= globalConfig.bower_path %>/jQuery-viewport-checker/dist/*.js',
                    dest: '<%= globalConfig.scripts %>/',
                    filter: 'isFile'
                }, {
                    expand: true,
                    flatten: true,
                    src: '<%= globalConfig.bower_path %>/animate.css/*.css',
                    dest: '<%= globalConfig.styles %>/',
                    filter: 'isFile'
                }, {
                    expand: true,
                    flatten: true,
                    src: 'js.src/*.js',
                    dest: 'js/',
                    filter: 'isFile'
                }, /* { expand : true, flatten : true, src : '<%= globalConfig.bower_path %>/html5shiv/dist/html5shiv.min.js', dest : '<%= globalConfig.scripts %>/', filter : 'isFile' }, */ {
                    expand: true,
                    flatten: true,
                    src: 'css.src/*.css',
                    dest: 'css/',
                    filter: 'isFile'
                }, {
                    expand: true,
                    flatten: true,
                    src: 'images.src/*',
                    dest: 'images/',
                    filter: 'isFile'
                }, {
                    expand: true,
                    flatten: true,
                    src: '<%= globalConfig.bower_path %>/bootstrap/dist/css/bootstrap.<%= globalConfig.minified %>css',
                    dest: '<%= globalConfig.styles %>/',
                    filter: 'isFile'
                }, {
                    expand: true,
                    flatten: true,
                    src: '<%= globalConfig.bower_path %>/bootstrap/dist/fonts/*',
                    dest: '<%= globalConfig.fonts %>/',
                    filter: 'isFile'
                }, {
                    expand: true,
                    flatten: true,
                    src: '<%= globalConfig.bower_path %>/font-awesome/css/*.<%= globalConfig.minified %>css',
                    dest: '<%= globalConfig.styles %>/',
                    filter: 'isFile'
                }, {
                    expand: true,
                    flatten: true,
                    src: '<%= globalConfig.bower_path %>/font-awesome/fonts/*',
                    dest: '<%= globalConfig.fonts %>/',
                    filter: 'isFile'
                }]
            }
        }, /* less : { development : { options : {
         compress : false,
         yuicompress : false,
         optimization : 2
         },
         files : {
         "css/algo.css" : "less/algo.less",
         "css/main.css" : "less/main.less"

         // destination
         // file and
         // source file
         }
         }
         },
         */
        /*
         uglify : {
         options : {
         banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */
        /* \n'
         },
         build : {
         src : 'src/<%= pkg.name %>.js',
         dest : 'build/<%= pkg.name %>.min.js'
         }
         },
         */
        /*
         'ftp_upload': {
         build: {
         auth: {
         host: 'school.auditbezopasnosti.ru',
         port: 21,
         authKey: 'school.auditbezopasnosti.ru'
         },
         src: ['<%= globalConfig.wwwroot %>/**/
        /* *'],
         dest: '/www/school.auditbezopasnosti.ru',
         exclusions: []
         }
         },
         'ftp-deploy': {
         build: {
         auth: {
         host: 'school.auditbezopasnosti.ru',
         port: 21,
         authKey: 'school.auditbezopasnosti.ru'
         },
         src: '<%= globalConfig.wwwroot %>',
         dest: '/www/school.auditbezopasnosti.ru',
         exclusions: [],
         forceVerbose: false
         }
         }
         */
        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= globalConfig.styles %>',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= globalConfig.distr %>/<%= globalConfig.styles %>'
                }]
            }
        },
        htmlmin: {                                     // Task
            dist: {                                      // Target
                options: {                                 // Target options
                    removeComments: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                    collapseWhitespace: true
                },
                files: {                                   // Dictionary of files
                    '<%= globalConfig.distr %>/index.html': 'index.html' // 'destination': 'source'
                }
            },
            dev: {                                       // Another target
                files: {
                    'dist/index.html': 'src/index.html',
                    'dist/contact.html': 'src/contact.html'
                }
            }
        },
        ftp_push: {
            your_target: {
                options: {
                    //authKey: "serverA",
                    username: "ftpschool",
                    password: "Og0Ij47E54W3I57h",
                    host: "school.auditbezopasnosti.ru",
                    dest: "/",
                    port: 21
                },
                files: [
                    {
                        expand: true,
                        //cwd: '.',
                        cwd: '<%= globalConfig.distr %>/',
                        src: [
                            "index.html",
                            "css/**",
                            "fonts/**",
                            "images/**",
                            "js/**"
                        ]
                    }
                ]
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    /*
     grunt.loadNpmTasks('grunt-bower-concat');
     grunt.loadNpmTasks('grunt-contrib-clean');
     grunt.loadNpmTasks('grunt-ftp-upload');
     grunt.loadNpmTasks('grunt-ftp-deploy');
     */
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    //grunt.loadNpmTasks('grunt-image-resize');
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-ftp-push');

    // Default task(s).
    // grunt.registerTask('default', [ 'uglify','less', 'watch' ]);
    // grunt.registerTask('default', [ 'uglify','less', 'bower_concat' ]);
    grunt.registerTask('default', ['clean', 'less', 'copy:main', 'uglify:build', 'responsive_images']);
    grunt.registerTask('imagetest', ['responsive_images']);
    grunt.registerTask('prepareserverdeploy', ['default', 'copy:dist', 'htmlmin:dist', 'cssmin:dist', 'uglify:dist']);
    grunt.registerTask('serverdeploy', ['default', 'prepareserverdeploy', 'ftp_push']);

    // 11

};
