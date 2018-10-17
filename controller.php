<?

$keyWord = (isset($_GET["utm_term"]))?$_GET["utm_term"]:NULL;

$cities = array(
	"msk" => "из Москвы",
	"spb" => "из Санкт-Петербурга",
	"tom" => "из Томска",
	"kem" => "из Кемерово",
	"brn" => "из Барнаула",
	"krs" => "из Красноярска",
	"nsb" => "из Новосибирска",
);

$city = NULL;

if( isset($_GET["city"]) && isset($cities[$_GET["city"]]) ){
	$city = $cities[$_GET["city"]];
	$_SESSION["city"] = $city;
}else if( isset($_SESSION["city"]) ){
	$city = $_SESSION["city"];
}

$data = array(
	"CITY" => (object) array(
		"values" => array(
			(object) array(
				"value" => "из Новокузнецка",
				"keys" => array("новокуз", "кузни", "кузня", "кузне"),
			),
			(object) array(
				"value" => $city,
				"keys" => NULL,
			),
		)
	),
);

if( $city ){
	$pattern = "Горнолыжные туры на «Роза Хутор» <b>#CITY#</b>";
}else{
	$pattern = "Горнолыжные туры <b>на «Роза Хутор»</b>";
}

$title = generateText($pattern, $keyWord, $data);

$browserTitle = strip_tags($title);

?>