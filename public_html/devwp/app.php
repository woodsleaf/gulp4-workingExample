<?php

$menua = json_decode(file_get_contents('./config.json'))->menua;
foreach ($menua as $val) {
    if (gettype($val) == 'object') {
        //var_dump(serialize($val));
        $submenua = $val->Ассортимент;
        foreach ($submenua as $value) {
            echo $value;
        }
    } else {
        echo $val;
    }
}
//var_dump($menua);
// var_dump(__DIR__); // полный путь
// var_dump($_SERVER['DOCUMENT_ROOT']);  // корень сайта
require_once './vendor/autoload.php';  // __DIR__ .

Phug::displayFile('./devwp/tpl-pug/index.pug');