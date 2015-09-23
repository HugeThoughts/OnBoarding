<?php
// Prevent Direct Access to this file & redirect to index page
debug_backtrace() || header('Location:  index.html');

$SendGrid_API_KEY = "KEY";
$EMAIL_FROM       = "example@gmail.com";
$EMAIL_TO         = "someone@gmail.com";
$EMAIL_SUBJECT    = "NFNLabs OnBoarding";

?>