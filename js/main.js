$(document).ready(function() {
  $(this).bind('flatdoc:ready', function(e){
    var $element = e.target;
    console.log("flatdoc is ready");
    $("code").each(function(index) {
      lang = $(this).attr("class");
      if (lang)
        $(this).attr("data-language", lang.substr(5));
      console.log("p", lang);
    });
    $("blockquote>pre>code.lang-curl").each(function(index, value) {
      console.log(index, value);
      $(value).parent().parent().css({"float": "left", width: "510px", "margin-left": "20px", "margin-right": "20px", "color": "#333"});
      $(value).parent().css({"padding": "10px"});
    })
    Rainbow.extend('javascript', [
      {
        'name': 'datatype',
        'pattern': /\((number|string|object)\)/igm
      }
      ], true);
    Rainbow.extend('curl', [
      {
        'name': 'http-url',
        'pattern': /(https?:\/\/\S+)/igm
      }
      ], false);
    Rainbow.color();
  });
});