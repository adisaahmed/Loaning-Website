<?php

/**
 * Created by PhpStorm.
 * User: stikks
 * Date: 8/15/16
 * Time: 11:50 PM
 */
namespace App\Middleware;

class AuthMiddleware extends Middleware
{

    public function __invoke($request, $response, $next)
    {

        if (!$this->container->auth->check()) {

            $this->container->flash->addMessage('basic', 'You need to sign in to access this page');

            return $response->withRedirect($this->container->router->pathFor('login'));
        }

        return $next($request, $response);
    }
}