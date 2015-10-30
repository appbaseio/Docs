(function($){

	var jWindow = $(window);

	Docbase.run({
	  method: 'file',
	  map: {
	      file: 'map.json',
	      path: '/'
	  },
	  "file" : {
	  	'path': 'src'
	  },
	  github: {
	    user: 'appbaseio',
	    repo: 'Docs',
	    path: 'src',
	    branch: 'master'
	  },
	  indexType: 'html',
	  indexHtml: 'html/main.html',
	  editGithubBtn: true,
	  html5mode: false,
	  flatdocHtml: 'html/flatdoc.html',
	  angularAppName: 'docbaseApp'

	});

	jWindow.on('docbase:ready', function(){
		$("blockquote>pre:has(code.lang-curl)").each(function() {
		  $(this).parent().css({"float": "left",
		                         "width": "510px",
		                         "margin-left": "20px",
		                         "margin-right": "20px",
		                         "color": "#333"});
		  $(this).css({"padding": "10px"});
		});

		if(typeof(ga) === 'function'){
			ga('send', 'pageview',window.location.href);
		}
	});

})(window.jQuery);
