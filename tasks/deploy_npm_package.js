/*
 * grunt-deploy-npm-package
 * https://github.com/tobias.brenner/grunt-deploy-npm-package
 *
 * Copyright (c) 2016 Tobias Brenner
 * Licensed under the MIT license.
 */

'use strict';
var path = require('path'),
	_ = require('lodash');
module.exports = function (grunt) {
    grunt.registerMultiTask('deploy_npm_package', 'Deploy package.json for development and production environment', function () {
        var options = {
                packageJsonRoot: this.data.packageJsonRoot || ".",
                targets: this.data.targets || []
            },
            packageJson = grunt.file.readJSON("package.json");

        options.targets.forEach(function (target) {
            var packageJsonProjectName = _.isEmpty(target.suffix)? packageJson.name : packageJson.name + "-" + target.suffix,
                targetPath = path.join(target.path, "package.json"),
				packageJsonContent = _.cloneDeep(packageJson),
				overrides = _.get(target, "overrides", {});

			_.set(packageJsonContent, "name", packageJsonProjectName);
			
			_.each(_.keys(overrides), function(key){
				_.set(packageJsonContent, key, overrides[key]);
			});

            if (!grunt.file.exists(target.path)) {
                grunt.file.mkdir(target.path);
            }

            grunt.file.write(targetPath, JSON.stringify(packageJsonContent,null,2));
            grunt.log.writeln('Created "' + targetPath + '"');
        });

        // Print a success message.
        grunt.log.writeln('deploy_npm_package: done');
    });
};