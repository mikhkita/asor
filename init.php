<?

session_start();

function my_mb_ucfirst($str) {
	$fc = mb_substr($str, 0, 1, "UTF-8");
	if( $fc == "<" ){
		$pos = mb_strpos($str, ">", 0, "UTF-8") + 1;
		return mb_substr($str, 0, $pos, "UTF-8").mb_strtoupper(mb_substr($str, $pos, 1, "UTF-8"), "UTF-8").mb_substr($str, $pos + 1, NULL, "UTF-8");
	}else{
		return mb_strtoupper($fc, "UTF-8").mb_substr($str, 1, NULL, "UTF-8");
	}
}

function generateText($pattern, $keyWord, $data){
	preg_match_all("~\#([^\#]+)\#~", $pattern, $matches);

	if( count($matches[1]) ){
		$genData = generateData($keyWord, $data);

		$values = getValues($matches[1], $genData);

		$title = my_mb_ucfirst( str_replace($matches[0], $values, $pattern) );
	}else{
		$title = $pattern;
	}

	return $title;
}

function generateData($keyWord, $data){
	$out = array();
	foreach ($data as $code => $item) {
		$tmp = intersectArray($keyWord, $item->values);
		$out[$code] = (object) array(
			"relation" => (isset($item->relation))?$item->relation:NULL,
			"value" => $tmp->value,
			"p" => (isset($tmp->p))?$tmp->p:0
		);
	}
	return $out;
}

function getValues($codes, $data){
	$out = array();
	foreach ($codes as $code) {
		$item = $data[$code];

		if( is_array($item->value) ){  // Если значение множественное, то выбираем значение по связи с relation
			if( $link = $data[$item->relation] ){ // Если объект, на который ссылается текущий, существует
				$value = $item->value[ ( isset($item->value[$link->p]) )?$link->p:0 ];
			}else{
				$value = $item->value[0];
			}
		}else{
			$value = $data[$code]->value;
		}
		$out[$code] = $value;
	}
	return $out;
}

function intersect($str, $arr){
	foreach($arr as $arr_item){
		// echo "arr_item " . $arr_item . " pos in " . $str . ": " . strpos($str, $arr_item)."<br>";
		if(strpos($str, $arr_item) !== false){
			return true;
		}
	}
	return false;
}

function intersectArray($keyWord, $arr){
	foreach ($arr as $key => $item) {
		if( $item->keys === NULL || intersect($keyWord, $item->keys) ){
			if( !(is_array($item->exclude) && intersect($keyWord, $item->exclude)) ){
				return $item;
			}
		}
	}
	return $item;
	// return $default;
}

function getSource(){
	if( isset($_SESSION["source"]) ) return true;

	if( isset($_SERVER["HTTP_REFERER"]) && $_SERVER["HTTP_REFERER"] != "" ){
		$refer = $_SERVER["HTTP_REFERER"];
	}else{
		$refer = NULL;
	}
	$source = "Неизвестен";
	$keyWord = NULL;

	if( isset($_GET["utm_source"]) ){
		$sources = array(
			"yandex.search" => "Яндекс.Директ (поиск)",
			"yandex.context" => "Яндекс.Директ (РСЯ)",
			"yandex.context.mob" => "Яндекс.Директ (РСЯ, мобильн.)",
			"yandex.banner" => "Яндекс.Директ (Баннер)",
			"yandex.source" => "Яндекс.Директ (Баннер)",
			"google.search" => "Google Adwords (поиск)",
			"google.gdn" => "Google Adwords (КМС)",
			"yadirect" => "Яндекс.Директ (поиск)",
			"vk" => "Таргет Вконтакте"
		);
		if( isset($sources[ $_GET["utm_source"] ]) ){
			$source = $sources[ $_GET["utm_source"] ];
		}else{
			$source = $_GET["utm_source"];
		}

		$keyWord = $_GET["utm_term"];
		// $keyWord = $_GET["utm_content"];
	}elseif( strpos($refer, "vk.com") !== false ){
		$source = "Вконтакте";
	}elseif( strpos($refer, "link.2gis.ru") !== false ){
		$source = "2Gis";
	}elseif( strpos($refer, "instagram.com") !== false ){
		$source = "Инстаграм";
	}elseif( strpos($refer, "yandex.ru") !== false ){
		$source = "Яндекс (органика)";
	}elseif( strpos($refer, "google.ru") !== false ){
		$source = "Google (органика)";
	}

	$_SESSION["source"] = $source;
	$_SESSION["keyWord"] = $keyWord;
}

?>