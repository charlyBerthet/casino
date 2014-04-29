$(function(){

	///////		APERCU EVENT		\\\\\\
	jsNav["eventApercu"]= function(){
		if(document.URL.match(/#event/gi) != null){
			
			// AFFICHE NOUVELLE EVENEMENT
			var showNextEvent = function(time,data){
				$("#infosEvent,#imgEvent").animate({"opacity":"0"},time,function(){

					// AFFICHE IMAGE
					$("#imgEvent").attr({
						"title":data["id"],
						"src":"data/img/event/"+data["id"]+".jpg",
						"alt":"Evenement du casino de megeve pour "+data["id"]+"."
					});

					// AFFICHE TITLE
					$("#infosEvent h4").text(data['title']);
					$("#infosEvent,#imgEvent").animate({"opacity":"1"},time);

					// AFFICHE DATE
					var date = data['date'].split("/");
					var c = new Calendar();
					$("#infosEvent .date").text(date[0]+" "+c.toogleMonth(date[1])+" "+date[2]);

					// AFFICHE CONTENU
					$("#infosEvent .content").text(data['content']);

					// AFFICHE LIEU
					$("#infosEvent .lieu").text(data['lieu']);
				});

			};




			// CHANGE d'EVENEMENT
			var nextEvent = function(time, nxt){

				var next = parseInt(nxt) || 1;
				if(CONFIG["EVENTS"] != undefined && CONFIG["EVENTS"].length >= 1){
					var el = $("#imgEvent");
					// on recherche l'indice actuel
					var idx = null;
					for(var key in CONFIG["EVENTS"])
						if(CONFIG["EVENTS"][key]['id'] == el.attr("title"))
							idx=key;

					// si pas encore d'event ou si on est au bout
					if( (idx == null) || ((next > 0 ) && (idx >= CONFIG["EVENTS"].length-1))){
						showNextEvent(time,CONFIG["EVENTS"][0]);
					} // si on est au debut et on retourne a la fin
					else if(((next < 0 ) && (idx <= 0))){
						showNextEvent(time,CONFIG["EVENTS"][CONFIG["EVENTS"].length-1]);
					}
					// sinon on passe au suivant
					else{
						showNextEvent(time,CONFIG["EVENTS"][parseInt(idx)+(next)]);
					}
				}else
					console.log("IL N'Y A PAS D'EVENEMENT DE PREVUS.... !");
			};
			nextEvent(0);
			if(SCHEDULS["schedulNextEvent"] != null)
				clearInterval(SCHEDULS["schedulNextEvent"]);
			SCHEDULS["schedulNextEvent"] = setInterval(function(){
				nextEvent(600);	
			},15000);
			
			// CHANGE EVENT MANUAL
			$(".butChangeEvent").unbind("click");
			$(".butChangeEvent").click(function(){
				nextEvent(100, $(this).attr("data-idx"));
			});
		}
		
		
		
		var resizeEventApercu= function(){
			// On met la div a la bonne taille
			var SCREEN_WIDTH = (window.innerWidth);
			var SCREEN_HEIGHT = (window.innerHeight);
			var HEADER_HEIGHT = parseInt($("#headerData").css("height").split("px")[0]);
			var FOOTER_HEIGHT = parseInt($("#footerData").css("height").split("px")[0]);
			
			var height = (SCREEN_HEIGHT - (HEADER_HEIGHT+FOOTER_HEIGHT) - 60);
			$("#infosEvent,#imgEvent").css({"height": (height > 200 ? height : 200)	});
			
			$("#eventTab").css({
				"width":SCREEN_WIDTH - 50,
				"height": (height > 200 ? height : 200)
			});
			
			var hInfos = (height > 200 ? height : 200) - parseInt($("#changeEvent").css("height").split("px")[0]) - 10;
			$("#divInfosEvent").css("height",hInfos);
		};
		
		resizeEventApercu();
		$(window).unbind("onresize");
		window.onresize = function(event) {
			resizeEventApercu();
		};
	};
	
	
	
	///////		CALENDRIER EVENT		\\\\\\
	jsNav["eventCalendrier"]= function(){
		
		// Retourn la date de la case
		var getDate = function(day){
			var date = null;
			if(isNaN(day))
				return date;
			var labTab = $(".ui-datebox-gridlabel h4").text().split(" ");
			var c = new Calendar();
			return c.getUnityWithZero(day)+"/"+c.toogleMonth(labTab[0])+"/"+labTab[1];
		};
		
		
		
		// Regarde si il y a un evenement ce jour
		var isThereEvent = function(date){
			for(var idxEvent in CONFIG["EVENTS"])
				if(CONFIG["EVENTS"][idxEvent]["date"] == date)
					return CONFIG["EVENTS"][idxEvent];
			return false;
		};
		
		
		// Pour chaque case on verrifie si il n'y a pas un evenement
		var showDateEventCalendar = function(){
			$(".ui-datebox-griddate").ready(function(){
				$(".ui-datebox-griddate").each(function(){
					
					var date = getDate($(this).text());
					
					var c = new Calendar();
					
					// SI IL Y A UN EVENEMENT ON LE MET EN BLEU
					if(isThereEvent(date) != false && $(this).attr("class").match(/empty/gi) == null){
						$(this).css({
							"background-color":"#22AADD",
						    "border-color":"#22AADD",
						    "color":"#FFFFFF",
						    "text-shadow":"0 1px 0 #0088BB",
						    "box-shadow":"0px 0px 7px #22AADD"
						});
					}
					
					// SI C'EST AUJOURD'HUI ON L'ENFONCE et qu'il n'y a pas d'envent 
					if(c.getToday() == date && $(this).attr("class").match(/empty/gi) == null && isThereEvent(date)== false){
						$(this).css({
							"background-color":"#777777 !important",
						});
					}// AUJOURDHUI + EVENT
					else if(isThereEvent(date) != false && c.getToday() == date && $(this).attr("class").match(/empty/gi) == null){
						$(this).css({
							//"background-color":"#777777 !important",
						});
					}
						
					
				});
				
				$(".ui-input-datebox").css("display","none");
				$(".ui-datebox-container").css({"margin":"-5px"});
			});
			
		};
		
		
		
		// AFFICHE EVENT
		var showEventCal = function(event){
			var dateTab = event["date"].split("/");
			var cal = new Calendar();
			$("#eventCalendrierEventDiv").children("h4").text(dateTab[0]+" "+cal.toogleMonth(dateTab[1])+" "+dateTab[2]+" - "+event["title"]);
			$("#imgEventCal").attr({
				"title":event['id'],
				"alt":"Au casino de Megeve ! Evenement "+event['title']+".",
				"src":"data/img/event/"+event['id']+".jpg"
			});
			$("#contentEventCal").html(event["content"]);
			$("#lieuEventCal").html("Au "+event["lieu"]);
		};
		
		
		
		//	CLICK SUR UNE DATE
		var clickDate = function(elem){
			if(elem.attr("class").match(/empty/gi) == null){
				var date = getDate(elem.text());
				var event = isThereEvent(date);
				
				if(event != false){
					showEventCal(event);
				}
			}
		};
		
		showEventCal(CONFIG["EVENTS"][0]);
		
		showDateEventCalendar();
		$("#eventCalendrier	").unbind("click");
		$("#eventCalendrier	").click(function(){
			showDateEventCalendar();
			
			$(".ui-datebox-griddate").unbind("click");
			$(".ui-datebox-griddate").click(function(){
				clickDate($(this));
			});
		});
		
		$(".ui-datebox-griddate").unbind("click");
		$(".ui-datebox-griddate").click(function(){
			clickDate($(this));
		});
	};
	
	
	
	
	// MAIN EVENT
	SCHEDULS["schedulNextEvent"] = null;
	if(document.URL.match(/event/gi) != null)
		$("a[data-idjs='eventApercu']").click();


});