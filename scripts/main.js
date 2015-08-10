(function($){

	var jWindow = $(window);

	Docbase.run({
	  method: 'file',
	  path: 'src',
	  map: {
	      file: 'map.json',
	      path: '/'
	  },
	  file: {
	      src: 'map.json',
	      path: 'src'
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
