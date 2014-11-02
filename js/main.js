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
    Rainbow.extend('javascript', [
      {
        'name': 'datatype',
        'pattern': /\((number|string|object)\)/igm
      }
      ], true);
    Rainbow.color();
  });
});