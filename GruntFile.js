module.exports = function(grunt) {
	grunt.initConfig({
		docbase: {
			def: {
				options: {
					urlToAccess: "http://localhost:8080/",
					generatePath: "docs_html/",
					generateSearchIndex : true,
					baseUrl: "/",
					assets: ['bower_components', 'styles', 'scripts', 'images', 'CNAME', 'map.json'],
					checkLoadedSelector : '#navbar-collapse',
				}
			}
		},
		connect: {
			server: {
				options: {
					port: 9001,
					base: './',
					protocol: 'http'
				}
			}
		},
		'gh-pages': {
			def: {
				options: {
					base: 'docs_html',
					user: {
						name: 'Travis',
						email: 'mateusfreira@gmail.com'
					},
					repo: 'https://' + process.env.GH_TOKEN + '@github.com/appbaseio/Docs.git',
					message: 'publish gh-pages (auto)',
					silent: false,
				},
				src: ['**']				
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-docbase');
	grunt.loadNpmTasks('grunt-gh-pages');
	// Default task.
	grunt.registerTask('default', ['connect', 'docbase']);
	grunt.registerTask('publish', ['connect', 'docbase', 'gh-pages']);

};
