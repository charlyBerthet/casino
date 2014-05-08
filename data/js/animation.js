var Animation = function(){
	this.isFirstAccueil = true;
	this.isFirstContenu = true;
	this.isFirstParc = true;
};

var changeText = function(txt,callback){
	$(".infos").fadeTo("slow",0,function(){
		$(this).html(txt);
		$(this).fadeTo("slow",1,function(){
			setTimeout(function(){callback();},2500);
		});
	});
};




/////////////////			FAIT CLIGNOTER L'ELEMENT		\\\\\\\\\\\\\\\\\\\\\\\\
Animation.prototype.clignote = function(elem,time,twice){
	var cpt = 0;
	var box = elem.css("box-shadow");
	var inter = setInterval(function(){
		if(elem.css("box-shadow") == box)
			elem.css("box-shadow","0 0 18px #22AADD");
		else
			elem.css("box-shadow",box);
		cpt++;
		if(cpt > twice){
			elem.css("box-shadow",box);
			clearInterval(inter);
		}
	},time);
};


////////////////			FIRST PARC			\\\\\\\\\\\\\\\\\\\\\\\\\\\
Animation.prototype.firstParc = function(){
	var div = $("<div id='firstParc' class='anim' >");
	div.append('<a href="#" id="butStopFirstParc" class="butStopFirst ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all">No text</a>');
	div.append("<h3 class='txtCenter'><span class='txtVBig bigBold'>Info</span></h3>");
	div.append("<div class='infos txtCenter' style='opacity:0;'>Clique sur une machine à sous pour voir ses informations !</div>");
	$("body").append(div);
	var that = this;
	var stop = false;
	setTimeout(function(){				// on attend 3 sec
		if(stop){return 0;};
		$("#firstParc").animate({		// on fait descendre la div
			"top":"50%",
			"opacity":"1"
		},1500,function(){
			if(stop){return 0;};
			changeText("Clique sur une machine à sous pour voir ses informations !",function(){
				if(stop){return 0;};
				$(".emplacement").each(function(){
					if(stop){return 0;};
					if($(this).children(".contentEmplacement").children(".titleEmplacement").text().match(/machine/gi) != null)
						that.clignote($(this), 400,15,"mas");
				});
				setTimeout(function(){
					if(stop){return 0;};
					changeText("Tu à une machine préférée ? Pour la retrouver marque son numéro dans la zone qui clignote en haut à droite !",function(){
						that.clignote($("#inSearchMachine"), 300,55);
						setTimeout(function(){
							if(stop){return 0;};
							changeText("Le Casino de Megeve vous souhaite une bonne navigation !",function(){
								if(stop){return 0;};
								$("#firstParc").animate({		// on fait descendre la div
									"top":"-90px",
									"opacity":"0"
								},2000);
							});
						},7000);
					});
				},5000);
			});
			
		});
	},2000);
	
	$("#butStopFirstParc").click(function(){
		stop = true ;
		$("#firstParc").remove();
	});
	this.isFirstParc = false;
};







/////////////////			FIRST CONTENT			\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
Animation.prototype.firstContenu = function(id){
	setTimeout(function(){
		
		var ul = $(id+"").find(".navbar").children("ul");
		var time = 300;
		for(var i=0, liNum=1, sens=1; i< (ul.children("li").length*2) ; i++){
			
			setTimeout(function(){
				if(liNum-1 >= 1 && sens > 0)
					ul.children("li:nth-child("+(liNum-1)+")").children("a").css("box-shadow","none");
				else if(liNum+1 <= ul.children("li").length && sens < 0)
					ul.children("li:nth-child("+(liNum+1)+")").children("a").css("box-shadow","none");
				if(liNum >= ul.children("li").length)
					sens *= -1;
				ul.children("li:nth-child("+liNum+")").children("a").css("box-shadow","0 0 22px #22AADD");
				
				liNum = liNum + sens;
				
			},i*time);
		}
		setTimeout(function(){
			ul.children("li").children("a").css("box-shadow","0 0 22px #22AADD");
			setTimeout(function(){
				ul.children("li").children("a").css("box-shadow","none");
			},500);
		},ul.children("li").length*2*time);
		
	},3000);
	
	
	
	
	this.isFirstContenu = false;
};


/////////////////			FIRST ACCUEIL			\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
Animation.prototype.firstAccueil = function(){
	
	
	var div = $("<div id='firstAccueil' class='anim' style='opacity:0.3;'>");
	div.append('<a href="#" id="butStopFirstAccueil" class="butStopFirst ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all">No text</a>');
	div.append("<h3 class='txtCenter'><span class='txtVBig bigBold'>Bienvenu</span></h3>");
	div.append("<div class='infos txtCenter' style='opacity:0;'>Au Casino de Megeve, Groupe Lucien Barrière</div>");
	div.append("<img class='arrowL' alt='fleche gauche' style='opacity:0;' src='data/img/animation/flecheGauche.png' />");
	$("body").append(div);
	
	$("#butStopFirstAccueil").click(function(){
		$("#firstAccueil").remove();
	});
	$("#menuListe li").click(function(){
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