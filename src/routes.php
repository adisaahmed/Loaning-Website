<?php
// Routes

require __DIR__ . '/../vendor/autoload.php';

//spl_autoload_register(function ($class_name) {
//    require ("../models/" . $class_name . ".php");
//});

require __DIR__. '/../models/Model.php';

require __DIR__. '/dependencies.php';

use App\Services\Mail;

//$app->get('/', function ($request, $response, $args) {
//    return $this->renderer->render($response, 'home.phtml', $args);
//})->setName('index');

$app->get('/', function ($request, $response){
    return $this->view->render($response, 'home.twig');
});

$app->get('/about', function($request, $response, $args) {
    return $this->view->render($response, 'about.twig');
})->setName('about');

$app->post('/compute', function ($request, $response, $args) {
    $_SESSION['data'] = array("interest"=>$request->getParam('interest'), "serviceFee"=>$request->getParam('serviceFee'), "total"=>$request->getParam('total'), "borrow"=>$request->getParam('borrow'), "repayment_date"=>$request->getParam('repayment_date'));
});

$app->get('/faq', function($request, $response, $args) {
    return $this->view->render($response, 'faq.twig');
})->setName('faq');

$app->get('/fast', function($request, $response, $args) {
    return $this->view->render($response, 'fast.twig');
})->setName('fast');

$app->get('/cash', function($request, $response, $args) {
    return $this->view->render($response, 'cash.twig');
})->setName('cash');

$app->get('/online', function($request, $response, $args) {
    return $this->view->render($response, 'online.twig');
});

$app->get('/easy', function($request, $response, $args) {
    $this->view->render($response, 'easy.twig');
});

$app->get('/short', function($request, $response, $args) {
    $this->view->render($response, 'short.twig');
});

$app->get('/what', function($request, $response, $args) {
    $this->view->render($response, 'what.twig');
});

$app->get('/payday', function($request, $response, $args) {
    $this->view->render($response, 'payday.twig');
});

$app->post('/cash', function($request, $response, $args){

    global $container;

    $data = $_SESSION['data'];
    $total = $data['total'];
    $interest = $data['interest'];
    $borrow = $data['borrow'];
    $serviceFee = $data['serviceFee'];
    $repayment_date = $data['repayment_date'];

    if (!isset($total) && !isset($interest) && !isset($borrow) && !isset($serviceFee)) {
        return $response->withRedirect($container->router->pathFor('index'));
    }

    $db = $container->get('settings')['db'];
    $pdo = new PDO("mysql:host=". $db['host']. ";dbname=". $db['dbname'], $db['user'], $db['pass']);

    $email = $request->getParam('email');
    $password = $request->getParam('password');

    $loan = \App\models\LoanRequest::findByEmail($pdo, $email);

    if ($loan) {
        if (!$loan['paid']) {
            $error = "You have an outstanding loan repayment to complete. Please visit client tab to log in and confirm its status";
            $_SESSION['errors'] = $error;
            return $this->renderer->render($response, 'get_cash.phtml');
        }
    }

    $first_name = $request->getParam('first_name');
    $last_name = $request->getParam('last_name');
    $bvn = $request->getParam('bvn');
    $title = $request->getParam('title');
    $gender = $request->getParam('gender');
    $date_of_birth = $request->getParam('date_of_birth');
    $phone = $request->getParam('phone');
    $marital_status = $request->getParam('marital_status');
    $dependants = $request->getParam('dependants');
    $street = $request->getParam('street');
    $city = $request->getParam('city');
    $state = $request->getParam('state');

    $user = \App\models\Users::create($pdo, $email, $password, $first_name, $last_name, $bvn, $title, $gender, $date_of_birth, $phone, $marital_status, $dependants, $street, $city, $state);

    $loan = \App\models\LoanRequest::create($pdo, $email, $borrow, $total, $interest, $serviceFee);

    $mail = Mail::send_verification_mails($user['email'], $user['first_name']. ''. $user['last_name'], $loan['total'], $loan['repayment_date']);

    $this->auth->attempt($user['email'], $user['password']);

    return $this->view->render($response, 'status.twig');

});

$app->group('/user', function (){

    $this->get('/portal', function($request, $response, $args) {
        return $this->view->render($response, 'portal.twig');
    })->setName('portal');

    $this->get('/agreement', function($request, $response, $args) {
        $this->view->render($response, 'agreement.twig');
    });

    $this->get('/status', function($request, $response, $args) {
        $this->view->render($response, 'status.twig');
    })->setName('status');

    $this->get('/approved', function($request, $response, $args) {
        $this->view->render($response, 'approved.twig');
    });

    $this->get('/logout', function ($request, $response){
        
        $this->auth->logout();
        return $response->withRedirect($this->router->pathFor('client'));
        
    })->setName('logout');

    $this->get('/more', function ($request, $response){
        return $this->view->render($response, 'more.twig');
    });

})->add(new AuthMiddleware($container));

$app->group('', function (){

    $this->get('/client', function($request, $response) {
        return $this->view->render($response, 'client.twig');
    })->setName('client');

    $this->post('/client', function($request, $response) {

        global $container;

        $email = $request->getParam('email');
        $password = $request->getParam('password');

        $db = $container->get('settings')['db'];
        $pdo = new PDO("mysql:host=". $db['host']. ";dbname=". $db['dbname'], $db['user'], $db['pass']);

        $user = \App\models\Access::findByEmail($pdo, $email);

        if (!$user) {
            $errors = "Email account is not registered on the platform";
            return $this->view->render($response, 'client.twig', [
                'errors' => $errors
            ]);
        }

        $attempt = $this->auth->attempt($user['email'], $password);

        if (!$attempt) {
            $errors = "Invalid email/password combination";
            return $this->view->render($response, 'client.twig', [
                'errors' => $errors
            ]);
        }

        return $this->view->render($response, 'status.twig');
    });
})->add(new GuestMiddleware($container));