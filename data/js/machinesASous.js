$(function(){

	var jsMachinesASous = function(){
		if(parcDeJeu != undefined && parcDeJeu != "undefined" && parcDeJeu != null)
			parcDeJeu.clear();
		
		if(document.URL.match(/#machinesasous/gi) != null){
			//////////////////			CONTENU DU SCRIPT 			\\\\\\\\\\\\\\\\\\\\\
			
						////////		FUNCTIONS		\\\\\\\\\\\\
			
			// REDIMENSIONNE LA FENETRE
			var resizeDivParc = function(option){
				// On met la div a la bonne taille
				var SCREEN_WIDTH = (window.innerWidth);
				var SCREEN_HEIGHT = (window.innerHeight);
				var HEADER_HEIGHT = parseInt($("#headerData").css("height").split("px")[0]);
				var FOOTER_HEIGHT = parseInt($("#footerData").css("height").split("px")[0]);
				
				var height = (SCREEN_HEIGHT - (HEADER_HEIGHT+FOOTER_HEIGHT) - 60);
				$("#parcDeJeu").css({
					"width":SCREEN_WIDTH - 50,
					"height": (height > 200 ? height : 200)
				});
				
				$("#popUpDetailMAS").css({
					"width":SCREEN_WIDTH * 0.7
				});
				
				
				
				var wPop = parseInt($("#popUpDetailMAS").css("width").split("px")[0]);
				var hPop = parseInt($("#popUpDetailMAS").css("height").split("px")[0]);
				
				$("#popUpDetailMAS .contentInfos").css({
					"width":wPop - 190
				});
				
				/*var mTop = hPop - parseInt($("#didContentPopUp").css("height").split("px")[0])- 50;
				console.log(mTop);
				$("#didContentPopUp").css("margin-top",(mTop < 50 ? 0 : mTop));*/
			};
			
						///////////		EVENTS		\\\\\\\\\\\\\\\\\\\\
			// RESIZE
			$(window).unbind("onresize");
			window.onresize = function(event) {
				resizeDivParc();
				parcDeJeu.resizeEtCompleteEmpl(parcDeJeu.getTableOfContenu());
			};
			
			
						/////////		INITIALISE		\\\\\\\\\\\\\
			// On MAJ la taille du parc
			resizeDivParc();	
			
			// On cree un parc de jeu
			parcDeJeu = chargerParcDeJeu("default");//new ParcDeJeu();
			if(parcDeJeu == null)
				parcDeJeu = new ParcDeJeu();
			
			// On affiche le tableau de jeu
			parcDeJeu.draw();
		}
	};

	jsNav["parcMachineASous"] = function(){
		jsMachinesASous();
		
		
		
		var searchMAS = function(v){
			parcDeJeu.setCSS2Emplacement(v,{"background-color":"yellow"});
		};
		
		$("#inSearchMachine").unbind("change");
		$("#inSearchMachine").change(function(){searchMAS($(this).val());});
		$("#inSearchMachine").unbind("keyup");
		$("#inSearchMachine").keyup(function(){searchMAS($(this).val());});
		
		
		$("#butCloseDetailMAS").unbind("click");
		$("#butCloseDetailMAS").click(function(){
			$("#popUpDetailMAS").animate({"opacity":"0"},400,function(){
				$("#popUpDetailMAS").css("display","none");
			});
		});
	};
	
	jsNav["vtourParc"]  = function(){
		var resizeVTour= function(){
			// On met la div a la bonne taille
			var SCREEN_WIDTH = (window.innerWidth);
			var SCREEN_HEIGHT = (window.innerHeight);
			var HEADER_HEIGHT = parseInt($("#headerData").css("height").split("px")[0]);
			var FOOTER_HEIGHT = parseInt($("#footerData").css("height").split("px")[0]);
			
			var height = (SCREEN_HEIGHT - (HEADER_HEIGHT+FOOTER_HEIGHT) - 60);
			$("#vTourMachineASous").css({
				"width":SCREEN_WIDTH - 50,
				"height": (height > 200 ? height : 200)
			});
		};
		resizeVTour();
		$(window).unbind("onresize");
		window.onresize = function(event) {resizeVTour();};
		
	};
	
	
	
	jsNav["videoParc"] = function(){
		var resizeVTour= function(){
			// On met la div a la bonne taille
			var SCREEN_WIDTH = (window.innerWidth);
			var SCREEN_HEIGHT = (window.innerHeight);
			var HEADER_HEIGHT = parseInt($("#headerData").css("height").split("px")[0]);
			var FOOTER_HEIGHT = parseInt($("#footerData").css("height").split("px")[0]);
			
			var height = (SCREEN_HEIGHT - (HEADER_HEIGHT+FOOTER_HEIGHT) - 60);
			$("#divVideoParc").css({
				"width":SCREEN_WIDTH - 50,
				"height": (height > 200 ? height : 200)
			});
		};
		resizeVTour();
		$(window).unbind("onresize");
		window.onresize = function(event) {resizeVTour();};
	};
	
	
	
	
	jsNav["infosParc"] = function(){
		var resizeVTour= function(){
			// On met la div a la bonne taille
			var SCREEN_WIDTH = (window.innerWidth);
			var SCREEN_HEIGHT = (window.innerHeight);
			var HEADER_HEIGHT = parseInt($("#headerData").css("height").split("px")[0]);
			var FOOTER_HEIGHT = parseInt($("#footerData").css("height").split("px")[0]);
			
			var height = (SCREEN_HEIGHT - (HEADER_HEIGHT+FOOTER_HEIGHT) - 60);
			$("#divInfosParc").css({
				"width":SCREEN_WIDTH - 50,
				"height": (height > 200 ? height : 200)
			});
		};
		resizeVTour();
		$(window).unbind("onresize");
		window.onresize = function(event) {resizeVTour();};
	};
	
	
	
	
	////////		GLOBALS			\\\\\\\\\\
	var parcDeJeu = null;
	
	if(document.URL.match(/machines/gi) != null)
		$("a[data-idjs='vtourParc']").click();
});