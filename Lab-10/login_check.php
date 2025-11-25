<?php
session_start();

$username = trim($_POST['username']);
$password = trim($_POST['password']);

$users = file("users.txt", FILE_IGNORE_NEW_LINES);
$valid = false;

foreach($users as $u){
    list($saved_user, $saved_pass) = explode(":", $u);

    if($saved_user == $username && $saved_pass == $password){
        $valid = true;
        break;
    }
}

if($valid){
    $_SESSION['username'] = $username;
    header("Location: welcome.php");
    exit;
} else {
    header("Location: login.php?msg=Invalid username or password.");
    exit;
}
?>
