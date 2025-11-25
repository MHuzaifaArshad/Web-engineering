<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
        <link rel="stylesheet"  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" >
</head>
<body class="bg-black d-flex justify-content-center align-items-center" style="height:100vh;">

<div class="container col-md-5 mt-5 bg-dark text-light p-4 rounded shadow-md">

    <h2 class="text-center mb-4">User Login</h2>

    <?php if(isset($_GET['msg'])): ?>
        <div class="alert alert-info">
            <?= $_GET['msg']; ?>
        </div>
    <?php endif; ?>

    <form method="POST" action="login_check.php">

        <div class="mb-3">
            <label class="form-label">Username</label>
            <input name="username" class="form-control" required>
        </div>

        <div class="mb-3">
            <label class="form-label">Password</label>
            <input name="password" type="password" class="form-control" required>
        </div>

        <button class="btn btn-primary w-100">Login</button>

        <p class="text-center mt-3">
            <a href="register.php">New user? Register</a>
        </p>

    </form>

</div>

</body>
</html>