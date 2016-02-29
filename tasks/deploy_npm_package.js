/*
 * grunt-deploy-npm-package
 * https://github.com/tobias.brenner/grunt-deploy-npm-package
 *
 * Copyright (c) 2016 Tobias Brenner
 * Licensed under the MIT license.
 */

'use strict';
var path = require('path');
module.exports = function (grunt) {
    grunt.registerMultiTask('deploy_npm_package', 'Deploy package.json for development and production environment', function () {
        var options = {
                packageJsonRoot: this.data.packageJsonRoot || ".",
                targets: this.data.targets || []
            },
            packageJson = grunt.file.readJSON("package.json");

        options.targets.forEach(function (target) {
            var packageJsonContent = Object.create(packageJson),
                targetPath = path.join(target.path, "package.json");
            packageJsonContent.name = packageJsonContent.name + "-" + target.suffix;

            if (!grunt.file.exists(target.path)) {
                grunt.file.mkdir(target.path);
            }

            grunt.file.write(targetPath, packageJsonContent);
            grunt.log.writeln('Created "' + targetPath + '"');
        });

        // Print a success message.
        grunt.log.writeln('deploy_npm_package: done');
    });
};
