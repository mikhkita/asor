<?php
	require_once("phpmail.php");

	session_start();

	$email_admin = "mike@kitaev.pro";
	// $email_admin = "soc.taxi.35@gmail.com";

	$chatid = "245407908";
	// $chatid = "-298611941";

	$token = "bot641136161:AAFJMCgHgpzYrytWuTzH4Z1gHqeXqTLw6aI";

	function sendMessage($messaggio) {
	    global $token;
	    global $chatid;
		file_get_contents("http://redder.pro/api/sendTelegram.php?message=".urlencode($messaggio)."&chatid=".$chatid."&token=".$token);
		return true;
	}

	$from = "“Туры на Роза Хутор”";
	$email_from = "robot@snowtrvl.ru";

	$deafult = array("name"=>"Имя","phone"=>"Телефон", "email"=>"E-mail", "tour" => "Тур", "city" => "Город вылета", "date" => "Дата вылета", "count" => "Количество человек", "business" => "Билеты бизнесс-класса");

	$fields = array();

	if( count($_POST) ){

		foreach ($deafult  as $key => $value){
			if( isset($_POST[$key]) ){
				$fields[$value] = $_POST[$key];
			}
		}

		$i = 1;
		while( isset($_POST[''.$i]) ){
			$fields[$_POST[$i."-name"]] = $_POST[''.$i];
			$i++;
		}

		$subject = $_POST["subject"];

		$title = "Поступила заявка с сайта ".$from.":\n";

		$message = "<div><h3 style=\"color: #333;\">".$title."</h3>";
		$text = $subject."\n";

		if( isset($_SESSION["city"]) ){

		}

		$text .= "Город: ". ( (isset($_SESSION["city"]))?$_SESSION["city"]:"Не определен" ) ."\n";
		$message .= "<div><p><b>Город: </b>".( (isset($_SESSION["city"]))?$_SESSION["city"]:"Не определен" )."</p></div>";

		foreach ($fields  as $key => $value){
			$message .= "<div><p><b>".$key.": </b>".$value."</p></div>";
			$text .= $key.": ".$value."\n";
		}

		if( isset($_POST["avia"]) ){
			$message .= "<div><p><b>".$_POST["avia"]."</b></p></div>";	
			$text .= $_POST["avia"]."\n";
		}

		if( isset($_SESSION["source"]) && $_SESSION["source"] != "" ){
			$message .= "<div><p><b>Источник: </b>".$_SESSION["source"]."</p></div>";
			$text .= "Источник: ".$_SESSION["source"]."\n";
		}

		if( isset($_SESSION["keyWord"]) && $_SESSION["keyWord"] != "" ){
			$message .= "<div><p><b>Ключевая фраза: </b>".$_SESSION["keyWord"]."</p></div>";
			$text .= "Ключевая фраза: ".$_SESSION["keyWord"]."\n";
		}
			
		$message .= "</div>";
		
		if(send_mime_mail("Сайт ".$from,$email_from,$name,$email_admin,'UTF-8','UTF-8',$subject,$message,true) && sendMessage($text) ){	
			echo "1";
		}else{
			echo "0";
		}
	}
?>