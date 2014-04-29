$(function(){
	jsNav["vtourRestau"] = function(){
		
		var resizeVTour= function(){
			// On met la div a la bonne taille
			var SCREEN_WIDTH = (window.innerWidth);
			var SCREEN_HEIGHT = (window.innerHeight);
			var HEADER_HEIGHT = parseInt($("#headerData").css("height").split("px")[0]);
			var FOOTER_HEIGHT = parseInt($("#footerData").css("height").split("px")[0]);
			
			var height = (SCREEN_HEIGHT - (HEADER_HEIGHT+FOOTER_HEIGHT) - 60);
			$("#divVTourRestau").css({
				"width":SCREEN_WIDTH - 50,
				"height": (height > 200 ? height : 200)
			});
		};
		
		resizeVTour();
		$(window).unbind("onresize");
		window.onresize = function(event) {
			resizeVTour();
		};
		
		
		// SI ONLINE alors recupere sur le site
		///if(navigator.onLine)
			
	};
	
	
	
	jsNav["carte"] = function(){
		
		var resizeCarte= function(){
			// On met la div a la bonne taille
			var SCREEN_WIDTH = (window.innerWidth);
			var SCREEN_HEIGHT = (window.innerHeight);
			var HEADER_HEIGHT = parseInt($("#headerData").css("height").split("px")[0]);
			var FOOTER_HEIGHT = parseInt($("#footerData").css("height").split("px")[0]);
			
			var height = (SCREEN_HEIGHT - (HEADER_HEIGHT+FOOTER_HEIGHT) - 60);
			$("#divCarte").css({
				"width":SCREEN_WIDTH - 50,
				"height": (height > 200 ? height : 200)
			});
		};
		
		
		
		$(function(){
			$('.pdfview').each (function(i) {
				$(this).replaceWith(/*'<h2><a href="'+$(this).attr('href')+'">'+$(this).text()+'</a></h2>'+*/

						'<iframe id="iframePdfCarte" src="http://docs.google.com/viewer?url='+$(this).attr('href')+'&#038;embedded=true" width="100%" height="100%" style="border: none;"></iframe>');
				
			});

		});

		resizeCarte();
		$(window).unbind("onresize");
		window.onresize = function(event) {
			resizeCarte();
		};
		
	};
	
	
	if(document.URL.match(/restaurant/gi) != null)
		$("a[data-idjs='vtourRestau']").click();
});