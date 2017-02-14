;(function(){
	
	var appServices = angular.module("appServices", []);
	
	//------------------- 1-9数字自动补零filter --------------------//
	appServices.service('toolsService', function(){
		
		this.isIE = function(){
			
		    if (!!window.ActiveXObject || "ActiveXObject" in window)  
		        return true;  
		    else  
		        return false;  
			
		}
		
		
	});
	
})();
	
