<?php

/**
 * Created by PhpStorm.
 * User: stikks
 * Date: 9/6/16
 * Time: 11:08 PM
 */
namespace App\Services;

use PHPMailer;

class Mail
{
    static public function send_mail($origin, $origin_name, $recipient, $recipient_name, $subject, $body) {
        // send email from origin to recipient
        $mail = new PHPMailer;

        $mail->From = $origin;
        $mail->FromName = $origin_name;

        $mail->addAddress($recipient, $recipient_name);
        $mail->addReplyTo($origin, $origin_name);

        $mail->isHTML();
        $mail->Subject = $subject;
        $mail->Body = $body;
        $mail->AltBody = $body;

        if(!$mail->send())
        {
            return "Mailer Error: " . $mail->ErrorInfo;
        }

        return true;
    }

    protected function send__smtp_mail($origin, $origin_name, $origin_password, $origin_host, $recipient, $recipient_name, $subject, $body) {
        // send email from origin to recipient
        $mail = new PHPMailer;

        $mail->SMTPDebug = 3;
        $mail->isSMTP();

        $mail->Host = $origin_host;

        $mail->SMTPAuth = true;

        $mail->Username = $origin;
        $mail->Password = $origin_password;

        $mail->SMTPSecure = "tls";
        $mail->Port = 587;

        $mail->From = $origin;
        $mail->FromName = $origin_name;

        $mail->addAddress($recipient, $recipient_name);
        $mail->addReplyTo($origin, $origin_name);

        $mail->isHTML();
        $mail->Subject = $subject;
        $mail->Body = $body;
        $mail->AltBody = $body;

        if(!$mail->send())
        {
            return "Mailer Error: " . $mail->ErrorInfo;
        }

        return true;
    }

    static public function send_verification_mails($email, $name, $value, $date) {

        $settings = require __DIR__ . '/../src/settings.php';
        
        $subject = 'Your Loan Request is being processed';
        
        $message = '<p><Hello'. $name.',</p>'.'<p>Welcome to Ecogeneral Loan Services, your loan  of value'.$value.' with a repayment date of'. $date. ' is being processed.</p>';

//        static::send_mail($settings['default_address']['email'], $settings['default_address']['name'], $email, $name, $subject, $message);

        static::send_sendgrid_mail($settings['settings']['default_address']['email'], $email, $subject, $message);

        $admin_subject = $name. 'has requested a loan';

        $admin_message = '<p><Hello Admin,</p>'.$name.',' .$email. '<p> just requested a loan  of value'.$value.' with a repayment date of'. $date.'.</p>';

        static::send_sendgrid_mail($settings['settings']['default_address']['email'], $settings['settings']['admin_address']['email'], $admin_subject, $admin_message);

//        static::send_mail($settings['admin_address']['email'], $settings['admin_address']['name'], $email, $name, $admin_subject, $admin_message);

        return true;
    }

    static public function send_sendgrid_mail($from, $recipient, $subject, $message) {

        $data = '{
          "personalizations": [
            {
              "to": [
                {
                  "email": "%to%"
                }
              ],
              "subject": "%subject%"
            }
          ],
          "from": {
            "email": "%from%"
          },
          "content": [
            {
              "type": "text/plain",
              "value": "%message%"
            }
          ]
        }';

        $_body = str_replace("%to%", $recipient, $data);
        $__body = str_replace("%from%", $from, $_body);
        $___body = str_replace("%subject%", $subject, $__body);
        $body = str_replace("%subject%", $message, $___body);

        $request_body = json_decode($body);

        $api_key = require __DIR__ . '../locals.php';
        $message = new \SendGrid($api_key);

        $response = $message->client->mail()->send()->post($request_body);

        if ($response->statusCode() == 202){
            return true;
        }

        return false;

    }
}

