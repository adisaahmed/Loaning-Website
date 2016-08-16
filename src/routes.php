<?php
// Routes

require __DIR__ . '/../vendor/autoload.php';

//spl_autoload_register(function ($class_name) {
//    require ("../models/" . $class_name . ".php");
//});

require __DIR__. '/../models/Model.php';

require __DIR__. '/dependencies.php';

$app->get('/', function ($request, $response, $args) {
    return $this->renderer->render($response, 'home.phtml', $args);
})->setName('index');

$app->post('/', function ($request, $response, $args) {
    return $this->renderer->render($response, 'home.phtml', $args);
})->setName('index');

$app->get('/about', function($request, $response, $args) {
   return $this->renderer->render($response, 'about.phtml', $args);
})->setName('about');

$app->get('/client', function($request, $response, $args) {
    return $this->renderer->render($response, 'client.phtml', $args);
})->setName('client');

$app->post('/client', function($request, $response, $args) {

    global $container;

    $email = $request->getParam('email');
    $password = $request->getParam('password');
    
    $db = $container->get('settings')['db'];
    $pdo = new PDO("mysql:host=". $db['host']. ";dbname=". $db['dbname'], $db['user'], $db['pass']);

    $user = \App\models\Access::findByEmail($pdo, $email);
    
    var_dump($user);

    exit();
    
    if (!$user) {
        return $this->renderer->render($response, 'client.phtml', $args);
    }

    if (password_verify($password, $user->password)) {
        $_SESSION['user'] = $user->email;
        return $response->withRedirect($container->router->pathFor('index'));
    }

//    return $this->renderer->render($response, 'client.phtml', $args);
    
});

$app->get('/faq', function($request, $response, $args) {
    return $this->renderer->render($response, 'faq.phtml', $args);
});

$app->get('/portal', function($request, $response, $args) {
    return $this->renderer->render($response, 'portal.phtml', $args);
});
