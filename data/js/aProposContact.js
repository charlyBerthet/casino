$(function(){
	jsNav["aPropos"] = function(){
		
		
	};
	
	jsNav["leTemps"] = function(){
		
		var resizeDivGroupe = function(option){
			// On met la div a la bonne taille
			var SCREEN_WIDTH = (window.innerWidth);
			var SCREEN_HEIGHT = (window.innerHeight);
			var HEADER_HEIGHT = parseInt($("#headerData").css("height").split("px")[0]);
			var FOOTER_HEIGHT = parseInt($("#footerData").css("height").split("px")[0]);
			
			var height = (SCREEN_HEIGHT - (HEADER_HEIGHT+FOOTER_HEIGHT) - 60);
			height = (height > 350 ? height : 350 );
			var width = SCREEN_WIDTH - 50;
			
			$("#leGroupe").css({
				"width": width,
				"height": height
			});
			
			
			//width = (width < 1010 ? 1010 : width);
			$("#iFrameGroupe").css({
				"width": width,
				"height": height
			});
			
		};
		
		resizeDivGroupe();
		$(window).unbind("onresize");
		window.onresize = function(event) {
			resizeDivGroupe();
		};
	};
	
	
	if(document.URL.match(/propos/gi) != null)
		$("a[data-idjs='aPropos']").click();
});