/////////////		GLOBALES		\\\\\\\\\\\\\\\
var jsNav = new Array();
var SCHEDULS = new Array();
var clearSheduls = function(){
	for(var key in SCHEDULS)
		if(SCHEDULS[key] != null)
			clearInterval(SCHEDULS[key]);
};


$(function(){
	
	
	
	// REMPLIT LES 'EMPTY' SELON config.js
	$(".empty").each(function(){
		$(this).html(	CONFIG["INFOS_RAPIDES"][$(this).attr("data-empty")]	);
	});
	
	
	
	// ON REMPLIT LA LISTE VIEW
	var menuListe = "<li data-role='list-divider' role='heading' data-theme='b'>Accueil</li>";
	for(var key in CONFIG["MENU_LISTE"]){
		menuListe += "<li><a href='#"+CONFIG["MENU_LISTE"][key]["id"]+"' data-transition='slidefade'><h3>"+CONFIG["MENU_LISTE"][key]["title"]+"</h3><p>"+CONFIG["MENU_LISTE"][key]["infos"]+"</p></a></li>";
	}
	$("#menuListe").html(menuListe);
	
	
	
	// ON COMPLETE LES PAGES
	for(var key in CONFIG["MENU_LISTE"]){
		var e = $("#"+CONFIG["MENU_LISTE"][key]["id"]);
		e.prepend("<div data-role='header'></div>");
		e.prepend("<script type='text/javascript' src='data/js/"+CONFIG["MENU_LISTE"][key]["id"]+".js'></script>");
		e.prepend("<link rel='stylesheet' type='text/css' href='data/css/"+CONFIG["MENU_LISTE"][key]["id"]+".css' />");
		e.append("<div data-role='footer'></div>");
		
		var navBar = e.find(".navbar");
		var nbNav = navBar.find("li").length;
		if(nbNav > 0){
			var pos = parseInt(nbNav / 2);
			navBar.find("li:nth-child("+pos+")").after("<li class='liBackAccueil'><a data-icon='home'  data-iconpos='bottom' href='#accueil' class='backAccueil' data-role='button' data-transition='slidefade' data-direction='reverse'>Accueil</a></li>");
		}else if(nbNav == 0){
			navBar.html("<li class='liBackAccueil'><a data-icon='home'  data-iconpos='bottom' href='#accueil' class='backAccueil' data-role='button' data-transition='slidefade' data-direction='reverse'>Accueil</a></li>");
		}
	}
	
	
	
	// ON REMPLIT SYSTEMATIQUEMENT LES HEADER & FOOTERS de ces pages
	$("div[data-role='page']").each(function(){
		if( $(this).attr("id") != "intro" ){
			$(this).children("div[data-role='header']").html(		$("#headerData").html()	);
			$(this).children("div[data-role='footer']").html(	$("#footerData").html()	);
		}
	});
	
	
	// ON AJOUTE LE TITLE MENU
	for(var key in CONFIG["MENU_LISTE"])
		$("#"+CONFIG["MENU_LISTE"][key]["id"]).find("div[data-role='header']").append("<h1>"+CONFIG["MENU_LISTE"][key]["title"]+"<span class='inPage'></span></h1>");
	
	
	
	
	
	
	// NAVIGATION DANS LES PAGES
	$(".navbar").find("a[data-active]").each(function(){
		$(this).unbind("click");
		$(this).click(function(){
			clearSheduls();
			
			$(".navbar").find("a[data-active]").attr("data-active","false");// on met tout a false
			jsNav[$(this).attr("data-idjs")]();// on effectue la fonction
			$(this).attr("data-active","true");// on met le notre a true + vv change title vv
			$(this).parents("div[data-role='page']").children("div[data-role='header']").find(".inPage").html(" | "+$(this).html());
			
			$(".hide").css("display","none");
			$(".hide").css("opacity","0");
			
			$("#"+$(this).attr("data-idjs")).css("display","block");
			$("#"+$(this).attr("data-idjs")).animate({"opacity":"1"},500);
		});
	});
	
	
	
	// SI ON Y ARRIVE PAR CHANGEMENT DE PAGE
	$( window ).hashchange(function( event ) {
		
		clearSheduls();
		
		
		// En fonction de la page clique pour voir le bon contenu
		if(document.URL.match(/event/gi) != null){
			$("a[data-idjs='eventApercu']").click();
		}
		else if(document.URL.match(/restaurant/gi) != null){
			console.log("SWITCH RESTAU");
		}
			
		
	});
});