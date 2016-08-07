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
