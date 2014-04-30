$(function(){
	jsNav["vtourTables"] = function(){
		
		var resizeVTour= function(){
			// On met la div a la bonne taille
			var SCREEN_WIDTH = (window.innerWidth);
			var SCREEN_HEIGHT = (window.innerHeight);
			var HEADER_HEIGHT = parseInt($("#headerData").css("height").split("px")[0]);
			var FOOTER_HEIGHT = parseInt($("#footerData").css("height").split("px")[0]);
			
			var height = (SCREEN_HEIGHT - (HEADER_HEIGHT+FOOTER_HEIGHT) - 60);
			$("#vTourTables").css({
				"width":SCREEN_WIDTH - 50,
				"height": (height > 200 ? height : 200)
			});
		};
		
		resizeVTour();
		$(window).unbind("onresize");
		window.onresize = function(event) {
			resizeVTour();
		};
		
		
			
	};
	
	
	
	if(document.URL.match(/tables/gi) != null)
		$("a[data-idjs='vtourTables']").click();
});