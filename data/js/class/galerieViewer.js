//$(function(){
	


var GalerieViewer = function(jsonParams){
	this.idShow = this.idShow|| jsonParams["idShow"];
	this.elem = this.elem || $("#"+this.idShow);
	this.elem.css("background-color","black");
	
	this.path = this.path || jsonParams["path"];
	this.format = this.format || jsonParams["format"];
	this.length = this.length || jsonParams["length"];
	
	this.num = this.num || 0;
	
	this.ID_IMG = "imgViewerShowCharlyBerthet";
	this.width = this.width || jsonParams["width"];
	this.height = this.height || jsonParams["height"];
	
	this.show();
	this.chargement = $("<img id='chargement' alt='Veuillez patienter...' src='data/img/animation/chargement.gif'/>");
	this.chargement.css({
		"width":"32px",
		"height":"32px",
		"position":"absolute",
		"top":"50%",
		"left":"50%",
		"margin-top":"-16px",
		"margin-left":"-16px"
	});
	this.elImg = null;
};




GalerieViewer.prototype.show = function(){
	this.elem.html(this.chargement);
	var img = $("<img id='"+this.ID_IMG+"' src='"+this.path+"/"+this.num+"."+this.format+"' height='100%'/>");
	var that = this;
	img.unbind("load");
	img.load(function(){
		$("#chargement").remove();
		that.elem.html(img);
		that.elem.css("text-align","center");
		that.elImg = $("#"+that.ID_IMG);
		var me = that;
		var butR = $("<button class='ui-btn ui-btn-icon-right ui-icon-carat-r'></button>");
		var butL = $("<button class='ui-btn ui-btn-icon-left ui-icon-carat-l'></button>");
		
		butR.css({
			opacity:"0.8",
			width:"0px",
			height:"40px",
			display:"inline-block",
			"vertical-align":"top",
			"margin-left":"20px",
			"position":"absolute",
			"right":"40px"
			
		});
		
		butR.click(function(){
			me.nextPhoto(1);
		});
		
		butL.css({
			opacity:"0.8",
			width:"0px",
			height:"40px",
			display:"inline-block",
			"vertical-align":"top",
			"margin-right":"20px",
			"position":"absolute",
			"left":"40px"
		});
		
		butL.click(function(){
			me.nextPhoto(-1);
		});
		
		var divBut = $("<div></div>");
		divBut.append(butL);
		divBut.append(butR);
		divBut.css("display","block");
		divBut.css("margin-top","-55px");
		that.elem.append(divBut);
	});
};



GalerieViewer.prototype.nextPhoto = function(next){
	this.num = this.num + next;
	if(this.num < 0)
		this.num = parseInt(this.length) - 1;
	else if(this.num > parseInt(this.length))
		this.num = 0;
	
	var me = this;
	$("#"+me.ID_IMG).animate({"opacity":"0"},100,function(){
		me.elem.append(me.chargement);
		$("#"+me.ID_IMG).attr({
			"src":me.path+"/"+me.num+"."+me.format
		});
		$("#"+me.ID_IMG).unbind("load");
		$("#"+me.ID_IMG).load(function(){
			$("#chargement").remove();
			$("#"+me.ID_IMG).animate({"opacity":"1"},100);
		});
		
	});
	
};



//});