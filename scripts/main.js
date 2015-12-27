(function($){

	var jWindow = $(window);
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
