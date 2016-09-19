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
    first_name VARCHAR( 50 ),
    last_name VARCHAR( 150 ),
    title VARCHAR (20),
    gender VARCHAR (10),
    bvn VARCHAR(255),
    marital_status VARCHAR (50),
    dependants INT,
    street VARCHAR (255),
    state VARCHAR(255),
    city VARCHAR (255), 
    email VARCHAR( 255 ),
    password VARCHAR(255),
    phone INT
    );";

array_push($list, $sql);

$req = "loan_request";
$new_sql = "CREATE TABLE IF NOT EXISTS $req (
    id INT( 11 ) AUTO_INCREMENT PRIMARY KEY,
    amount FLOAT NOT NULL,
    email VARCHAR( 255 ) NOT NULL,
    interest FLOAT NOT NULL,
    servicefee FLOAT NOT NULL,
    total FLOAT NOT NULL,
    repayment_date DATE NOT NULL,
    approved BOOL DEFAULT FALSE,
    paid BOOL DEFAULT FALSE);";

array_push($list, $new_sql);

$preq = "access";
$new_psql = "CREATE TABLE IF NOT EXISTS $preq (
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin BOOL DEFAULT FALSE
    );";

array_push($list, $new_psql);

$pre = "token";
$new_pre = "CREATE TABLE IF NOT EXISTS $preq (
    email VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    is_expired BOOL DEFAULT FALSE
    );";

array_push($list, $new_pre);

foreach ($list as $data) {
    $pdo->exec($data);
}

$access = 'INSERT INTO access
  (email , password, is_admin)
VALUES
  ("admin@ecogeneral.com", "$2y$10$EVuA0LzkvGesqvkD9ONwsOZQtIgqrG08pSSVlN8gQApWVV7C8LuGa", TRUE );';

$obj = $pdo->prepare($access);
$obj->execute();