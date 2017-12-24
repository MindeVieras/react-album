//Gruntfile
'use strict';

module.exports = function(grunt) {
    //Initializing the configuration object
    grunt.initConfig({
        exec: {
            webpack_build: {
              command: 'npm run build'
            }
        },
        replace: {
            config: {
                src: './src/js/bundle.min.js',
                overwrite: true,
                replacements: [{
                    from: 'http://localhost:3000',
                    to: ''
                }]
            }
        },
        aws: grunt.file.readJSON('./aws-keys.json'),
        aws_s3: {
            options: {
                accessKeyId: '<%= aws.AWSAccessKeyId %>',
                secretAccessKey: '<%= aws.AWSSecretKey %>',
                region: 'eu-west-1',
                uploadConcurrency: 5,
                downloadConcurrency: 5
            },
            prod: {
                options: {
                    bucket: 'app.mindelis.com',
                    access: 'public-read'
                    // params: {
                    //     ContentEncoding: 'gzip'
                    // }
                },
                files: [{
                    expand: true,
                    cwd: './src/js/',
                    src: ['bundle.min.js'],
                    dest: '/',
                    params: {
                        CacheControl: 'max-age=2629746'
                    }
                }]
            },
        }
    });

    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-aws-s3');
    
    // Task definition
    grunt.registerTask('deploy', [
        'exec:webpack_build',
        'replace:config',
        'aws_s3'
    ]);

};