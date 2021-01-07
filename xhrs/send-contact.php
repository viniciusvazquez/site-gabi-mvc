<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require 'vendor/autoload.php';

try {
    $mail = new PHPMailer(true);
    $mail->IsSMTP(); // enable SMTP
    $mail->Charset = 'UTF-8';
    $mail->SMTPDebug = 0; // debugging: 1 = errors and messages, 2 = messages only
    $mail->SMTPAuth = true; // authentication enabled
    $mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
    $mail->Host = "br470.hostgator.com.br";
    $mail->Port = 465; // or 587
    $mail->IsHTML(true);
    $mail->Username = "sender@espacofendi.com.br";
    $mail->Password = "123456";
    $mail->SetFrom($_POST['email']);
    $mail->Subject = utf8_decode("Mensagem de ".$_POST['nome']);
    $mail->Body = utf8_decode($_POST['mensagem']);
    $mail->AddAddress("contato@espacofendi.com.br");
    if(!$mail->Send()) {
       echo "Mailer Error: " . $mail->ErrorInfo;
    } else {
       header('Location: https://www.espacofendi.com.br');
    }
    
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>