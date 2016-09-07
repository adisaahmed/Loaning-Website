<?php

/**
 * Created by PhpStorm.
 * User: stikks
 * Date: 8/4/16
 * Time: 11:58 AM
 */


class Users
{
    protected $first_name;
    protected $last_name;
    protected $email;
    protected $address;
    protected $phone;
    protected $password;

    public function __construct($email, $password, $first_name, $last_name, $address, $phone)
    {
        $this->address = $address;
        $this->email = $email;
        $this->password = $password;
        $this->first_name = $first_name;
        $this->last_name = $last_name;
        $this->phone = $phone;
    }

    public function changePassword($password) {
        $hash = password_hash($password, PASSWORD_DEFAULT);
    }

}