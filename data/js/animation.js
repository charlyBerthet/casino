var Animation = function(){
	this.isFirstAccueil = true;
};


Animation.prototype.firstAccueil = function(){
	
	var changeText = function(txt,callback){
		$(".infos").fadeTo("slow",0,function(){
			$(this).html(txt);
			$(this).fadeTo("slow",1,function(){
				setTimeout(function(){callback();},2500);
			});
		});
	};
	var div = $("<div id='firstAccueil' style='opacity:0.3;'>");
	div.append('<a href="#" id="butStopFirstAccueil" class="ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all">No text</a>');
	div.append("<h3 class='txtCenter'><span class='txtVBig bigBold'>Bienvenu</span></h3>");
	div.append("<div class='infos txtCenter' style='opacity:0;'>Au Casino de Megeve, Groupe Lucien Barrière</div>");
	div.append("<img class='arrowL' alt='fleche gauche' style='opacity:0;' src='data/img/animation/flecheGauche.png' />");
	$("body").append(div);
	
	$("#butStopFirstAccueil").click(function(){
		$("#firstAccueil").remove();
	});
	
	$("#firstAccueil").animate({// On deplace tout a droite
		"left":"60%",
		"opacity":"1"
	},3500,function(){
		$(this).animate({"left":"45%"},1500	,function(){ // puis a gauche
			$(this).animate({"left":"50%"},1000	,function(){ // puis a droite
				setTimeout(function(){
					$(".infos").fadeTo(2500,1,function(){ // on affiche casino megeve
						setTimeout(function(){
							$("#firstAccueil").animate({	// on remonte
								"top":"0px",
								"margin-top":"0px"
							},2000,function(){	// on calcul la taille des LI
								var headH = parseInt($("div[data-role='header']").css("height").split("px")[0]);
								var headListH = parseInt($("#menuListe").children("li[role='heading']").css("height").split("px")[0]);
								var listH = parseInt($("#menuListe").children("li[role='heading']").next("li").css("height").split("px")[0]);
								var nbLi = CONFIG["MENU_LISTE"].length;
								var meH = 26 + parseInt($("#firstAccueil").css("height").split("px")[0]);
								var mTop = headH + headListH - (meH);
								// on affiche je vais vous presenter
								changeText("Je vais vous presenter les differentes sections de cette application.",function(){
									
									var txtInfos = new Array(
											"Ici vous pourrez voir tout les événements préparés par le Casino de Megeve.",
											"Dans cette section vous aurez toutes les informations sur notre Restaurant.",
											"Le Casino de Megeve fait aussi Purple Lounge ! Pour en savoir plus, c'est ici.",
											"<span class='sousLigne bold'>TOUTES</span> les infos sur nos Machines à Sous dans cette partie.",
											"Poker, Roulette Anglaise, Black Jack,... Pour en savoir plus, c'est par ici.",
											"Une Discothèque en face du Casino ! Le Palo Alto.",
											"Vous manquez encore d'information ? Le reste est ici."
									);
									var cpt = 0;
									
									var presente = function(callback,cpt,txtInfos,callbackEnd){
										$("#firstAccueil").animate({							// on se positionne sur LI
											"top":(mTop + ((listH)*cpt))+"px"
										},2000,function(){						
											$(".arrowL").fadeTo("slow",1);// show fleche
											changeText(txtInfos[cpt],function(){						// change text + pause
												$(".arrowL").fadeTo("slow",0,function(){	// cache fleche
													if(cpt>= txtInfos.length -1)
														callbackEnd();
													else{
														cpt = cpt + 1;	
														callback(callback,cpt,txtInfos,callbackEnd);
													}
														
												});
											});
										});
									};
									
									presente(presente,cpt,txtInfos,function(){
										changeText("Le Casino de Megeve vous souhaite une bonne navigation !",function(){	
											$("#firstAccueil").animate({							// on se positionne sur LI
												"top":"0px",
												"opacity":"0"
											},3000,function(){
												$("#firstAccueil").remove();
											});
										});
									});
									
								});
							});
						},1000);
					});
				},300);
			});
		});
	});
	
	this.isFirstAccueil = false;
};