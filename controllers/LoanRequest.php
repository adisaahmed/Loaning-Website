<?php

/**
 * Created by PhpStorm.
 * User: stikks
 * Date: 8/4/16
 * Time: 11:59 AM
 */
class LoanRequest
{
    protected $email;
    protected $amount;
    protected $interest;
    protected $servicefee;

    public function __construct($email, $amount, $interest, $servicefee)
    {
        $this->amount = $amount;
        $this->email = $email;
        $this->interest = $interest;
        $this->servicefee = $servicefee;
    }

}