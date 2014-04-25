var Calendar = function(){
	
	this.months = {
			"01":["janvier","january"],
			"02":["février","fevrier","february"],
			"03":["mars","march"],
			"04":["avril","april"],
			"05":["mai","may"],
			"06":["juin","june"],
			"07":["juillet","july"],
			"08":["aout","august"],
			"09":["septembre","september"],
			"10":["octobre","october"],
			"11":["novembre","november"],
			"12":["decembre","december"]
	};
};

Calendar.prototype.toogleMonth = function(month){
	if(isNaN(month)){ // si c'est un string on retourn numerique
		for(var m in this.months)
			for(var k in this.months[m])
				if(this.months[m][k] == month.toLowerCase())
					return m;
	}else{// Si c'est un numerique on retourne la chaine
		return this.months[month][0];
	}
};




Calendar.prototype.getUnityWithZero = function(u){
	if(! isNaN(u))
		if(parseInt(u) < 10)
			return "0"+u;
	return u;
};




Calendar.prototype.getToday = function(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	return this.getUnityWithZero(dd)+"/"+this.getUnityWithZero(mm)+"/"+this.getUnityWithZero(yyyy);
};
