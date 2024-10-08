module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        copy: {
            build: {
                files: [{
                        expand: true,
                        cwd: "./public",
                        src: ["**"],
                        dest: "./build/public"
                    },
                ]
            }
        },
        ts: {
            app: {
                files: [{
                    src: ["src/\*\*/\*.ts", "!src/.baseDir.ts"],
                    dest: "./build"
                }],
                options: {
                    experimentalDecorators: true,
                    module: "commonjs",
                    target: "es6",
                    removeComments:false,
                    sourceMap:true
                }
            },
        },
        watch: {
            ts: {
                files: ["src/\*\*/\*.ts"],
                tasks: ["ts"]
            },
            // views: {
            //     files: ["views/**/*.pug"],
            //     tasks: ["copy"]
            // }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-ts");
    grunt.registerTask("default", [
        "copy",
        "ts"
    ]);

};