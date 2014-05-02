$(function(){
	jsNav["vtourTables"] = function(){
		
		var resizeVTour= function(){
			// On met la div a la bonne taille
			var SCREEN_WIDTH = (window.innerWidth);
			var SCREEN_HEIGHT = (window.innerHeight);
			var HEADER_HEIGHT = parseInt($("#headerData").css("height").split("px")[0]);
			var FOOTER_HEIGHT = parseInt($("#footerData").css("height").split("px")[0]);
			
			var height = (SCREEN_HEIGHT - (HEADER_HEIGHT+FOOTER_HEIGHT) - 60);
			$("#vTourTablesDiv").css({
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
	
	
	jsNav["infosTables"] = function(){
		var resizeVTour= function(){
			var SCREEN_WIDTH = (window.innerWidth);
			var SCREEN_HEIGHT = (window.innerHeight);
			var HEADER_HEIGHT = parseInt($("#headerData").css("height").split("px")[0]);
			var FOOTER_HEIGHT = parseInt($("#footerData").css("height").split("px")[0]);
			var height = (SCREEN_HEIGHT - (HEADER_HEIGHT+FOOTER_HEIGHT) - 60) - 40;
			$("#infosTables").css({	"width":SCREEN_WIDTH - 50 - 40,"height": (height > 200 ? height : 200)});
		};
		resizeVTour();
		$(window).unbind("onresize");
		window.onresize = function(event) {		resizeVTour();	};
		
		
		// CREE LES BUTTONS
		$("#butJeux").html("");
		for(var kJeu in CONFIG["JEUX_DE_TABLE"]){
			var jeu = CONFIG["JEUX_DE_TABLE"][kJeu];
			$("#butJeux").append('<button data-id="'+kJeu+'" class="ui-btn ui-shadow ui-corner-all '+(kJeu%2==0 ? "red" : "black")+'">'+jeu['title']+'</button>');
		}
		
		// CLICK BUTTON, REMPLI INFO
		$("#butJeux").children("button").click(function(){
			var title = $(this).html();
			var jeu = CONFIG["JEUX_DE_TABLE"][parseInt($(this).attr("data-id"))];
			$("#titleInfosJeu").html(title);
			$("#horraireInfosJeu").html(jeu["jour"]+" de "+jeu["heureDebut"]+" à "+jeu["heureFin"]);
			$("#contentInfosJeu").html(jeu["content"]);
		});
		
		
		
	};
	
	
	if(document.URL.match(/tables/gi) != null)
		$("a[data-idjs='vtourTables']").click();
});