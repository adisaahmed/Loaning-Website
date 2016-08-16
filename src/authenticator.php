<?php
/**
 * Created by PhpStorm.
 * User: stikks
 * Date: 8/4/16
 * Time: 10:14 AM
 */

require __DIR__. '/../models/setup.php';

use JeremyKendall\Password\PasswordValidator;
use JeremyKendall\Slim\Auth\Adapter\Db\PdoAdapter;
use JeremyKendall\Slim\Auth\Bootstrap;
use JeremyKendall\Slim\Auth\Exception\HttpForbiddenException;
use JeremyKendall\Slim\Auth\Exception\HttpUnauthorizedException;
use Zend\Authentication\Storage\Session as SessionStorage;
use Zend\Session\Config\SessionConfig;
use Zend\Session\SessionManager;

$validator = new PasswordValidator();
$adapter = new PdoAdapter($pdo, 'access', 'email', 'password', $validator);
$acl = new \Acl();

$sessionConfig = new SessionConfig();
$sessionConfig->setOptions(array(
    'remember_me_seconds' => 60 * 60 * 24 * 7,
    'name' => 'slim-auth-impl',
));
$sessionManager = new SessionManager($sessionConfig);
$sessionManager->rememberMe();
$storage = new SessionStorage(null, null, $sessionManager);
$authBootstrap = new Bootstrap($app, $adapter, $acl);
$authBootstrap->setStorage($storage);
$authBootstrap->bootstrap();