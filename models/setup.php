<?php

/**
 * Created by PhpStorm.
 * User: stikks
 * Date: 8/4/16
 * Time: 12:21 AM
 */

require __DIR__ . '/../public/index.php';

$container = $app->getContainer();
$db = $container->get('settings')['db'];
$pdo = new PDO("mysql:host=". $db['host']. ";dbname=". $db['dbname'], $db['user'], $db['pass']);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

$list = array();
$table = "users";
$sql = "CREATE TABLE IF NOT EXISTS $table (
    id INT( 11 ) AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR( 50 ) NOT NULL,
    last_name VARCHAR( 150 ) NOT NULL,
    email VARCHAR( 255 ) NOT NULL,
    password VARCHAR( 255 ) NOT NULL,
    role VARCHAR( 50 ) NOT NULL,
    address VARCHAR( 255 ) NOT NULL,
    phone VARCHAR( 50 ) NOT NULL);";

array_push($list, $sql);

$req = "loan_request";
$new_sql = "CREATE TABLE IF NOT EXISTS $req (
    id INT( 11 ) AUTO_INCREMENT PRIMARY KEY,
    amount FLOAT NOT NULL,
    email VARCHAR( 255 ) NOT NULL,
    interest FLOAT NOT NULL,
    servicefee FLOAT NOT NULL);";

array_push($list, $new_sql);

foreach ($list as $data) {
    $pdo->exec($data);
}

//$user = Users::create_admin($pdo, "admin@general.com", "password", "Admin", "General", "sadghsvahds", "098874323256");
//print_r($user);
