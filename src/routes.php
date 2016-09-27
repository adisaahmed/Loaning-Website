<?php
// Routes

require __DIR__ . '/../vendor/autoload.php';

//spl_autoload_register(function ($class_name) {
//    require ("../models/" . $class_name . ".php");
//});

require __DIR__. '/../models/Model.php';

require __DIR__. '/dependencies.php';

require __DIR__.'/../services/Mail.php';

//use App\Services\Mail;

//$app->get('/', function ($request, $response, $args) {
//    return $this->renderer->render($response, 'home.phtml', $args);
//})->setName('index');

$app->get('/', function ($request, $response){
    return $this->view->render($response, 'home.twig');
})->setName('index');

$app->get('/about', function($request, $response, $args) {
    return $this->view->render($response, 'about.twig');
})->setName('about');

$app->post('/compute', function ($request, $response, $args) {
    $date = strtotime($request->getParam('repayment_date'));
    $newformat = date('Y-m-d',$date);
    $_SESSION['data'] = array("interest"=>$request->getParam('interest'), "serviceFee"=>$request->getParam('serviceFee'), "total"=>$request->getParam('total'), "borrow"=>$request->getParam('borrow'), "repayment_date"=>$newformat);
});

$app->get('/faq', function($request, $response, $args) {
    return $this->view->render($response, 'faq.twig');
})->setName('faq');

$app->get('/fast', function($request, $response, $args) {
    return $this->view->render($response, 'fast.twig');
})->setName('fast');

$app->get('/online', function($request, $response, $args) {
    return $this->view->render($response, 'online.twig');
})->setName('online_loan');

$app->get('/easy', function($request, $response, $args) {
    $this->view->render($response, 'easy.twig');
})->setName('easy');

$app->get('/short', function($request, $response, $args) {
    $this->view->render($response, 'short.twig');
})->setName('short');

$app->get('/what', function($request, $response, $args) {
    $this->view->render($response, 'what.twig');
})->setName('what');

$app->get('/payday', function($request, $response, $args) {
    $this->view->render($response, 'payday.twig');
})->setName('payday');

$app->get('/cash', function($request, $response, $args) {
    return $this->view->render($response, 'cash.twig', [
        'error' => null
    ]);
})->setName('cash');

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
            return $this->view->render($response, 'cash.twig', [
                'error' => "You have an outstanding loan repayment to complete. Please visit client tab to log in and confirm its status"
            ]);
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

    $user = \App\models\Users::findByEmail($pdo, $email);
    
    if (!$user) {
        $user = \App\models\Users::create($pdo, $email, $password, $first_name, $last_name, $bvn, $title, $gender, $date_of_birth, $phone, $marital_status, $dependants, $street, $city, $state);
    }

    $loan = \App\models\LoanRequest::create($pdo, $email, $borrow, $total, $interest, $serviceFee, $repayment_date);

    try {
        \App\Services\Mail::send_verification_mails($user['email'], $user['first_name'] . '' . $user['last_name'], $loan['total'], $loan['repayment_date']);

    }
    catch (Exception $e) {
        var_dump($e);
    }

    $this->auth->attempt($user['email'], $user['password']);

    $_SESSION['loan_id'] = $loan['id'];

    return $response->withRedirect($container->router->pathFor('status'));

});

