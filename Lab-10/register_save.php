<?php

$username = trim($_POST['username']);
$password = trim($_POST['password']);

if(!preg_match("/^[A-Za-z]+$/", $username)){
    header("Location: register.php?msg=Username must contain only alphabets.");
    exit;
}

if(!preg_match("/^(?=.*[A-Za-z])(?=.*[0-9]).+$/", $password)){
    header("Location: register.php?msg=Password must contain alphabets and numbers.");
    exit;
}

$users = file("users.txt", FILE_IGNORE_NEW_LINES);


foreach($users as $u){
    list($saved_user, $saved_pass) = explode(":", $u);

    if($saved_user == $username){
        header("Location: register.php?msg=Username already exists.");
        exit;
    }
}


$file = fopen("users.txt", "a");
fwrite($file, $username . ":" . $password . "\n");
fclose($file);


header("Location: login.php?msg=Registration successful! Please login.");
exit;
?>
