<?php
/**
 * Created by PhpStorm.
 * User: stikks
 * Date: 8/3/16
 * Time: 10:18 PM
 */
$host = '127.0.0.1';
$db   = 'test';
$user = 'root';
$pass = '';
$charset = 'utf8';

$dsn = "mysql:host=$host;dbnam=$db;charset=$charset";

$opt = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

$email = 'styccs@gmail.com';
$status = true;

$pdo = new PDO($dsn, $user, $pass);
$stmt = $pdo->prepare('SELECT * FROM users WHERE email = ? AND status=?');
$stmt->execute([$email, $status]);
$user = $stmt->fetch();


class Tests {
    public function getName() {
        return static::class;
    }
}

$klass = new Test();
echo strtolower($klass->getName());


























































