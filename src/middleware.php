<?php
// Application middleware

// e.g: $app->add(new \Slim\Csrf\Guard);

use Zend\Permissions\Acl\Acl as ZendAcl;

class Acl extends ZendAcl
{
    protected $default = array('GET');
    protected $authorized = array('GET', 'POST');

    public function __construct()
    {

        // APPLICATION ROLES
        $this->addRole('guest');
        $this->addRole('user', 'guest');
        $this->addRole('admin');

        // APPLICATION RESOURCES
        // Application resources == Slim route patterns
        $this->addResource('/');
        $this->addResource('/login');
        $this->addResource('/logout');
        $this->addResource('/member');
        $this->addResource('/admin');

        // APPLICATION PERMISSIONS
        // Now we allow or deny a role's access to resources. The third argument
        // is 'privilege'. We're using HTTP method as 'privilege'.
        $this->allow('guest', '/', $this->default);
        $this->allow('guest', '/login', $this->authorized);
        $this->allow('guest', '/logout', $this->default);

        $this->allow('user', '/user', $this->authorized);

        // This allows admin access to everything
        $this->allow('admin');
    }
}


class Middleware
{

    protected $container;

    public function __construct($container)
    {

        $this->container = $container;
    }

}

class GuestMiddleware extends Middleware
{

    public function __invoke($request, $response, $next)
    {
        // TODO: Implement __invoke() method.
        if($this->container->auth->check()) {

            return $response->withRedirect($this->container->router->pathFor('status'));
        }

        return $next($request, $response);
    }
}

class AuthMiddleware extends Middleware
{

    public function __invoke($request, $response, $next)
    {

        if (!$this->container->auth->check()) {

            return $response->withRedirect($this->container->router->pathFor('client'));
        }

        return $next($request, $response);
    }
}

class AdminMiddleware extends Middleware
{

    public function __invoke($request, $response, $next)
    {

        if (!$this->container->auth->is_admin()) {

            return $response->withRedirect($this->container->router->pathFor('dashboard'));
        }

        return $next($request, $response);
    }
}

class ValidationErrorsMiddleware extends Middleware
{

    public function __invoke($request, $response, $next) {

        $error = null;

        if (isset($_SESSION['errors'])) {
            $error = $_SESSION['errors'];
        }

        $this->container->view->getEnvironment()->addGlobal('errors', $error);
        unset($_SESSION['errors']);

        $response = $next($request, $response);

        return $response;
    }
}

class OldInputMiddleware extends Middleware
{
    public function __invoke($request, $response, $next) {

        $old = null;

        if (isset($_SESSION['old'])) {
            $old = $_SESSION['old'];
        }

        $this->container->view->getEnvironment()->addGlobal('old', $old);
        $_SESSION['old'] = $request->getParams();

        return $next($request, $response);
    }
}

class Auth
{

    protected $container;

    public function __construct($container)
    {
        $this->container = $container;
    }

    public function check() {
        return isset($_SESSION['user']);
    }

    public function is_admin() {
        return isset($_SESSION['admin']);
    }

    public function admin_attempt($email, $password) {

        $db = $this->container['db'];

        $user = \App\models\Admin::findByEmail($db, $email);

        if (!$user || $user['is_admin'] == false) {
            return false;
        }

        if (password_verify($password, $user['password'])) {
            $_SESSION['admin'] = $user['email'];
            return true;
        }
        return false;
    }


    public function user() {

        if (isset($_SESSION['user'])) {
            $db = $this->container['db'];
            return \App\models\Access::findByEmail($db, $_SESSION['user']);
        }
        else {
            return null;
        }
    }

    public function attempt($email, $password) {

        $db = $this->container['db'];

        $user = \App\models\Access::findByEmail($db, $email);

        if (!$user) {
            return false;
        }

        if (password_verify($password, $user['password'])) {
            $_SESSION['user'] = $user['email'];
            return true;
        }
        return false;
    }

    public function logout() {
        unset($_SESSION['user']);
    }

}