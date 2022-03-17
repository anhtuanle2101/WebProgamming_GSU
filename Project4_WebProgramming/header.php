<!DOCTYPE html>
<html>
<head>
  <meta charset-="utf-8">
  <title></title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <header>
    <nav>
      <a href="#">
        <img src="#" alt="logo">
      </a>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Menu</a></li>
        <li><a href="#">Login</a></li>
        <li><a href="#">Register</a></li>
      </ul>
      <div class="login">
        <form action="login-submit.php" method="post">
          <input type="text" name="mailuid" placeholder="Username">
          <input type="password" name="passwd" placeholder="Password">
          <button type="submit" name="login-submit">Login</button>
        </form>
        <a href="register.php">Register new</a>
        <form action="logout-submit.php" method="post">
          <button type="submit" name="logout-submit">Logout</button>
        </form>
      </div>
    </nav>
  </header>
