;(function(){
	
	var appFilters = angular.module("appFilters", []);
	
	//------------------- 1-9数字自动补零filter --------------------//
	appFilters.filter('addZero', function(){
		
		return function(num){
			
			if(num < 10) {
				
				return "0" + num;
				
			}
			
			return num;
			
		}
		
		
	});
	
	
})();
	
