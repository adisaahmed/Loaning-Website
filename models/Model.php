<?php

/**
 * Created by PhpStorm.
 * User: stikks
 * Date: 8/3/16
 * Time: 10:10 PM
 */
namespace App\models;

abstract class Model
{
    protected $db;

    public function __construct($db)
    {
        $this->db = $db;
    }

    static public function create()
    {
        throw new Exception('Not implemented Error');
    }

    protected function update()
    {
        throw new Exception('Not Implemented Error');
    }

    protected function delete($id)
    {
        $klass = strtolower(static::class);
        $query = $this->db->prepare("DELETE FROM ? WHERE id=?");
        $query->execute($klass, $id);

        $deleted = $query->fetchColumn();
        return true;
    }

    protected function getAll()
    {
        $klass = strtolower(static::class);
        $data = $this->query("SELECT * FROM '$klass'")->fetchAll(PDO::FETCH_CLASS, static::class);

        return $data;
    }

    protected function save($id, array $args)
    {
        throw new Exception('Not Implemented');
    }

    protected function get($id)
    {
        $query = $this->db->prepare('SELECT * FROM ? WHERE id = ?');
        $query->execute([strtolower(static::class), $id]);
        $obj = $query->fetch(PDO::FETCH_CLASS, static::class);

        return $obj;
    }
        
    protected function filterBy(array $args, array $data)
    {

        $klass = static::class;
        foreach ($args as $key => $value) {

        }

    }
}

class LoanRequest extends Model
{

    static public function create($db, $email, $amount, $total, $interest, $serviceFee)
    {
        $query = $db->prepare('INSERT INTO loan_request (email, amount, total, interest, servicefee)'
            . "VALUES (?, ?, ?, ?, ?)");
        $query->execute(array($email, $amount, $total, $interest, $serviceFee));
        $obj = $query->fetch();
        return $obj;
    }
}

class Users extends Model
{

    static public function create($db, $email, $password, $first_name, $last_name, $bvn, $title, $gender, $age, $phone, $marital_status, $dependants, $street, $state, $city)
    {
        $query = $db->prepare('INSERT INTO users (email, password, first_name, last_name, bvn, title, gender, age, phone, marital_status, dependants, street, state, city)'
            . "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $query->execute(array($email, password_hash($password, PASSWORD_DEFAULT), $first_name, $last_name, $bvn, $title, $gender, $age, $phone, $marital_status, $dependants, $street, $state, $city));

        $obj = $query->fetch();

        return Access::create($db, $email, $password);
    }
    
}

class Access extends Model
{

    static public function create($db, $email, $password)
    {
        $query = $db->prepare('INSERT INTO access (email, password)'
            . "VALUES (?, ?)");
        $query->execute(array($email, password_hash($password, PASSWORD_DEFAULT)));

        $obj = $query->fetch();

        return $obj;
    }

    static public function findByEmail($db, $email)
    {

        $query = $db->prepare('SELECT * FROM access WHERE email="'.$email.'"');
        $query->execute();
        $result = $query->fetch();

        return $result;
    }
}