<?php
require 'vendor/autoload.php';
require 'config.php';

if ($_POST["submit"]) {

    $name       = $_POST["name"];
    $email      = $_POST["email"];
    $mobile_no  = $_POST["mobile_no"];
    $interested = implode(", ", ($_POST["interested"]));
    $experience = $_POST["experience"];
    $github_profile=$_POST["github_profile"];
    $file_upload = $_FILES['resume_upload'];

    $sendgrid = new SendGrid($SendGrid_API_KEY);
    $email_html = "<p>Name : " . $name . "</p><p>Email : " . $email . "</p><p>Mobile No : " . $mobile_no . "</p><p>Interested : " . $interested . "</p><p>Experience : " . $experience . "</p>";
    $email      = new SendGrid\Email();

    if ($github_profile) {
        if ($file_upload["error"]==UPLOAD_ERR_OK) {

            // When BOTH file uploaded & github is present

            $file_temp  = $file_upload['tmp_name'];
            $file_path  = "tmp/" . $file_upload['name'];
            move_uploaded_file($file_temp, $file_path);
            $email_html = $email_html . "<p> GitHub Profile : " .$github_profile."</p>";
            $email->addTo($EMAIL_TO)->setFrom($EMAIL_FROM)->setSubject($EMAIL_SUBJECT)->setHtml($email_html)->addAttachment($file_path);
            $sendgrid->send($email);
        }
        else
        {
            // When ONLY github is submited
            $email_html = $email_html . "<p> GitHub Profile : " .$github_profile."</p>";
            $email->addTo($EMAIL_TO)->setFrom($EMAIL_FROM)->setSubject($EMAIL_SUBJECT)->setHtml($email_html);
            $sendgrid->send($email);
        }
    }
    else
    {
        // ONLY file is uploaded..
        
        $file_temp  = $file_upload['tmp_name'];
        $file_path  = "tmp/" . $file_upload['name'];
        move_uploaded_file($file_temp, $file_path);
        $email->addTo($EMAIL_TO)->setFrom($EMAIL_FROM)->setSubject($EMAIL_SUBJECT)->setHtml($email_html)->addAttachment($file_path);
        $sendgrid->send($email);
        unlink($file_path); 

    }


    header('Location:  thankyou.html');  // Redirect to thank you page
    
}




?>