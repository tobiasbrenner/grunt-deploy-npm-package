/*
 * grunt-deploy-npm-package
 * https://github.com/tobias.brenner/grunt-deploy-npm-package
 *
 * Copyright (c) 2016 Tobias Brenner
 * Licensed under the MIT license.
 */

'use strict';
var path = require('path');
module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('deploy_npm_package', 'Deploy package.json for development and production environment', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
		packageJsonRoot: ".",
		targets: [],
        punctuation: '.',
        separator: ', '
    }),
	packageJson = grunt.file.readJSON(path.join(options.packageJsonRoot, "package.json"));

	options.forEach(function(target){
		var packageJson = Object.create(options.packageJson),
		path = path.join(target.path, "package.json");
		packageJson.name = packageJson.name + "-" + target.suffix;
		
		if (!grunt.file.exists(target.path)) {
			grunt.file.mkdir(target.path);
		}
		
		grunt.file.write(path, packageJson);
        grunt.log.writeln('Created "' + path + '"');
	});
	
	// Print a success message.
	grunt.log.writeln('deploy_npm_package: done');
  });
};
