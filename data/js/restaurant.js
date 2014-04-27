$(function(){
	jsNav["vtour"] = function(){
		
		var resizeVTour= function(){
			// On met la div a la bonne taille
			var SCREEN_WIDTH = (window.innerWidth);
			var SCREEN_HEIGHT = (window.innerHeight);
			var HEADER_HEIGHT = parseInt($("#headerData").css("height").split("px")[0]);
			var FOOTER_HEIGHT = parseInt($("#footerData").css("height").split("px")[0]);
			
			var height = (SCREEN_HEIGHT - (HEADER_HEIGHT+FOOTER_HEIGHT) - 100);
			$("#divVTour").css({
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
		/*if(navigator.onLine){
			$("#panoRestaurantSWF").attr("flashvars","browser.useragent="+navigator.userAgent+"&xml=http://www.casino-megeve.com/restaurant-l-equipe/vtour/tour.xml");
			$("#panoRestaurantSWF").attr("src","http://www.casino-megeve.com/restaurant-l-equipe/vtour/tour.swf");
		}else{ */// SINON on prend ce qu'on a en local
			$("#panoRestaurantSWF").attr("flashvars","browser.useragent="+navigator.userAgent+"&xml=data/pano/restaurant/tour.xml");
			$("#panoRestaurantSWF").attr("src","data/pano/restaurant/tour.swf");
		//}
	};
	
	
	
	jsNav["carte"] = function(){
		window.open("http://www.casino-megeve.com/restaurant-l-equipe/carte.pdf");
	};
	
	
	if(document.URL.match(/restaurant/gi) != null)
		$("a[data-idjs='vtour']").click();
});