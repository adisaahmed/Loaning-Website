<?php

namespace App;

class Validate
{

    protected $container;

    public function __construct($container)
    {
        $this->container = $container;
    }

    public function check() {
        return isset($_SESSION['user']);
    }

    public function user() {

        return \App\models\Access::findByEmail($this->container['db'], $_SESSION['user']);
    }

    public function attempt($email, $password) {

        $user = \App\models\Access::findByEmail($this->container, $email);

        if (!$user) {
            return false;
        }

        if (password_verify($password, $user->password)) {
            $_SESSION['user'] = $user->email;
            return true;
        }
        return false;
    }

    public function logout() {
        unset($_SESSION['user']);
    }

}