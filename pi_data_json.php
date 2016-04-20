<?php
/**
 * Created by PhpStorm.
 * User: AVGorbunov
 * Date: 20.04.2016
 * Time: 19:36
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$arr = array('a' => 1, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 5, 'массив' => array('a' => 1, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 5));

echo json_encode($arr);
