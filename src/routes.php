<?php
// Routes

require __DIR__ . '/../vendor/autoload.php';

//spl_autoload_register(function ($class_name) {
//    require ("../models/" . $class_name . ".php");
//});

require __DIR__. '/../models/Model.php';


$app->get('/', function ($request, $response, $args) {
    // Render index view
    return $this->renderer->render($response, 'home.phtml', $args);
});

$app->get('/about', function($request, $response, $args) {
   return $this->renderer->render($response, 'about.phtml', $args);
});

$app->get('/client', function($request, $response, $args) {
    return $this->renderer->render($response, 'client.phtml', $args);
});

$app->get('/faq', function($request, $response, $args) {
    return $this->renderer->render($response, 'faq.phtml', $args);
});

$app->get('/portal', function($request, $response, $args) {
    return $this->renderer->render($response, 'portal.phtml', $args);
});
