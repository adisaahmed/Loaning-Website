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

$app->post('/compute', function ($request, $response, $args) {
    $_SESSION['data'] = array("interest"=>$request->getParam('interest'), "serviceFee"=>$request->getParam('serviceFee'), "total"=>$request->getParam('total'), "borrow"=>$request->getParam('borrow'));
});

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
    
    if (!$user) {
        return $this->renderer->render($response, 'client.phtml', $args);
    }

    if (password_verify($password, $user['password'])) {
        $_SESSION['user'] = $user['email'];
        return $response->withRedirect($container->router->pathFor('index'));
    }

    return $this->renderer->render($response, 'client.phtml', $args);
});

$app->get('/faq', function($request, $response, $args) {
    return $this->renderer->render($response, 'faq.phtml', $args);
});

$app->get('/portal', function($request, $response, $args) {
    return $this->renderer->render($response, 'portal.phtml', $args);
});

$app->get('/fast', function($request, $response, $args) {
    return $this->renderer->render($response, 'fast_loan.phtml', $args);
});

$app->get('/cash', function($request, $response, $args) {

    return $this->renderer->render($response, 'get_cash.phtml', $args);
})->setName('cash');

$app->post('/cash', function($request, $response, $args){

    global $container;

    $data = $_SESSION['data'];
    $total = $data['total'];
    $interest = $data['interest'];
    $borrow = $data['borrow'];
    $serviceFee = $data['serviceFee'];

    if (!isset($total) && !isset($interest) && !isset($borrow) && !isset($serviceFee)) {
        return $response->withRedirect($container->router->pathFor('index'));
    }

    $db = $container->get('settings')['db'];
    $pdo = new PDO("mysql:host=". $db['host']. ";dbname=". $db['dbname'], $db['user'], $db['pass']);
    
    $email = $request->getParam('email');
    $password = $request->getParam('password');

    $user = \App\models\Access::findByEmail($pdo, $email);

    if ($user) {
        return $response->withRedirect($container->router->pathFor('cash'));
    }

    $first_name = $request->getParam('first_name');
    $last_name = $request->getParam('last_name');
    $bvn = $request->getParam('bvn');
    $title = $request->getParam('title');
    $gender = $request->getParam('gender');
//    $date_of_birth = $request->getParam('date_of_birth');
    $age = $request->getParam('age');
    $phone = $request->getParam('phone');
    $marital_status = $request->getParam('marital_status');
    $dependants = $request->getParam('dependants');
    $street = $request->getParam('street');
    $city = $request->getParam('city');
    $state = $request->getParam('state');

    \App\models\Users::create($pdo, $email, $password, $first_name, $last_name, $bvn, $title, $gender, $age, $phone, $marital_status, $dependants, $street, $state, $city);

    \App\models\LoanRequest::create($pdo, $email, $borrow, $total, $interest, $serviceFee);

    return $response->withRedirect($container->router->pathFor('index'));

});

$app->get('/online', function($request, $response, $args) {
    return $this->renderer->render($response, 'online_loan.phtml', $args);
});

$app->get('/easy', function($request, $response, $args) {
    return $this->renderer->render($response, 'easy_loan.phtml', $args);
});

$app->get('/short', function($request, $response, $args) {
    return $this->renderer->render($response, 'short_loan.phtml', $args);
});

$app->get('/what', function($request, $response, $args) {
    return $this->renderer->render($response, 'what_loan.phtml', $args);
});

$app->get('/payday', function($request, $response, $args) {
    return $this->renderer->render($response, 'payday_loan.phtml', $args);
});