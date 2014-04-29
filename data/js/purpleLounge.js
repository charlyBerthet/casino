$(function(){
	jsNav["vtourPurple"] = function(){
		
		var resizeVTourPurple= function(){
			// On met la div a la bonne taille
			var SCREEN_WIDTH = (window.innerWidth);
			var SCREEN_HEIGHT = (window.innerHeight);
			var HEADER_HEIGHT = parseInt($("#headerData").css("height").split("px")[0]);
			var FOOTER_HEIGHT = parseInt($("#footerData").css("height").split("px")[0]);
			
			var height = (SCREEN_HEIGHT - (HEADER_HEIGHT+FOOTER_HEIGHT) - 60);
			$("#divVTourPurple").css({
				"width":SCREEN_WIDTH - 50,
				"height": (height > 200 ? height : 200)
			});
		};
		
		resizeVTourPurple();
		$(window).unbind("onresize");
		window.onresize = function(event) {
			resizeVTourPurple();
		};
		
		
		// SI ONLINE alors recupere sur le site
		///if(navigator.onLine)
			
	};
	
	
	
	
	
	jsNav["photosPurple"] = function(){
		
		// Resize
		var resizeVideoPurple= function(){
			// On met la div a la bonne taille
			var SCREEN_WIDTH = (window.innerWidth);
			var SCREEN_HEIGHT = (window.innerHeight);
			var HEADER_HEIGHT = parseInt($("#headerData").css("height").split("px")[0]);
			var FOOTER_HEIGHT = parseInt($("#footerData").css("height").split("px")[0]);
			
			var height = (SCREEN_HEIGHT - (HEADER_HEIGHT+FOOTER_HEIGHT) - 60);
			$("#divPhotosPurple").css({
				"width":SCREEN_WIDTH - 50,
				"height": (height > 200 ? height : 200)
			});
		};
		
		resizeVideoPurple();
		$(window).unbind("onresize");
		window.onresize = function(event) {
			resizeVideoPurple();
		};
		
		
		
		var puViewer = new GalerieViewer({
			"idShow":"divPhotosPurple",
			"path":"data/img/purpleLounge",
			"format":"jpg",
			"length":62,
			"width":955,
			"height":504
		});
		
	};
	
	
	
	jsNav["eventPurple"] = function(){
		
		
		
		
		
	};
	
	
	jsNav["videoPurple"] = function(){
		var resizeVideoPurple= function(){
			// On met la div a la bonne taille
			var SCREEN_WIDTH = (window.innerWidth);
			var SCREEN_HEIGHT = (window.innerHeight);
			var HEADER_HEIGHT = parseInt($("#headerData").css("height").split("px")[0]);
			var FOOTER_HEIGHT = parseInt($("#footerData").css("height").split("px")[0]);
			
			var height = (SCREEN_HEIGHT - (HEADER_HEIGHT+FOOTER_HEIGHT) - 60);
			$("#divVideoPurple").css({
				"width":SCREEN_WIDTH - 50,
				"height": (height > 200 ? height : 200)
			});
		};
		
		resizeVideoPurple();
		$(window).unbind("onresize");
		window.onresize = function(event) {
			resizeVideoPurple();
		};
	};
	
	if(document.URL.match(/purple/gi) != null)
		$("a[data-idjs='vtourPurple']").click();
});