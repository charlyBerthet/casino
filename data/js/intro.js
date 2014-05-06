$(function(){
	INTRO = function(){
		if(document.URL.match(/(intro)|(\/$)|(html$)/gi) != null){
			
				
			
			var divContent = $("#intro div[data-role='content']");
			var logo = $('<img id="logo" alt="Logo Casino de Megeve, Groupe Barrière" src="data/img/intro/logo.png"/>');
			
			
			var LOGO_WIDTH = LOGO_HEIGHT = null;
			
									//////		CSS		\\\\\\\\\\\\\\
			$("#intro").css({// INTRO
				"padding":"0px",
				"margin":"0px",
				"overflow":"hidden"
			});
			$("#intro div[data-role='header']").css({// HEADER
				"border":"none",
				"background-color":"rgba(0,0,0,0)"
			});
			divContent.css({// CONTENT
				"padding":"0px",
				"margin":"0px",
				"overflow":"hidden",
				"background-color":"black"
				
			});
			logo.css({// LOGO
				"position":"fixed",
				"top":"50%",
				"left":"50%",
				"z-index":"20",
				"border-radius":"15px",
				"opacity":"0"
			});
			
			
								////////		REDIMENTION CONTENT			\\\\\\\\\\
			var resizeIntro= function(){
				var  SCREEN_WIDTH= (window.innerWidth);
				var SCREEN_HEIGHT = (window.innerHeight);
				divContent.css({"width":SCREEN_WIDTH,"height": SCREEN_HEIGHT});
				
				
				var wLogo = 500, hLogo = 200;
				
				if(SCREEN_WIDTH < 300){
					wLogo = 200;
					hLogo = 80;
				}else if(SCREEN_WIDTH < 400){
					wLogo = 250;
					hLogo = 100;
				}else if(SCREEN_WIDTH < 700){
					wLogo = 300;
					hLogo = 120;
				}else if(SCREEN_WIDTH < 800){
					wLogo = 350;
					hLogo = 140;
				}else if(SCREEN_WIDTH < 900){
					wLogo = 400;
					hLogo = 160;
				}
				LOGO_WIDTH = wLogo;
				LOGO_HEIGHT = hLogo;
				logo.css({// CSS LOGO
					"margin-top":"-"+(parseInt(hLogo/2))+"px",
					"margin-left":"-"+(parseInt(wLogo/2))+"px",
					"width":wLogo+"px",
					"height":hLogo+"px"
				});
				
			}
			resizeIntro();
			$(window).unbind("onresize");
			window.onresize = function(event) {	resizeIntro();};
			
			
									////////		LOGO		\\\\\\\\
			
			
									////////		BACKGROUND		\\\\\\\\\\
			// TRANSITION
			var switchBG = function(){
				var im = $("#bgIntro").clone();
				im.attr({"src":"data/img/intro/paysage_"+(parseInt(im.attr("data-num"))+1)+".jpg","data-num":(parseInt(im.attr("data-num"))+1)+""});
				im.unbind("load");
				im.load(function(){	//	SI URL LOAD
					var imTemp = $("#bgIntro").clone();
					$("#bgIntro").remove();
					imTemp.css({"position":"fixed","top":"0px","left":"0px","width":"100%","height":"100%"});
					imTemp.attr("id","imBGTemp");
					im.css("opacity","0");
					divContent.prepend(im);
					divContent.prepend(imTemp);
					$("#bgIntro").fadeTo(2500, 1 );
					$("#imBGTemp").fadeTo(2500,0,function(){
						$("#imBGTemp").remove();
					});
					
				});
				im.error(function(e) {	//	SI URL NON LOAD
					im.attr({"src":"data/img/intro/paysage_0.jpg","data-num":"0"});	
				});
			};
			
			//	INITIALISATION
			var imageBG = $('<img id="bgIntro" alt="Casino de Megeve" style="z-index:0;opacity:0;height:100%;width:100%"/>');
			imageBG.attr({"src":"data/img/intro/paysage_0.jpg","data-num":"0"});
			
			//	AFFICHAGE DS CONTENUS
			divContent.append(logo);
			
			
			logo.load(function(){
				$(this).fadeTo(3000,1);
			});
			imageBG.load(function(){
				divContent.prepend(imageBG);
				$("#bgIntro").fadeTo(5000,1,function(){
					switchBG();
					SCHEDULS["introBGTransition"] = setInterval(function(){switchBG();},7000);
					
				});
			});
			
			divContent.click(function(){
				$("#bgIntro").fadeTo(2000,0.4);
				$("#logo").fadeTo(2000,0,function(){
					if(animation.isFirstAccueil)
						animation.firstAccueil();
					// ON LANCE L'INTERVAL POUR LA MISE EN VEILLE
					INTER_VEILLE = setInterval(function(){TIME_VEILLE();}, 1000);
					if(AFTER_INTRO == undefined || AFTER_INTRO == "undefined" || AFTER_INTRO == null || AFTER_INTRO == ""  || AFTER_INTRO == "#" || AFTER_INTRO == "#undefined")
						AFTER_INTRO = "#accueil";
					$.mobile.changePage($(AFTER_INTRO), "fade", true, true);
				});
			});		
		
		}else{ // ON LANCE L'INTERVAL POUR LA MISE EN VEILLE
			INTER_VEILLE = setInterval(function(){TIME_VEILLE();}, 1000);
		}
	};
	INTRO();
});