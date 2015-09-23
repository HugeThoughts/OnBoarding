<?php
require 'vendor/autoload.php';
require 'config.php';

$sendgrid = new SendGrid($SendGrid_API_KEY);

if ($_POST["submit"]) {
    
    $name       = $_POST["name"];
    $email      = $_POST["email"];
    $mobile_no  = $_POST["mobile_no"];
    $interested = implode(", ", ($_POST["interested"]));
    $experience = $_POST["experience"];
    $resume     = $_POST["resume_upload"];
    $file_temp  = $_FILES['resume_upload']['tmp_name'];
    $file_name  = "tmp/" . $_FILES['resume_upload']['name'];
    
    move_uploaded_file($file_temp, $file_name);
    
    
    $email_html = "<p>Name : " . $name . "</p><p>Email : " . $email . "</p><p>Mobile No : " . $mobile_no . "</p><p>Interested : " . $interested . "</p><p>Experience : " . $experience . "</p>";
    $email      = new SendGrid\Email();
    $email->addTo($EMAIL_TO)->setFrom($EMAIL_FROM)->setSubject($EMAIL_SUBJECT)->setHtml($email_html)->addAttachment($file_name);
    
    
    try {
        $sendgrid->send($email);
        // Mail has been sent.
        
        //Delete the file uploaded file
        
        unlink($file_name);
        
        // Redirect to thank you page
        header('Location:  thankyou.html');
        exit();
    }
    catch (\SendGrid\Exception $e) {
        echo $e->getCode() . "\n";
        foreach ($e->getErrors() as $er) {
            echo $er;
        }
    }
    
    
    
}




?>