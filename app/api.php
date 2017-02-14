<?php

	switch($_GET["args"]){
		
		case "city":
			$ret = array("北京", "上海", "福州", "广州", "青岛");
			break;
		case "update":
			$ret = array(
					array("name" => "萱萱1", "time" => "5分钟前","content" => "写了一篇新文章：那些灿烂华美的瞬间1"),
					array("name" => "萱萱2", "time" => "6分钟前","content" => "写了一篇新文章：那些灿烂华美的瞬间2"),
					array("name" => "萱萱3", "time" => "7分钟前","content" => "写了一篇新文章：那些灿烂华美的瞬间3"),
					array("name" => "萱萱4", "time" => "8分钟前","content" => "写了一篇新文章：那些灿烂华美的瞬间4"));
			break;
		case "BBS":
			$ret = array(
					array("title" => "保你没见过的古怪餐厅1", "author" => "世说新语1","img" => "img/content/main/section_6/list_icon_1.png"),
					array("title" => "保你没见过的古怪餐厅2", "author" => "世说新语2","img" => "img/content/main/section_6/list_icon_1.png"),
					array("title" => "保你没见过的古怪餐厅3", "author" => "世说新语3","img" => "img/content/main/section_6/list_icon_1.png"),
					array("title" => "保你没见过的古怪餐厅4", "author" => "世说新语4","img" => "img/content/main/section_6/list_icon_1.png"),
					array("title" => "保你没见过的古怪餐厅5", "author" => "世说新语5","img" => "img/content/main/section_6/list_icon_1.png"),
					array("title" => "保你没见过的古怪餐厅6", "author" => "世说新语6","img" => "img/content/main/section_6/list_icon_1.png"),
					array("title" => "保你没见过的古怪餐厅7", "author" => "世说新语7","img" => "img/content/main/section_6/list_icon_1.png"));
			break;
		case "recommend":
			$ret = array(
					"img/content/main/section_4/list_img_1.png",
					"img/content/main/section_4/list_img_2.png",
					"img/content/main/section_4/list_img_3.png"
					);
			break;
					
		
	}
	
	echo json_encode($ret);

?>