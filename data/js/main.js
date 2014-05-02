/////////////		GLOBALES		\\\\\\\\\\\\\\\
var jsNav = new Array();
var CPT_SEC_VEILLE = 0, INTRO = TIME_VEILLE = INTER_VEILLE = null, GO_VEILLE = 180, AFTER_INTRO = "#accueil";
var SCHEDULS = new Array();
var clearSheduls = function(){
	for(var key in SCHEDULS)
		if(SCHEDULS[key] != null)
			clearInterval(SCHEDULS[key]);
};


$(function(){
	// MISE EN VEILLE
	TIME_VEILLE = function(){
		console.log(CPT_SEC_VEILLE);
		CPT_SEC_VEILLE = CPT_SEC_VEILLE + 1 ;
		if(CPT_SEC_VEILLE >= GO_VEILLE){
			AFTER_INTRO = location.hash;
			$.mobile.changePage($("#intro"), "fade", true, true);
			clearInterval(INTER_VEILLE);
			CPT_SEC_VEILLE = 0;
		}
	};
	
	// SI ON EST PAS SUR L'INTRO AU MOINDRE MOUVEMENT ON REMET A ZERO LE CPT DE MISE EN VEILLE
	$(window).mousemove(function(){
		if(document.URL.match(/(intro)|(\/$)|(html$)/gi) == null)
			CPT_SEC_VEILLE = 0;
	});
	$(window).keydown(function(){
		if(document.URL.match(/(intro)|(\/$)|(html$)/gi) == null)
			CPT_SEC_VEILLE = 0;
	});
	
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
		e.prepend("<link rel='stylesheet' type='text/css' href='data/css/"+CONFIG["MENU_LISTE"][key]["id"]+".css' /><script type='text/javascript' src='data/js/"+CONFIG["MENU_LISTE"][key]["id"]+".js'></script>");
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
		$("#"+CONFIG["MENU_LISTE"][key]["id"]).find("div[data-role='header']").find(".logos").after("<h1 class='inlineBlock'>"+CONFIG["MENU_LISTE"][key]["title"]+"<span class='inPage'></span></h1>");
	
	
	
	
	
	
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
			$("a[data-idjs='vtourRestau']").click();
		}
		else if(document.URL.match(/purple/gi) != null){	// PURPLE
			$("a[data-idjs='vtourPurple']").click();
		}else if(document.URL.match(/machine/gi) != null){	// MACHINES A SOUS
			$("a[data-idjs='vtourParc']").click();
		}else if(document.URL.match(/tables/gi) != null){	// TABLES DE JEUX
			$("a[data-idjs='vtourTables']").click();
		}else if(document.URL.match(/palo/gi) != null){		// PALO ALTO
			$("a[data-idjs='videoPalo']").click();
		}else if(document.URL.match(/(intro)|(\/$)|(html$)/gi) != null){	// INTRO, VEILLE
			$("#bgIntro").remove();
			$("#logo").remove();
			INTRO();
			
		}
			
		
	});
	
	
	
						/*//////////////		REMPLIT EVENTS			\\\\\\\\\\\\\\\\\*/
	
	// REMPLIT EVENTS CASINO
	var el = $("#contentFilterEventCasino");
	
	for(var kEvent in CONFIG["EVENTS"]){
		var event = CONFIG["EVENTS"][kEvent];
		
		var c = new Calendar();
		var date = event["date"].split("/");
		date = date[0]+" "+c.toogleMonth(date[1])+" "+date[2];
		var heure = (event["heure"] == undefined ? "" : " à "+event["heure"]);
		var lieu = event["lieu"]+(event["eventPurple"] == "true" ? ', PurpleLounge' : '');
		el.append('<div data-role="collapsible" data-filtertext="'+event['title']+' le '+date+heure+' au '+lieu+'">'+
						'<h3>'+event['title']+'<span style="font-weight:normal;font-size:10pt;"> - le '+date+heure+' au '+lieu+'</span></h3>'+
						'<img class="inlineBlock" height="95px" alt="'+event['id']+'" title="'+event['id']+'" src="data/img/event/'+event['id']+'.jpg"/>'+
						'<div class="inlineBlock" style="text-align:justify;width:80%;margin-left:25px;">'+event["content"]+'</br>'+
						'<p style="font-size:10pt;text-align:right;">'+(event["eventPurple"] == "true" ? 'Style : '+event["styleMusic"] : '')+
						'</br><span class="bold">Au '+lieu+'</span></p></div>'+
					'</div>');
		
		
		
	}
	
	
	// REMPLIT LES EVENTS PURPLE LOUNGE
	// ON REMPLIT LES EVENTS EN FONCTION DE CONFIG[]
	var el = $("#contentFilterEventPurple");
	
	for(var kEvent in CONFIG["EVENTS"]){
		var event = CONFIG["EVENTS"][kEvent];
		if(event["eventPurple"] == "true"){
			var c = new Calendar();
			var date = event["date"].split("/");
			date = date[0]+" "+c.toogleMonth(date[1])+" "+date[2];
			el.append('<div data-role="collapsible" data-filtertext="'+event['title']+' le '+date+' à '+event["heure"]+' au '+event["lieu"]+event["styleMusic"]+'">'+
							'<h3>'+event['title']+'<span style="font-weight:normal;font-size:10pt;"> - le '+date+' à '+event["heure"]+' au '+event["lieu"]+'</span></h3>'+
							'<img class="inlineBlock" height="95px" alt="'+event['id']+'" title="'+event['id']+'" src="data/img/event/purpleLounge/'+event['id']+'.jpg"/>'+
							'<div class="inlineBlock" style="text-align:justify;width:80%;margin-left:25px;">'+event["content"]+'</br><p style="font-size:10pt;text-align:right;">Style : '+event["styleMusic"]+'</p></div>'+
						'</div>');
		}
		
		
	}
});