$app->group('/user', function (){

    $this->get('/portal', function($request, $response, $args) {
        return $this->view->render($response, 'portal.twig');
    })->setName('portal');

    $this->get('/agreement', function($request, $response, $args) {
        $this->view->render($response, 'agreement.twig');
    })->setName('agreement');

    $this->get('/status', function($request, $response, $args) {

        global $container;

        $user = $this->auth->user();

        $db = $container->get('settings')['db'];
        $pdo = new PDO("mysql:host=". $db['host']. ";dbname=". $db['dbname'], $db['user'], $db['pass']);
        $loan = \App\models\LoanRequest::getLatest($pdo, $user['email']);
        $diff = null;
        
        if ($loan) {
            $diff = (int)(strtotime($loan['repayment_date']) - time());
            $diff = gmdate("d", $diff);   
        }

        $this->view->render($response, 'status.twig', [
            'loan' => $loan,
            'countdown' => $diff
        ]);
    })->setName('status');

    $this->get('/approved', function($request, $response, $args) {
        $this->view->render($response, 'approved.twig');
    })->setName('approved');

    $this->get('/logout', function ($request, $response){
        
        $this->auth->logout();
        return $response->withRedirect($this->router->pathFor('client'));
        
    })->setName('logout');

    $this->get('/more', function ($request, $response){
        $user = $this->auth->user();
        return $this->view->render($response, 'more.twig', [
            'user' => $user
        ]);
    })->setName('more');

    $this->post('/more/compute', function ($request, $response) {

        global $container;

        $date = strtotime($request->getParam('repayment_date'));
        $newformat = date('Y-m-d',$date);
        $_SESSION['data'] = array("interest"=>$request->getParam('interest'), "serviceFee"=>$request->getParam('serviceFee'), "total"=>$request->getParam('total'), "borrow"=>$request->getParam('borrow'), "repayment_date"=>$newformat);

        $total = $request->getParam('total');
        $interest = $request->getParam('interest');
        $borrow = $request->getParam('borrow');
        $serviceFee = $request->getParam('serviceFee');
        $repayment_date = $request->getParam('repayment_date');

        $db = $container->get('settings')['db'];
        $pdo = new PDO("mysql:host=". $db['host']. ";dbname=". $db['dbname'], $db['user'], $db['pass']);

        $user = $this->auth->user();
        $loan = \App\models\LoanRequest::getLatest($pdo, $user['email']);

        if ($loan) {
            if (!$loan['paid']) {
                return "You have an outstanding loan repayment to complete. Please visit client tab to log in and confirm its status";
            }
        }

        \App\models\LoanRequest::create($pdo, $user['email'], $borrow, $total, $interest, $serviceFee, $repayment_date);

        return "Your new loan request is being process. Please visit status tab to confirm its status";

//        return $response->withRedirect($container->router->pathFor('status'));

    });

    $this->post('/otp', function ($request, $response){

        global $container;

        $user = $this->auth->user();

        $email = $request->getParam('email');
        
        if ($user['email'] == $email) {
            return $this->view->render($response, 'more.twig', [
                'user' => $user,
                'error' => "No changes detected"
            ]);
        }

        $result = \App\Services\Mail::send_otp($container, $email);

        $message = null;

        if ($result) {
            $message = "Message sent successfully";
        }

        return $this->view->render($response, 'more.twig', [
            'user' => $user,
            'message' => $message
        ]);
    })->setName('otp');

    $this->post('/change', function ($request, $response){

        global $container;

        $user = $this->auth->user();

        $input = $request->getParam('token');

        $db = $container->get('settings')['db'];
        $pdo = new PDO("mysql:host=". $db['host']. ";dbname=". $db['dbname'], $db['user'], $db['pass']);
        
        $token = \App\models\Token::find($pdo, $input);

        if (!$token) {
            return $this->view->render($response, 'more.twig', [
                'user' => $user,
                'token_error' => "Invalid/Expired Token"
            ]);
        }

        $token_message = "Email successfully changed";

        return $this->view->render($response, 'more.twig', [
            'user' => $user,
            'token_message' => $token_message
        ]);
    })->setName('change');

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

        return $response->withRedirect($container->router->pathFor('status'));
    });

    $this->get('/admin', function($request, $response) {
        return $this->view->render($response, 'admin.twig');
    })->setName('admin');

    $this->post('/admin', function($request, $response) {

        global $container;

        $email = $request->getParam('email');
        $password = $request->getParam('password');

        $db = $container->get('settings')['db'];
        $pdo = new PDO("mysql:host=". $db['host']. ";dbname=". $db['dbname'], $db['user'], $db['pass']);

        $user = \App\models\Access::findByEmail($pdo, $email);

        if (!$user) {
            $errors = "Email account is not registered on the platform";
            return $this->view->render($response, 'admin.twig', [
                'errors' => $errors
            ]);
        }

        if ($user['is_admin'] == false) {
            $errors = "You don't have access to this page";
            return $this->view->render($response, 'admin.twig', [
                'errors' => $errors
            ]);
        }

        $attempt = $this->auth->admin_attempt($user['email'], $password);

        if (!$attempt) {
            $errors = "Invalid email/password combination";
            return $this->view->render($response, 'admin.twig', [
                'errors' => $errors
            ]);
        }

        return $response->withRedirect($container->router->pathFor('dashboard'));
    });

})->add(new GuestMiddleware($container));

$app->group('/admin', function (){

    $this->get('/dashboard', function ($request, $response){

        global $container;
        $db = $container->get('settings')['db'];
        $pdo = new PDO("mysql:host=". $db['host']. ";dbname=". $db['dbname'], $db['user'], $db['pass']);
        $users = \App\models\Users::all($pdo);
        $requests = \App\models\LoanRequest::all($pdo);
        
        return $this->view->render($response, 'admin_dashboard.twig', [
            'requests' => count($requests),
            'users' => count($users)
        ]);
    })->setName('dashboard');

    $this->get('/users', function ($request, $response){
        global $container;
        $db = $container->get('settings')['db'];
        $pdo = new PDO("mysql:host=". $db['host']. ";dbname=". $db['dbname'], $db['user'], $db['pass']);
        $users = \App\models\Users::all($pdo);

        return $this->view->render($response, 'users.twig', [
            'users' => $users
        ]);
    })->setName('users');

    $this->get('/requests', function ($request, $response){
        global $container;
        $db = $container->get('settings')['db'];
        $pdo = new PDO("mysql:host=". $db['host']. ";dbname=". $db['dbname'], $db['user'], $db['pass']);
        $requests = \App\models\LoanRequest::all($pdo);

        return $this->view->render($response, 'requests.twig', [
            'requests' => $requests
        ]);
    })->setName('requests');

    $this->get('/requests/{loan_id}/approve', function ($request, $response, $args){

        global $container;
        $db = $container->get('settings')['db'];
        $pdo = new PDO("mysql:host=". $db['host']. ";dbname=". $db['dbname'], $db['user'], $db['pass']);

        \App\models\LoanRequest::approve($pdo, (int)$args['loan_id']);

        return $response->withRedirect($container->router->pathFor('requests'));
    })->setName('approve');

    $this->get('/requests/{loan_id}/paid', function ($request, $response, $args){

        global $container;
        $db = $container->get('settings')['db'];
        $pdo = new PDO("mysql:host=". $db['host']. ";dbname=". $db['dbname'], $db['user'], $db['pass']);

        \App\models\LoanRequest::paid($pdo, (int)$args['loan_id']);

        return $response->withRedirect($container->router->pathFor('requests'));
    })->setName('paid');

})->add(new AdminMiddleware($container));