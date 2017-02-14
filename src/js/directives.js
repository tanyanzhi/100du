;(function(){
	
	var appDirectives = angular.module("appDirectives", []);
	
	//------------------- input文字默认值切换directive --------------------//
	appDirectives.directive("toggle", function(){
		
		var o = {}
		
		o.restrict = "A";
		o.scope = {
			defaultValue: "@value"
		};
		
		o.link = function(scope, el, attr){
			
			el.on("focus", function(){
				
				if(el.val() == scope.defaultValue){
					
					el.val("");
					
				}
				
			});
			
			el.on("blur", function(){
				
				if(el.val() == ""){
					
					el.val(scope.defaultValue);
					
				}
				
			});
			
		}
		
		return o;
		
	});
	
	//------------------- 搜索区域滚动列表directive--------------------//
	appDirectives.directive("verticalScroll", ["$timeout", function($timeout){
		
		var o = {};
		o.restrict = "AE";
		o.scope={};
		o.templateUrl = "tpl/vertical_scroll.html";
		o.link = function(scope, el, attr){
			
			$.ajax({
				method:"GET",
				url:"/100du/app/api.php",
				data: {args: 'update'},
				dataType:"json"
			}).done(function(d){
				
				//1.先提供数据使得ng-repeat生成dom
				scope.items = d;
				
				//2.再复制dom，并自动播放,这里要延迟一会
				$timeout(function(){
				
					iHeight = parseInt(oWrap.find("a").eq(0).height());
					len = oWrap.find('a').length;
					oWrap.html(oWrap.html() + oWrap.html());
					
					autoPlay();
					
				}, 500);
				
				
			});
			
			var oUp = el.find(".triangle-up").eq(0);
			var oDown = el.find(".triangle-down-red").eq(0);
			var oWrap = el.find(".wrap").eq(0);
			
			var len;
			
			var iHeight;
			var iNow = 0;
			var iTop = iNow * iHeight;
			var isFinish = true;
			var timer;
			
			//自动播放
			function autoPlay(){
				
				timer = setInterval(moveUp, 3000);
				
			}
			
			//单击向上滚动
			oUp.on('click', function(){
				
				clearInterval(timer);
				timer = null;
				
				//动画停止后才可点击滚动
				if(isFinish){
					
					isFinish = false;
					
					moveUp();
					
					
				}
				

			});
			
			//单击向下滚动
			oDown.on('click', function(){
				
				clearInterval(timer);
				timer = null;
				
				//动画停止后才可点击滚动
				if(isFinish){
					
					isFinish = false;
				
					moveDown();
					
				}
				
			});
			
			//鼠标移入停止移除滚动
			oWrap.on("mouseenter", function(){
				
				clearInterval(timer);
				timer = null;
				
			}).on("mouseleave", function(){
				
				autoPlay();
				
			});
			
			
			
			//向上滚动
			function moveUp(){
				
				if(iNow >= len) {
						
					oWrap.css("top", 0);
					iNow = 0;
					
				}
				iNow++;
				iTop = -iNow * iHeight + "px";
				oWrap.animate({"top": iTop}, 500, function(){
					
					isFinish = true;
					
					if(timer == null)
						autoPlay();
					
				});
				
			}
			
			//向下滚动
			function moveDown(){
				
				if(iNow <= 0) {
						
					iNow = len;
					oWrap.css("top", -iNow*iHeight);
					
				}
				iNow--;
				iTop = -iNow * iHeight + "px";
				oWrap.animate({"top": iTop}, 500, function(){
					
					isFinish = true;
					
					if(timer == null)
						autoPlay();
				});
				
			}
			
		};
		
		return o;
		
	}]);
	
	//------------------- 选项卡切换directive--------------------//
	appDirectives.directive("tab", function(){
		
		return {
			
			restrict: "E",
			scope:{},
			transclude:true,
			controller:["$scope", function($scope){
				
				var panes = $scope.panes = [];
				
				//点击切换面板
				$scope.select = function(pane){
					
					$.each(panes, function(i, elem) {
						
						elem.selected = false;
						
					});
					
					pane.selected = true;
					
				}
				
				//添加面板
				this.addPane = function(pane){
					
					if(panes.length == 0){
						
						pane.selected = true;
						
					}
					
					panes.push(pane);
					
				}
				
			}],
			templateUrl:function(elem, attr){
				
				return "tpl/tab_" + attr.tpl + ".html";
				
			}
			
		}
		
	}).directive("pane", function(){
		
		return {
			
			restrict: "E",
			scope:{
				title: "="
			},
			require:"^^tab",
			transclude:true,
			link: function($scope, elem, attr, ctrl){
				
				ctrl.addPane($scope);
				
			},
			templateUrl:"tpl/pane.html"
			
		}
		
	});
	
	//------------------- 每日活动的日期directive--------------------//
	appDirectives.directive("day", function(){
		
		return {
			
			restrict: "A",
			link: function(scope, elem, attr){
				
				//商品信息模板1
				var infoTpl1 = '\
					<img src="img/content/main/section_3/product_1.png" class="sm-product today"/>\
					<div class="info">\
						<img src="img/content/main/section_3/product_1.png"/>\
						<span>MON</span>\
						<strong>本日主题XXXXXXXX</strong>\
						<p>迟到的荣誉-维米尔的写实主义风俗画迟到的荣的荣誉维米尔</p>\
					</div>\
					';
					
				//商品信息模板2
				var infoTpl2 = '\
					<img src="img/content/main/section_3/product_2.png" class="sm-product"/>\
					<div class="info">\
						<img src="img/content/main/section_3/product_2.png"/>\
						<span>MON</span>\
						<strong>本日主题XXXXXXXX</strong>\
						<p>迟到的荣誉-维米尔的写实主义风俗画迟到的荣的荣誉维米尔</p>\
					</div>\
					';
				
				var ymd = new Date();
				var curDay = ymd.getDate();
				ymd.setDate(1);
				var weekDay = ymd.getDay();
				ymd = new Date();
				var curMonthDays = new Date(ymd.getFullYear(), ymd.getMonth() + 1, 0).getDate();
				var lastMonthDays = new Date(ymd.getFullYear(), ymd.getMonth(), 0).getDate();
				var str = "";
				
				//根据当前月份动态生成日期元素和样式
				for (var i = 1; i <= 42; i++) {
					
					if(i < weekDay){
						
						str += '<li class="light">' + (lastMonthDays - (weekDay - i - 1)) + '</li>'
						
					}
					
					if(i >= weekDay && i <= curMonthDays + weekDay - 1){
						
						if((i - weekDay + 1) == curDay){
							
							str += '<li>' + (i - weekDay + 1) + infoTpl1 + '</li>';
							
						}else {
							
							if((i - weekDay + 1) == 8){
								
								str += '<li>' + (i - weekDay + 1) + infoTpl2 + '</li>';
								
							}else{
								
								str += '<li>' + (i - weekDay + 1) + '</li>';
								
							}
							
							
						}
						
						
					}
					
					if(i > curMonthDays + weekDay - 1){
						
						str += '<li class="light">' + (i - curMonthDays - (weekDay - 1)) + '</li>'
						
					}
					
				}
				
				elem.html(str);
				
				
				
			}
			
			
		};
		
	});
	
	//------------------- Logo3D翻转 directive--------------------//
	appDirectives.directive("logoTurn", ["$timeout", "toolsService", function($timeout, toolsService){
		
		return {
			
			restrict: "A",
			link: function(scope, elem, attr){
				
				if(toolsService.isIE()){
					
					$(elem).html('<img src="img/main_nav/logo.png" alt="100du" title="100du" id="fixIE-logo" />');	
					return;
					
				}
				
				var oLogoList = $("#logoList");
        		var sLi = "";
        		var sCss = "";
        		var iLiw = 20;
        		var iLength = parseInt(oLogoList.width()/iLiw);
        		var iZindex = 0;
        		
        		//动态生成css样式
        		for (var i = 0; i < iLength; i++) {
        			
        			
        			if(i >= iLength/2){
        				iZindex--;
        			}else{
        				iZindex++;
        			}	
        				
        			sLi += '<li>\
	        			<a href="#"></a>\
	        			<a href="#"></a>\
	        			<a href="#"></a>\
	        			<a href="#"></a>\
	        			<span></span>\
	        			<span></span>\
	        		</li>';
        			
        			sCss += ' .main-nav #logoList li:nth-of-type(' + (i+1) + ') a {\
								background-position: -' + i * iLiw + 'px 0;\
							}';
					sCss += ' .main-nav #logoList li:nth-of-type(' + (i+1) + ') { z-index:' + iZindex + ';}';
					
        		}
        		var iNow = 0;
        		oLogoList.html(sLi);
        		var aLi = $("#logoList li");
        		
        		$("#css").html($("#css").html() + sCss);
        		
        		//自动翻转
        		setInterval(function(){
        			
        			iNow++;
        			
        			aLi.each(function(j){
        					
    					$(this).css("transition", "0.5s " + j * 50 + "ms");
    					$(this).css("transform", "rotateX(-" + iNow * 90 + "deg)");
    					
    				});
        			
        		}, 3000);

				
			}
			
			
		}
		
	}]);
	
	//------------------- 跳跃的文字directive--------------------//
	appDirectives.directive("charactersJump", ["$timeout", function($timeout){
	
		return {
			
			restrict: "A",
			scope:{},
			link: function(scope, elem, attr){
				
				var sHtml = $(elem).html().trim();
				$(elem).css("width", Math.ceil($(elem).width()));
				$(elem).css("height", Math.ceil($(elem).height()));
				$(elem).css("display", "block");
				
        		$(elem).html('');
        		for (var i = 0; i < sHtml.length; i++) {
        			$(elem).html($(elem).html() + "<span>" + sHtml[i] + "</span>");
        		}
        		var aSpan = $(elem).children();
        		var sCss = "";
        		aSpan.each(function(i, e){
        			
        			$(this).css('left', $(this).position().left);
        			$(this).css('top', $(this).position().top);
        			sCss += "#" + attr.id + " span:nth-of-type(" + (i + 1) + ").active {\
						animation: .4s " + (i * 0.15) + "s charactersJump linear;\
					}";
        			
        		});
        		$("#css").html($("#css").html() + sCss);
        			
        		aSpan.each(function(i, e){
        			
        			$(this).css('position', 'absolute');
        			$(this).addClass('active');
        			var self = this;
        			setInterval(function(){
        				
        				$(self).addClass('active');
        				
        			}, 2000);
        				
        			$(this).on('animationend', function(){
        				
        				$(this).removeClass('active');
        				
        			});
        			
        		});

				
			}
			
		}
	
	}]);
	
	
	//------------------- 主导航翻转directive--------------------//
	appDirectives.directive("mainNavRotate", ["$timeout", function($timeout){
	
		return {
			
			restrict:"A",
			link:function(scope, elem, attr){
				
				$timeout(function(){
					
					auto();
					
				}, 0);
				
				setInterval(function(){
					
					auto();
					
				}, 10000);
				
				function auto(){
					
					var aNav1 = $(elem).find(".left a");
					var aNav2 = $(elem).find(".right a");
					
					aNav1.each(function(){
						
						$(this).addClass('rotate');
						
					});
					
					aNav2.each(function(){
						
						$(this).addClass('rotate');
						
					});
					
					$timeout(function(){
						
						aNav1.each(function(){
						
							$(this).removeClass('rotate');
						
						});
						
						aNav2.each(function(){
							
							$(this).removeClass('rotate');
							
						});
						
					}, 8000);
					
				}
				

			}
			
		}
		
	}]);
	

})();
	
