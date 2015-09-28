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

    $sendgrid = new SendGrid($SendGrid_API_KEY);
    $email_html = "<p>Name : " . $name . "</p><p>Email : " . $email . "</p><p>Mobile No : " . $mobile_no . "</p><p>Interested : " . $interested . "</p><p>Experience : " . $experience . "</p>";
    $email      = new SendGrid\Email();

    if(isset($_FILES['resume_upload']) && $github_profile=='')
    {
        // File is uploaded..
        
        $file_temp  = $_FILES['resume_upload']['tmp_name'];
        $file_name  = "tmp/" . $_FILES['resume_upload']['name'];
        move_uploaded_file($file_temp, $file_name);
        $email->addTo($EMAIL_TO)->setFrom($EMAIL_FROM)->setSubject($EMAIL_SUBJECT)->setHtml($email_html)->addAttachment($file_name);
        $sendgrid->send($email);
        unlink($file_name); 
    }

    elseif ($github_profile!=='' && isset($_FILES['resume_upload'])){

        // When both file uploaded & github is present

        $file_temp  = $_FILES['resume_upload']['tmp_name'];
        $file_name  = "tmp/" . $_FILES['resume_upload']['name'];
        move_uploaded_file($file_temp, $file_name);
        $email_html = $email_html . "<p> GitHub Profile : " .$github_profile."</p>";
        $email->addTo($EMAIL_TO)->setFrom($EMAIL_FROM)->setSubject($EMAIL_SUBJECT)->setHtml($email_html)->addAttachment($file_name);
        $sendgrid->send($email);
        
    }

    elseif($github_profile!=='')
    {
        $email_html = $email_html . "<p> GitHub Profile : " .$github_profile."</p>";
        $email->addTo($EMAIL_TO)->setFrom($EMAIL_FROM)->setSubject($EMAIL_SUBJECT)->setHtml($email_html);
        $sendgrid->send($email);
    }




    header('Location:  thankyou.html');  // Redirect to thank you page
    
}




?>