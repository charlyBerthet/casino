$(function(){

	var jsMachinesASous = function(){
		if(parcDeJeu != undefined && parcDeJeu != "undefined" && parcDeJeu != null)
			parcDeJeu.clear();
		
		if(document.URL.match(/#machinesasous/gi) != null){
			//////////////////			CONTENU DU SCRIPT 			\\\\\\\\\\\\\\\\\\\\\
			
						////////		FUNCTIONS		\\\\\\\\\\\\
			
			// REDIMENSIONNE LA FENETRE
			var resizeDiv = function(option){
				var SCREEN_WIDTH = (window.innerWidth);
				var SCREEN_HEIGHT = (window.innerHeight);
				
					// height
				$("#divParcDeJeu,#parcDeJeu").css("height",SCREEN_HEIGHT*0.95);
					// width
				$("#divParcDeJeu,#parcDeJeu").css("width",SCREEN_WIDTH*0.95);
			};
			
						///////////		EVENTS		\\\\\\\\\\\\\\\\\\\\
			// RESIZE
			$(window).unbind("onresize");
			window.onresize = function(event) {
				resizeDiv();
					
				parcDeJeu.resizeEtCompleteEmpl(parcDeJeu.getTableOfContenu());
			};
			
			
						/////////		INITIALISE		\\\\\\\\\\\\\
			// On MAJ la taille du parc
			resizeDiv();	
			
			// On cree un parc de jeu
			parcDeJeu = chargerParcDeJeu("default");//new ParcDeJeu();
			if(parcDeJeu == null)
				parcDeJeu = new ParcDeJeu();
			
			// On affiche le tableau de jeu
			parcDeJeu.draw();
		}
	};

	
	////////GLOBALS			\\\\\\\\\\
	var parcDeJeu = null;
	
	// SI ON ARRIVE DIRECTEMENT SUR LA BONNE PAGE
	jsMachinesASous();

	// SI ON Y ARRIVE PAR CHANGEMENT DE PAGE
	$( window ).hashchange(function( event ) {
		jsMachinesASous();
	} );
});