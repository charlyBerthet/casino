$(function(){
	jsNav["videoPalo"] = function(){
		
		var resizeVideoPalo= function(){
			// On met la div a la bonne taille
			var SCREEN_WIDTH = (window.innerWidth);
			var SCREEN_HEIGHT = (window.innerHeight);
			var HEADER_HEIGHT = parseInt($("#headerData").css("height").split("px")[0]);
			var FOOTER_HEIGHT = parseInt($("#footerData").css("height").split("px")[0]);
			
			var height = (SCREEN_HEIGHT - (HEADER_HEIGHT+FOOTER_HEIGHT) - 60);
			$("#divVideoPalo").css({
				"width":SCREEN_WIDTH - 50,
				"height": (height > 200 ? height : 200)
			});
		};
		
		resizeVideoPalo();
		$(window).unbind("onresize");
		window.onresize = function(event) {
			resizeVideoPalo();
		};
		
	};
	
	
	jsNav["sitePalo"] = function(){
		var resizeVideoPalo= function(){
			// On met la div a la bonne taille
			var SCREEN_WIDTH = (window.innerWidth);
			var SCREEN_HEIGHT = (window.innerHeight);
			var HEADER_HEIGHT = parseInt($("#headerData").css("height").split("px")[0]);
			var FOOTER_HEIGHT = parseInt($("#footerData").css("height").split("px")[0]);
			
			var height = (SCREEN_HEIGHT - (HEADER_HEIGHT+FOOTER_HEIGHT) - 60);
			var width = SCREEN_WIDTH - 50;
			$("#divSitePalo").css({
				"width":(width > 1000 ? width : 1000),
				"height": (height > 600 ? height : 600)
			});
		};
		
		resizeVideoPalo();
		$(window).unbind("onresize");
		window.onresize = function(event) {
			resizeVideoPalo();
		};
		
	};
	
	
	if(document.URL.match(/palo/gi) != null)
		$("a[data-idjs='videoPalo']").click();
});