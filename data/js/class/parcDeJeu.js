//$(function(){

	/* CONSTRUCTEUR */
	var ParcDeJeu = function(id,width,height){
		// Save
		this.id = this.id || id || 'parcDeJeu';
		this.name = this.name || "default";
		this.width = this.width || width || 15;
		
		this.height = this.height || height || 10;
		
		this.listeOfMachines = this.listeOfMachines || new Array();
		this.listeOfObjets = this.listeOfObjets || new Array();
		
		this.typeObjetPossible = Array('bar', 
										'porte horizontale','porte verticale',
										'fumoir',
										'caisse',
										'mur horizontal','mur vertical', 'mur coin bas droit','mur coin bas gauche','mur coin haut droit','mur coin haut gauche',
										'table de jeu',
										'table',
										'cadeaux'
										);
		
		this.colorEmplacementVide = "rgba(240,240,240,1)";
		
		this.cptResize = this.cptResize || 0;
		
		this.ancienCSSSearch = this.ancienCSSSearch || null;
		this.ancienNumSearch = this.ancienNumSearch || null;
	};
	
	
	
	/* DRAW TABLEAU DE JEU */
	ParcDeJeu.prototype.draw = function(){
		var me = $("#"+this.id);
		var table ="";
		
		// On va dessiner le tableau de jeu
		for(var row=0; row < this.height; row ++){
			table += "<tr>";
			for(var column=0; column < this.width; column ++){				
				var occupe = false;
				var color = this.colorEmplacementVide;
				
				
				// On parcourt la liste des machines
				for(key in this.listeOfMachines){
					var machine =  this.listeOfMachines[key];

					// si il existe une machine à cet endroit
					if(machine.emplacement != null)
						if(machine.emplacement.x == column)
							if(machine.emplacement.y == row){
								occupe = true;
								color = machine.color;
								break;
							}
				}
				
				// On parcourt la liste des objets
				for(key in this.listeOfObjets){
					var objet =  this.listeOfObjets[key];

					// si il existe une machine à cet endroit
					if(objet.emplacement != null)
						if(objet.emplacement.x == column)
							if(objet.emplacement.y == row){
								occupe = true;
								color = objet.couleur;
								break;
							}
				}
				
					//console.log(" > "+tabOfContenu.length);
				table += "<td data-occupe='"+occupe+"' style='background-color:"+color+"' class='emplacement' data-row='"+row+"' data-column='"+column+"'>";
					table += "<div class='contentEmplacement'></div>";
				table += "</td>";					
			}
			table += "</tr>";
		}
		
		// On affiche
		me.html(table);
		
		// on resize et remplit les emplacements
		
		
		this.resizeEtCompleteEmpl(this.getTableOfContenu());
		
		
		// on affecte les evenements
		this.eventEmplacement();
		
		// si on autoSave, alors on save
		if($("#butAutoSave").is(':checked'))
			this.saveEtat();
	};
	
	
	
	
	
	/* DRAW VOIR MACHINES A SOUS */
	ParcDeJeu.prototype.drawVoirMachineASous = function(elem){};
	
	
	
	
	
	/* TRIE ORDRE LISTE MACHINE A SOUS */
	ParcDeJeu.prototype.orderListeMAS = function(order){};
	
	
	
	
	
	
	
	// RENVOI LE TABLEAU DE CONTENU DES EMPLACEMENTS
	ParcDeJeu.prototype.getTableOfContenu = function(){
		var tabOfContenu = new Array();
		
		for(var row=0; row < this.height; row ++){
			for(var column=0; column < this.width; column ++){
				
				
				var content = "";
				// On parcourt la liste des machines
				for(key in this.listeOfMachines){
					var machine =  this.listeOfMachines[key];
					// si il existe une machine à cet endroit
					if(machine.emplacement != null)
						if(machine.emplacement.x == column)
							if(machine.emplacement.y == row){
								// on rempli le content
								content = "<p class='titleEmplacement'>Machine</p>"+
									"<p>n°<span class='num'>"+machine.numMachine+"</span></p>"+
									"<p><span class='deno'>"+machine.denomination+"</span>€</p>";																				
								
								
								// Si c'est une poker, on l'affiche
								if(machine.jeu.toLowerCase().match(/poker/g) != null)
									content += "<p><span class='jeu'>Poker</span></p>";
								break;
							}
				}
				
				// si il y a un objet a cet endroit, on l'affiche
				for(key in this.listeOfObjets){
					var objet = this.listeOfObjets[key];
					if(objet.emplacement != null)
						if(objet.emplacement.x == column)
							if(objet.emplacement.y == row){
																
								content = "<p class='titleEmplacement titleObjet'>"+objet.type+"</p>";
								content += "<p><img class='imgEmpl' title='"+objet.type+"' alt='"+objet.type+"' src='data/img/"+objet.type+".png' /></p>"
								break;
							}
				}
				// on remplit le tableau de contenu
				tabOfContenu.push( new ContenuEmplacement(row, column, content) );
			}
		}
		
		return tabOfContenu;
	};
	
	
	
	
	
	
	
	
	// RESIZE et REMPLIT le contenu des EMPLACEMENTs
	ParcDeJeu.prototype.resizeEtCompleteEmpl = function(tabOfContenu){		
		// on vide les contenu
		$(".contentEmplacement").html("");
		
		// on met la taille a 100%
		$(".contentEmplacement").css({
			"width":"100%",
			"height":"100%"
		});
		
		// SIZE des TD parents
		var width = $(".emplacement").css('width').substr(0, $(".emplacement").css('width').length -2);
		var height = $(".emplacement").css('height').substr(0, $(".emplacement").css('height').length -2);
		this.cptResize ++;
		
		
		if(this.cptResize < 20 && width <= 0 || height <= 0){
			var that = this;
			setTimeout(function(){
				that.resizeEtCompleteEmpl(tabOfContenu);
			},200);
			return 0;
		}
		
		
		this.cptResize = 0;
		// on met a jour la taille des contenus
		$(".contentEmplacement").css({
			"width":width+"px",
			"height":height+"px"
		});
		
		var cpt = 0;
		// on rempli les contenus
		$(".emplacement .contentEmplacement").each(function(){
			var row = $(this).parent('.emplacement').attr('data-row');
			var column = $(this).parent('.emplacement').attr('data-column');
			// comme on rempli dans le meme ordre que la lecture on peut se permettre cette optimisation
			var content = tabOfContenu[cpt].content;

			// si on est bien au bonne endroit
			if(row == tabOfContenu[cpt].row && column == tabOfContenu[cpt].column){
				$(this).html(content);
				$(this).find('.imgEmpl').attr('width',width+'px')
				$(this).find('.imgEmpl').attr('height',height+'px')
			}else{
				console.log("ERREUR #001 class 'parcDeJeu'");
			}			
			cpt ++ ;
		});
//		   /\							   /\
		  //\\							  //\\
		 //__\\							 //__\\
		////\\\\	AFFICHE ONLY DENO	////\\\\
		// On fonction de la taille des emplacements, on affiche pas tout dedans !
		
		/*if(parseInt(height) < 58){ // Affiche MAS + Num + Deno
			// Si c'est un poker, le num est rouge !
			$(".contentEmplacement").each(function(){
				
				if($(this).find(".jeu").text().toLowerCase() == "poker"){
					$(this).find(".num").css("color","red");
					$(this).find(".num").parent("p").css("color","red");
				}
					
			});
			
			$(".contentEmplacement .jeu").parent("p").remove();
		}*/
		
		
		$(".contentEmplacement .num, .contentEmplacement .jeu").parent("p").css("display","none");
		$(".contentEmplacement .titleEmplacement").css("display","none");
		$(".contentEmplacement p, .contentEmplacement .deno").css("font-weight","bold");
		if(parseInt(height) < 42){ // Affiche MAS + Num
			
		}
		
		if(parseInt(height) < 28){ // Affiche Num
			
			
		}
	};
	
	
	
	
	/* CLEAR */
	ParcDeJeu.prototype.clear = function(){
		$("#"+this.id).html("");
	};
	
	
	/* CHANGE WIDTH */
	ParcDeJeu.prototype.changeWidth = function(width){
		this.width = width;
	};
	
	
	/* CHANGE HEIGHT */
	ParcDeJeu.prototype.changeHeight = function(height){
		this.height = height;
	};
	
	
	/* CHANGE SIZE */
	ParcDeJeu.prototype.changeSize = function(width,height){
		this.width = width;
		this.height = height;
	};
	
	
	
	
	
	/* SAVE ETAT DE PARC */
	ParcDeJeu.prototype.saveEtat = function(nameOfSave){};
	
	
	
	
	
	/* GET EXTRACT OF PARC */
	ParcDeJeu.prototype.getExtractionParc = function(){
		return JSON.stringify(this);
	};
	
	
	
	/* CHARGE EXTRACTION OF PARC */
	ParcDeJeu.prototype.getNewParc = function(parc){
		
		if(typeof parc === "undefined"){
			alert("Désolé, il y a une erreur de saisie.");
		}else{
			// on transforme en objet
			parc = JSON.parse( parc) ;
			
			// On cast chaque Objet en son type propre
				// Les machines a sous, en machineASous
			for(var key in parc.listeOfMachines){
				parc.listeOfMachines[key].__proto__ = MachineASous.prototype;
				parc.listeOfMachines[key].constructor.call(parc.listeOfMachines[key]);
			}
			
			// Les objets, en Objet
			for(var key in parc.listeOfObjets){
				parc.listeOfObjets[key].__proto__ = Objet.prototype;
				parc.listeOfObjets[key].constructor.call(parc.listeOfObjets[key]);
			}
			
				// le parc de jeu en parcDeJeu
			parc.__proto__ = ParcDeJeu.prototype;
			parc.constructor.call(parc);

			return parc;
		}
	};
	
	
	/* CHARGE ETAT DU PARC */
	var chargerParcDeJeu= function(name){
		
			var parc = JSON.parse('{"id":"parcDeJeu","width":"22","height":"18","listeOfMachines":[{"numMachine":"248","marque":"Konami","numSocle":"248","denomination":"0.02","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Advantage 5 - Diamond Spinner","emplacement":{"x":20,"y":0,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(200,240,250,1)"},{"numMachine":"247","marque":"Aristocrat Mk6","numSocle":"247","denomination":"0.01","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Luigis Ball","emplacement":{"x":"11","y":"9","occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(220,250,250,1)"},{"numMachine":"246","marque":"Aristocrat Mk6","numSocle":"246","denomination":"0.01","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Pelican Pete","emplacement":{"x":"12","y":"9","occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(220,250,250,1)"},{"numMachine":"244","marque":"Orion","numSocle":"244","denomination":"0.01","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Lucky Leprechauns","emplacement":{"x":"10","y":"11","occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(220,250,250,1)"},{"numMachine":"238","marque":"Atronic","numSocle":"238","denomination":"0.01","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Multi-jeux - Diversity - Royal Red Deluxe","emplacement":{"x":"13","y":"10","occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(220,250,250,1)"},{"numMachine":"237","marque":"Atronic","numSocle":"237","denomination":"0.01","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Multi-jeux - Diversity - Amazing Amber Deluxe","emplacement":{"x":"13","y":"11","occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(220,250,250,1)"},{"numMachine":"236","marque":"Orion","numSocle":"236","denomination":"0.02","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Multi-jeux - Game Pack","emplacement":{"x":13,"y":3,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(200,240,250,1)"},{"numMachine":"222","marque":"Bally","numSocle":"222","denomination":"0.01","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Cash Spin","emplacement":{"x":"10","y":"10","occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(220,250,250,1)"},{"numMachine":"217","marque":"WMS","numSocle":"217","denomination":"0.02","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Gold Fish","emplacement":{"x":12,"y":6,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(200,240,250,1)"},{"numMachine":"209","marque":"Konami","numSocle":"209","denomination":"0.02","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Advantage 5 - Dragon Crystal","emplacement":{"x":21,"y":0,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(200,240,250,1)"},{"numMachine":"208","marque":"Konami","numSocle":"208","denomination":"0.02","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Advantage 5 - Pele Hawaian Goddess","emplacement":{"x":19,"y":0,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(200,240,250,1)"},{"numMachine":"201","marque":"WMS","numSocle":"35","denomination":"0.01","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Wild Flurry","emplacement":{"x":"13","y":"6","occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(220,250,250,1)"},{"numMachine":"200","marque":"WMS","numSocle":"36","denomination":"0.01","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Hot Hot Seper Respin","emplacement":{"x":11,"y":6,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(220,250,250,1)"},{"numMachine":"150","marque":"IGT","numSocle":"49","denomination":"0.50","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Poker","emplacement":{"x":21,"y":13,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(255,180,100,1)"},{"numMachine":"137","marque":"IGT","numSocle":"50","denomination":"0.50","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Poker","emplacement":{"x":21,"y":12,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(255,180,100,1)"},{"numMachine":"120","marque":"Aristocrat Mk6","numSocle":"29","denomination":"0.05","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Zorro","emplacement":{"x":13,"y":4,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(210,200,250,1)"},{"numMachine":"118","marque":"WMS","numSocle":"21","denomination":"0.05","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Life of Luxury Progressive - Riches of Rome","emplacement":{"x":18,"y":0,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(210,200,250,1)"},{"numMachine":"116","marque":"WMS","numSocle":"22","denomination":"0.05","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Life of Luxury Progressive - Jungle Cats","emplacement":{"x":17,"y":0,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(210,200,250,1)"},{"numMachine":"115","marque":"WMS","numSocle":"19","denomination":"0.05","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Life of Luxury Progressive - Far East Fortunes","emplacement":{"x":16,"y":0,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(210,200,250,1)"},{"numMachine":"113","marque":"WMS","numSocle":"20","denomination":"0.05","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Life of Luxury Progressive - Alpine Adventure","emplacement":{"x":15,"y":0,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(210,200,250,1)"},{"numMachine":"109","marque":"Aristocrat Mk6","numSocle":"24","denomination":"0.02","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Mr Woo","emplacement":{"x":13,"y":2,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(200,240,250,1)"},{"numMachine":"103","marque":"Aristocrat Mk5","numSocle":"25","denomination":"0.02","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Wild Panda","emplacement":{"x":13,"y":1,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(200,240,250,1)"},{"numMachine":"101","marque":"Aristocrat Mk5","numSocle":"28","denomination":"0.01","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Where\'s the Gold","emplacement":{"x":13,"y":5,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(220,250,250,1)"},{"numMachine":"44","marque":"IGT","numSocle":"42","denomination":"1.00","billet":"Non","ticket":"Non","jeton":"Oui","jeu":"Joker Poker","emplacement":{"x":9,"y":0,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(250,140,140,1)"},{"numMachine":"42","marque":"IGT","numSocle":"38","denomination":"2.00","billet":"Non","ticket":"Non","jeton":"Oui","jeu":"Joker Poker","emplacement":{"x":5,"y":0,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(250,110,110,1)"},{"numMachine":"36","marque":"IGT","numSocle":"45","denomination":"1.00","billet":"Non","ticket":"Non","jeton":"Oui","jeu":"Draw Poker","emplacement":{"x":7,"y":0,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(250,140,140,1)"},{"numMachine":"35","marque":"IGT","numSocle":"44","denomination":"1.00","billet":"Non","ticket":"Non","jeton":"Oui","jeu":"Joker Poker","emplacement":{"x":"8","y":"0","occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(250,140,140,1)"},{"numMachine":"34","marque":"IGT","numSocle":"37","denomination":"2.00","billet":"Non","ticket":"Non","jeton":"Oui","jeu":"Joker Poker","emplacement":{"x":6,"y":0,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(250,110,110,1)"},{"numMachine":"31","marque":"IGT","numSocle":"40","denomination":"2.00","billet":"Non","ticket":"Non","jeton":"Oui","jeu":"Joker Wild Poker","emplacement":{"x":11,"y":1,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(250,110,110,1)"},{"numMachine":"30","marque":"IGT","numSocle":"39","denomination":"2.00","billet":"Non","ticket":"Non","jeton":"Oui","jeu":"Joker Wild Poker","emplacement":{"x":11,"y":2,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(250,110,110,1)"},{"numMachine":"29","marque":"IGT","numSocle":"46","denomination":"1.00","billet":"Non","ticket":"Non","jeton":"Oui","jeu":"Joker Wild Poker","emplacement":{"x":11,"y":3,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(250,140,140,1)"},{"numMachine":"28","marque":"IGT","numSocle":"47","denomination":"1.00","billet":"Non","ticket":"Non","jeton":"Oui","jeu":"Joker Wild Poker","emplacement":{"x":11,"y":4,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(250,140,140,1)"},{"numMachine":"27","marque":"IGT","numSocle":"48","denomination":"1.00","billet":"Non","ticket":"Non","jeton":"Oui","jeu":"Joker Wild Poker","emplacement":{"x":11,"y":5,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(250,140,140,1)"},{"numMachine":"21","marque":"IGT","numSocle":"34","denomination":"2.00","billet":"Non","ticket":"Non","jeton":"Oui","jeu":"Double Stricke","emplacement":{"x":2,"y":0,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(250,110,110,1)"},{"numMachine":"17","marque":"Bally","numSocle":"32","denomination":"5.00","billet":"Non","ticket":"Non","jeton":"Oui","jeu":"Triple Money","emplacement":{"x":3,"y":0,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(255,80,80,1)"},{"numMachine":"15","marque":"Bally","numSocle":"30","denomination":"2.00","billet":"Non","ticket":"Non","jeton":"Oui","jeu":"Bonus Times","emplacement":{"x":0,"y":1,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(250,110,110,1)"},{"numMachine":"20","marque":"Bally","numSocle":"31","denomination":"2.00","billet":"Non","ticket":"Non","jeton":"Oui","jeu":"Bonus Times","emplacement":{"x":0,"y":2,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(250,110,110,1)"},{"numMachine":"23","marque":"IGT","numSocle":"07","denomination":"1.00","billet":"Non","ticket":"Non","jeton":"Oui","jeu":"Double Bucks","emplacement":{"x":0,"y":3,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(250,140,140,1)"},{"numMachine":"26","marque":"IGT","numSocle":"04","denomination":"1.00","billet":"Non","ticket":"Non","jeton":"Oui","jeu":"Double Gold","emplacement":{"x":5,"y":2,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(250,140,140,1)"},{"numMachine":"16","marque":"Bally","numSocle":"06","denomination":"1.00","billet":"Non","ticket":"Non","jeton":"Oui","jeu":"Gold","emplacement":{"x":5,"y":3,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(250,140,140,1)"},{"numMachine":"22","marque":"IGT","numSocle":"05","denomination":"1.00","billet":"Non","ticket":"Non","jeton":"Oui","jeu":"Double Stricke","emplacement":{"x":5,"y":4,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(250,140,140,1)"},{"numMachine":"19","marque":"Bally","numSocle":"03","denomination":"1.00","billet":"Non","ticket":"Non","jeton":"Oui","jeu":"Bonus Times","emplacement":{"x":4,"y":4,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(250,140,140,1)"},{"numMachine":"18","marque":"Bally","numSocle":"01","denomination":"1.00","billet":"Non","ticket":"Non","jeton":"Oui","jeu":"Pool Shark","emplacement":{"x":3,"y":4,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(250,140,140,1)"},{"numMachine":"121","marque":"Bally","numSocle":"02","denomination":"0.50","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Double Jackpot Progressive - Black & White","emplacement":{"x":0,"y":4,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(255,180,100,1)"},{"numMachine":"110","marque":"Bally","numSocle":"33","denomination":"0.50","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Double Jackpot Progressive - Black & White","emplacement":{"x":0,"y":5,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(255,180,100,1)"},{"numMachine":"119","marque":"Bally","numSocle":"08","denomination":"0.50","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Bonus Times","emplacement":{"x":0,"y":6,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(255,180,100,1)"},{"numMachine":"203","marque":"Bally","numSocle":"203","denomination":"0.50","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Diamonds & Devils","emplacement":{"x":0,"y":7,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(255,180,100,1)"},{"numMachine":"202","marque":"Bally","numSocle":"202","denomination":"0.50","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Diamonds & Devils","emplacement":{"x":0,"y":8,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(255,180,100,1)"},{"numMachine":"112","marque":"Bally","numSocle":"10","denomination":"0.50","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Baligator","emplacement":{"x":0,"y":9,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(255,180,100,1)"},{"numMachine":"251","marque":"IGT","numSocle":"251","denomination":"0.50","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Silver Stars","emplacement":{"x":0,"y":10,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(255,180,100,1)"},{"numMachine":"250","marque":"IGT","numSocle":"250","denomination":"0.50","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Double Bucks","emplacement":{"x":0,"y":11,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(255,180,100,1)"},{"numMachine":"249","marque":"IGT","numSocle":"249","denomination":"0.50","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Triple Hot Ice","emplacement":{"x":0,"y":12,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(255,180,100,1)"},{"numMachine":"243","marque":"IGT","numSocle":"243","denomination":"0.01","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Kitty Glitter","emplacement":{"x":"3","y":"14","occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(220,250,250,1)"},{"numMachine":"122","marque":"IGT","numSocle":"13","denomination":"0.01","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Pharaoh\'s Gold","emplacement":{"x":"4","y":"14","occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(220,250,250,1)"},{"numMachine":"107","marque":"IGT","numSocle":"14","denomination":"0.01","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Treasure of Troy","emplacement":{"x":"5","y":"14","occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(220,250,250,1)"},{"numMachine":"108","marque":"IGT","numSocle":"12","denomination":"0.01","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Russian Treasure","emplacement":{"x":"6","y":"14","occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(220,250,250,1)"},{"numMachine":"245","marque":"WMS","numSocle":"245","denomination":"0.01","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Tertes","emplacement":{"x":3,"y":9,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(220,250,250,1)"},{"numMachine":"216","marque":"WMS","numSocle":"216","denomination":"0.02","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Super Silver","emplacement":{"x":"4","y":"9","occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(200,240,250,1)"},{"numMachine":"117","marque":"Bally","numSocle":"18","denomination":"0.05","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Hot Shot Progressive","emplacement":{"x":5,"y":10,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(210,200,250,1)"},{"numMachine":"210","marque":"IGT","numSocle":"210","denomination":"0.01","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Free Games","emplacement":{"x":5,"y":11,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(220,250,250,1)"},{"numMachine":"114","marque":"Bally","numSocle":"23","denomination":"0.02","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Super FireBall Frenzy","emplacement":{"x":5,"y":12,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(200,240,250,1)"},{"numMachine":"242","marque":"Bally","numSocle":"242","denomination":"0.02","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Fortune","emplacement":{"x":7,"y":8,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(200,240,250,1)"},{"numMachine":"239","marque":"Bally","numSocle":"239","denomination":"0.02","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Times Line Bet","emplacement":{"x":6,"y":7,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(200,240,250,1)"},{"numMachine":"240","marque":"Bally","numSocle":"240","denomination":"0.02","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Fixin to Win","emplacement":{"x":7,"y":6,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(200,240,250,1)"},{"numMachine":"241","marque":"Bally","numSocle":"241","denomination":"0.02","billet":"Oui","ticket":"Oui","jeton":"Non","jeu":"Jade of the Dragon","emplacement":{"x":8,"y":7,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"color":"rgba(200,240,250,1)"}],"colorEmplacementVide":"rgba(240,240,240,1)","listeOfObjets":[{"type":"porte horizontale","emplacement":{"x":21,"y":17,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"porte horizontale","emplacement":{"x":20,"y":17,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"bar","emplacement":{"x":19,"y":17,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"bar","emplacement":{"x":19,"y":16,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"bar","emplacement":{"x":18,"y":16,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"bar","emplacement":{"x":17,"y":16,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"bar","emplacement":{"x":16,"y":16,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"bar","emplacement":{"x":15,"y":16,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"porte verticale","emplacement":{"x":13,"y":17,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"mur vertical","emplacement":{"x":13,"y":16,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"porte verticale","emplacement":{"x":13,"y":15,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"caisse","emplacement":{"x":"12","y":"14","occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"caisse","emplacement":{"x":"8","y":"13","occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"caisse","emplacement":{"x":11,"y":13,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"caisse","emplacement":{"x":10,"y":13,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"caisse","emplacement":{"x":9,"y":13,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"mur coin haut gauche","emplacement":{"x":"7","y":"13","occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"mur vertical","emplacement":{"x":"7","y":"14","occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"mur coin bas droit","emplacement":{"x":"7","y":"15","occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"mur horizontal","emplacement":{"x":"6","y":"15","occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"mur horizontal","emplacement":{"x":"5","y":"15","occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"mur horizontal","emplacement":{"x":"4","y":"15","occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"porte verticale","emplacement":{"x":"3","y":"16","occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"porte horizontale","emplacement":{"x":"2","y":"17","occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"porte horizontale","emplacement":{"x":"1","y":"17","occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"mur coin bas gauche","emplacement":{"x":0,"y":17,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"mur vertical","emplacement":{"x":0,"y":16,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"mur vertical","emplacement":{"x":0,"y":15,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"fumoir","emplacement":{"x":0,"y":14,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"fumoir","emplacement":{"x":0,"y":13,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"mur coin bas droit","emplacement":{"x":14,"y":0,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"mur coin bas gauche","emplacement":{"x":10,"y":0,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"mur horizontal","emplacement":{"x":11,"y":0,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"mur horizontal","emplacement":{"x":12,"y":0,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"mur horizontal","emplacement":{"x":13,"y":0,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"table","emplacement":{"x":19,"y":10,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"table","emplacement":{"x":19,"y":8,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"table","emplacement":{"x":19,"y":6,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"mur coin haut gauche","emplacement":{"x":"3","y":"15","occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"mur coin bas droit","emplacement":{"x":3,"y":17,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"mur coin haut droit","emplacement":{"x":13,"y":14,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"mur coin haut gauche","emplacement":{"x":3,"y":10,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"mur vertical","emplacement":{"x":3,"y":11,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"mur vertical","emplacement":{"x":4,"y":11,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"mur coin bas droit","emplacement":{"x":4,"y":12,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"mur coin bas gauche","emplacement":{"x":3,"y":12,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"mur coin haut droit","emplacement":{"x":4,"y":10,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"mur coin haut droit","emplacement":{"x":12,"y":10,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"mur coin haut gauche","emplacement":{"x":11,"y":10,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"mur coin bas droit","emplacement":{"x":12,"y":11,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"},{"type":"mur coin bas gauche","emplacement":{"x":11,"y":11,"occupe":true,"menu":"<div class=\'menuEmplacement\'><p class=\'menuTitle\'><span>Menu</span></p><p class=\'options\'><label class\'menuSupp\'>Supprimer</label></p></div>"},"couleur":"rgba(240,240,240,1)","image":"url(data/img/none.png)"}],"typeObjetPossible":["bar","porte horizontale","porte verticale","fumoir","caisse","mur horizontal","mur vertical","mur coin bas droit","mur coin bas gauche","mur coin haut droit","mur coin haut gauche","table"],"name":"default"}');
			
			// On cast chaque Objet en son type propre
				// Les machines a sous, en machineASous
			for(var key in parc.listeOfMachines){
				parc.listeOfMachines[key].__proto__ = MachineASous.prototype;
				parc.listeOfMachines[key].constructor.call(parc.listeOfMachines[key]);
			}
			
			// Les objets, en Objet
			for(var key in parc.listeOfObjets){
				parc.listeOfObjets[key].__proto__ = Objet.prototype;
				parc.listeOfObjets[key].constructor.call(parc.listeOfObjets[key]);
			}
			
				// le parc de jeu en parcDeJeu
			parc.__proto__ = ParcDeJeu.prototype;
			parc.constructor.call(parc);

			
			return parc;			
	};
	
	
	
	
	
	
	
	/* RETOURN LES POSSIBILITE DE PARC A CHARGER */
	ParcDeJeu.prototype.possibiliteCharge = function(){};
	
	
	
	
	
	/* AJOUT MACHINE */
	ParcDeJeu.prototype.ajoutMachine = function(machine){};
	
	
	
	
	/* CORRIGE DENO */
	ParcDeJeu.prototype.corrigeDenomination = function(deno){

		//>>>>>> On corriger la saisie 'denomitation'
		// On corrige, virgule => point
		deno = deno.replace(",",".");
		// on enleve tout signe particulier avant on apres les numeriques
		var tab = deno.match(/[0-9\.]*/g); // retourn un tableau avec chaque index soit vide, soit le numerique voulu
		for(var key in tab){ // on tri et recupere juste le numeric
			if(tab[key] != ""){
				deno = tab[key];
				break;
			}
		}
		// On transforme en float 
		deno = parseFloat(deno);
		// on retransforme en string
		deno = deno + "";
		//ajoute  les zeros et . manquant
		var tab = deno.split(".");
		if(tab.length <= 1 )
			deno = deno+".00";
		else if(tab[1].length <= 1 )
			deno = deno + "0";
		/* FIN DENO CORRIGE */
		return deno;
	};
	
	
	
	/* UPDATE UNE MACHINE */
	ParcDeJeu.prototype.updateMachine = function( numMachine, marque, numSocle, deno, billet, ticket, jeton, jeu){};
	
	
	
	/* SUPPRIMER UNE MACHINE */
	ParcDeJeu.prototype.supprimerMachine = function(numeroMachine){};
	
	
	
	/* RECUPERER UNE MACHINE */
	ParcDeJeu.prototype.getMachine = function(numeroMachine){
		// on cherche la machine egale au numero et on la retourne
		for(key in this.listeOfMachines){
			var num = this.listeOfMachines[key].numMachine;
			if(num == numeroMachine)
				return this.listeOfMachines[key];
		}
		
		return null;
	};
	
	
	
	/* ATTRIBUT UN EMPLACEMENT A UNE MACHINE */
	ParcDeJeu.prototype.setEmplacementToMachine = function(numeroMachine,emplacement){
		
		// on cherche la machine egale au numero et on affecte l'enplacement
		for(key in this.listeOfMachines){
			var num = this.listeOfMachines[key].numMachine;
			if(num == numeroMachine){
				this.listeOfMachines[key].emplacement = emplacement;
				
				// si on autoSave, alors on save
				if($("#butAutoSave").is(':checked'))
					this.saveEtat();
				
				return true;
			}
		}
		return false;
	};
	
	
	
	/* ATTRIBUT UN EMPLACEMENT A UN OBJET */
	ParcDeJeu.prototype.setEmplacementToObjet = function(type,emplacement){		
		this.listeOfObjets.push(new Objet(type, emplacement));

		// si on autoSave, alors on save
		if($("#butAutoSave").is(':checked'))
			this.saveEtat();
	};
	
	
	
	// EVENT SUR VOIR VOS MACHINES
	ParcDeJeu.prototype.eventVoirMachines = function(){};

	
	
	// EVENT SUR EMPLACEMENT
	ParcDeJeu.prototype.eventEmplacement = function(){
		var moi = this;
		
		// CORRIGE POSITION DETAIL
		var corrigeDroitGaucheHautBasDetail = function(x,y){
			// DROITE ou GAUCHE ? on regarde on se situe la machine (si elle est au bord a droite, on modifie la pos des details
			var SCREEN_WIDTH = (window.innerWidth) - 5;
			var SCREEN_HEIGHT = (window.innerHeight) - 5;
			var widthDetail = $("#detailMachine").css("width").substr(0,$("#detailMachine").css("width").length -2);
			var heightDetail = $("#detailMachine").css("height").substr(0,$("#detailMachine").css("height").length -2);
			
			var gauche = false;
			// DROITE GAUCHE
			if( (SCREEN_WIDTH/2) - x < 0){
				x = x - widthDetail - 30; // 30 = marge -> BEAUTIFFUL

				gauche = true;
			}else{
				gauche = false;
			}
			
			
			// HAUT BAS
			if( (SCREEN_HEIGHT/2) - y < 0){
				y = y - heightDetail - 30; // 30 = marge -> BEAUTIFFUL

				if(gauche)
					$("#detailMachine").css("border-radius","15px 15px 0px 15px");
				else
					$("#detailMachine").css("border-radius","15px 15px 15px 0px");
			}else{
				if(gauche)
					$("#detailMachine").css("border-radius","15px 0px 15px 15px");
				else
					$("#detailMachine").css("border-radius","0px 15px 15px 15px");
			}
			
			
			
			return new Array(x,y);
		};
		
		moi.defaultShadowEmplacement(null,null);
		
		
		
		// Retourn la chaine avec comme premiere lettre une MAJUSCULE
		var getMaj = function(str){
			var s = "";
			for(var k in str)
				s += (k == 0 ? str[k].toUpperCase() : str[k]);
			return s;
		};
		
		// CLICK SUR EMPLACEMENT
		$(".emplacement").unbind("click");
		$(".emplacement").click(function(){
			var type= $(this).find(".titleEmplacement").text();
			if(	(type != "undefined" && type != undefined && type != null && type != "") ){// != EMPLACEMENT VIDE
				var eM = $("#popUpDetailMAS");
				eM.css("display","inline");
				var titleType = "Vide";
				var num = marque = socle = deno = paiement = jeu = denierPaiement = "Aucun";

				if(type.toLowerCase().match(/machine/gi) != null){// EMPLACEMENT MACHE
					titleType = "Machine à Sous";
					num = $(this).find(".num").text();
					var mach = moi.getMachine(parseInt(num));
					marque = mach.marque;
					socle = mach.numSocle;
					deno = mach.denomination+"€";
					paiement = mach.getPaiement();
					jeu = mach.jeu;
					denierPaiement = "Aucun";
				}else{// EMPLACEMENT OBJET
					titleType = (type.match(/mur/gi) != null ? "Mur" : type.match(/porte/gi) != null ? "Porte" : getMaj(type));
				}
				var elC = eM.find(".contentInfos");
				elC.find(".numO").text(num);
				elC.find(".marqueO").text(marque);
				elC.find(".numSocleO").text(socle);
				elC.find(".denoO").text(deno);
				elC.find(".paiementO").text(paiement);
				elC.find(".jeuO").text(jeu);
				elC.find(".dernierPaiementO").text(denierPaiement);
				
				eM.find(".typeObjet").text(titleType);
				eM.animate({"opacity":"1"},400);
			}
		});
	};
	
	
	

	
	
	
	
	// REMET SHADOW HOVER EMPLACEMENT PAR DEFAUT
	ParcDeJeu.prototype.defaultShadowEmplacement = function(row,column){
		var elem = (row == null && column == null ? $(".emplacement") : $(".emplacement[data-row='"+row+"'][data-column='"+column+"']")	);
		// on remet les hover par default
		elem.css("box-shadow","0px 0px 3px rgba(70,70,190,0)");
		elem.hover(function(){
			$(this).css("box-shadow","0px 0px 3px rgba(70,70,190,0.8)");
		},function(){
			$(this).css("box-shadow","0px 0px 3px rgba(70,70,190,0)");
		});
		// on remet le active par default
		elem.mousedown(function(){
			$(this).css("box-shadow","inset 0px 0px 3px rgba(70,70,190,0.8)");
		});
		elem.mouseup(function(){
			$(this).css("box-shadow","0px 0px 3px rgba(70,70,190,0.8)");
		});
	};
	
	
	
	
	// CHANGE L'OBJET D'EMPLACEMENT
	ParcDeJeu.prototype.changeEmplacement = function(thisEmplacement, toEmplacement){
		// on recupere les infos
		var content = thisEmplacement.html();
		var bg = thisEmplacement.css("background-color");
		var dataBg = thisEmplacement.attr("data-bg");
		
		if(toEmplacement != null){
			var newRow = toEmplacement.attr("data-row");
			var newColumn = toEmplacement.attr("data-column");
		}
		
		var ancienRow = thisEmplacement.attr("data-row");
		var ancienColumn = thisEmplacement.attr("data-column");
		
		if(toEmplacement != null){
			// on depose le nouveau
			toEmplacement.html(content);
			toEmplacement.css('background-color',bg);
			toEmplacement.attr('data-occupe','true');
			toEmplacement.attr('data-bg',dataBg);
		}
		
		
		//on libert le precedent
		this.libertEmplacement(ancienRow,ancienColumn);
		
		// si le type est une machine, on lui fait parvenir
		var type =thisEmplacement.find(".titleEmplacement").text().toLowerCase();
		if( type == "machine"){
			// on recupere la machine
			var num = thisEmplacement.find(".num").text();
			var machine = this.getMachine(num);
			
			if(toEmplacement != null){
				machine.emplacement.x = newColumn;
				machine.emplacement.y = newRow;
			}else
				machine.emplacement = null;
		}// si c'est un objet, on fait de meme 
		else if( $.inArray(this.typeObjetPossible, type)){
			
			// on parcourt la liste d'objet a la recherche du correspondant
			for(var key in this.listeOfObjets){
				if(this.listeOfObjets[key].emplacement.x == ancienColumn)
					if(this.listeOfObjets[key].emplacement.y == ancienRow){
						
						// si cest pour le supprimer , on le fait, sinon on le change de place
						if(toEmplacement != null){
							this.listeOfObjets[key].emplacement.x = newColumn;
							this.listeOfObjets[key].emplacement.y = newRow;
						}else
							this.listeOfObjets.splice(key,1);
					}
			}
		}
		
		// si on autoSave, alors on save
		if($("#butAutoSave").is(':checked'))
			this.saveEtat();
	};
	
	
	
	
	
	// LIBERT UN EMPLACEMENT
	ParcDeJeu.prototype.libertEmplacement = function(row, column){
		var empl = $(".emplacement[data-row='"+row+"'][data-column='"+column+"']");
		empl.unbind("mousemove");
		empl.css("background-color",this.colorEmplacementVide);
		empl.attr('data-occupe','false');
		empl.attr('data-bg','');
		empl.children('.contentEmplacement').html("");
	};
	
	
	
	
	// AFFECTE UN CSS A L'EMPLACEMENT DE LA MACHINE
	ParcDeJeu.prototype.setCSS2Emplacement = function(numMachine,jsonCss){
		
		$(".emplacement").each(function(){
			if(this.ancienNumSearch != null && this.ancienCSSSearch != null){
				if($(this).find(".num").text() == this.ancienNumSearch){
					$(this).css("background-color",this.ancienCSSSearch);
				}
			}
			if( numMachine != undefined && numMachine != null && numMachine != ""){
				if($(this).find(".num").text() == numMachine){

					this.ancienCSSSearch = $(this).css("background-color");
					this.ancienNumSearch = numMachine;
					$(this).css(jsonCss);
				}
			}
		});


	};
	
	
	
	
	// OBJET CONTENU EMPLACEMENT
	var ContenuEmplacement = function(row,column,content){
		this.row = row || 0;
		this.column = column || 0;
		this.content = content || "";
	};
//});
	
	