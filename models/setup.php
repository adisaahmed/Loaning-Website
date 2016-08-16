<?php

/**
 * Created by PhpStorm.
 * User: stikks
 * Date: 8/4/16
 * Time: 12:21 AM
 */

require __DIR__ . '/../index.php';

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
    title VARCHAR (20) NOT NULL,
    gender VARCHAR (10) NOT NULL,
    date_of_birth VARCHAR (100) NOT NULL,
    age INT (5) NOT NULL,
    mobile INT (10) NOT NULL,
    residential_status VARCHAR (100) NOT NULL,
    marital_status VARCHAR (50) NOT NULL,
    dependants INT (5) NOT NULL,
    house_number INT (10) NOT NULL,
    street VARCHAR (255) NOT NULL,
    suburb VARCHAR(255) NOT NULL,
    city VARCHAR (255) NOT NULL,
    province VARCHAR (255) NOT NULL,
    postal_code VARCHAR (100) NOT NULL,
    survey VARCHAR (255) NOT NULL, 
    email VARCHAR( 255 ) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL);";

array_push($list, $sql);

$req = "loan_request";
$new_sql = "CREATE TABLE IF NOT EXISTS $req (
    id INT( 11 ) AUTO_INCREMENT PRIMARY KEY,
    amount FLOAT NOT NULL,
    email VARCHAR( 255 ) NOT NULL,
    interest FLOAT NOT NULL,
    servicefee FLOAT NOT NULL,
    total FLOAT NOT NULL,
    status VARCHAR (100) NOT NULL);";

array_push($list, $new_sql);

$preq = "access";
$new_psql = "CREATE TABLE IF NOT EXISTS $preq (
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin BOOL DEFAULT FALSE
    );";

array_push($list, $new_psql);

foreach ($list as $data) {
    $pdo->exec($data);
}

$user = Access::create($pdo, "admin@general.com", "general", true);
print_r($user);
