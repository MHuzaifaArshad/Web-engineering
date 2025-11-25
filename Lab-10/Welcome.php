<?php
session_start();

if(!isset($_SESSION['username'])){
    header("Location: login.php?msg=Please login first.");
    exit;
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Welcome</title>
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
</head>

<body class="bg-black d-flex justify-content-center align-items-center" style="height:100vh;">
<div class="container col-md-5 mt-5 bg-dark p-4 shadow rounded text-center text-white">

    <h2>Welcome, <?= $_SESSION['username'] ?> !!!</h2>

    <a href="login.php" class="btn btn-danger mt-3">Logout</a>

</div>

</body>
</html>
