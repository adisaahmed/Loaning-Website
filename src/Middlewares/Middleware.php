<?php

/**
 * Created by PhpStorm.
 * User: stikks
 * Date: 8/15/16
 * Time: 11:50 PM
 */
namespace App\Middleware;

class Middleware
{
    protected $container;

    public function __construct($container)
    {

        $this->container = $container;
    }

}