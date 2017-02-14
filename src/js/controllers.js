;(function(){
	
	var appControllers = angular.module("appControllers", []);
	
	
	//------------------- 切换城市controller --------------------//
	appControllers.controller("CityController", ["$scope", "$http", function($scope, $http){
		
		$.ajax({
			method:"GET",
			url:"/100du/app/api.php",
			data: {args: 'city'},
			dataType:"json"
		}).done(function(d){
			
			$scope.cities = d;
			
		});
		
		$scope.index = 0;
		
		$scope.select = function(i){
			
			$scope.index = i;
			
		};
		
		
		
	}]);
	
	//------------------- 主导航controller --------------------//
	appControllers.controller("MainNavController", ["$scope", function($scope){
		
		$scope.navs1 = ["美食", "夜店", "购物", "文化", "休闲"];
		$scope.navs2 = ["烧客空间", "知道分子", "白吃白拿", "烧客论坛", "企业俱乐部"];
		
		$scope.select = function(nav){
			
			$scope.curNav = nav;
			
		};
		
		$scope.curNav = $scope.navs1[0];
		
	}]);
	
	//------------------- 搜索导航controller --------------------//
	appControllers.controller("SearchNavController", ["$scope", function($scope){
		
		$scope.navs = ["搜店", "地址", "优惠卷", "全文", "视频"];
		$scope.index = 0;
		
		$scope.select = function(i){
			
			$scope.index = i;
			
		};
		
		
		
	}]);
	
	
	//------------------- BBSController--------------------//
	appControllers.controller("BBSController", ["$scope", function(scope){
		
		$.ajax({
			method:"GET",
			url:"/100du/app/api.php",
			data: {args: 'BBS'},
			dataType:"json"
		}).done(function(d){
			
			scope.items = d;
			
		});
		
		
		scope.order = ["ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN"];
		scope.index = 0;
		
		scope.mouseEnter = function(index){
			
			scope.index = index;
			
		}
		
	
	}]);
	
	//------------------- 每日活动controller--------------------//
	appControllers.controller("DayController", ["$scope", function($scope){
		
		var ymd = new Date();
		$scope.yd = ymd.getFullYear() + "." + (ymd.getMonth() + 1);
		$scope.m = ymd.getMonth() + 1;
		$scope.d = ymd.getDate();
	
	
	}]);
	
	//------------------- 每日推荐controller --------------------//
	appControllers.controller("RecommendController", ["$scope", function($scope){
		
		$.ajax({
			method:"GET",
			url:"/100du/app/api.php",
			data: {args: 'recommend'},
			dataType:"json"
		}).done(function(d){
			
			$scope.imgs = d;
			
		});
		
		$scope.index = 0;
		
		$scope.mouseEnter = function(index){
			
			$scope.index = index;
			
		}
		
	}]);
	
})();
	
