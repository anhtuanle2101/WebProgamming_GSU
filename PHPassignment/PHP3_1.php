<!DOCTYPE html
<html>
<head>
  <title>Part 1 PHP</title>
</head>
<body>
  <?php
    function isBitten()
    {
      $var=rand(0,1);
      if ($var==0)
      {
        echo "Charlie ate my lunch!<br>";
      }
      else
      {
        echo "Charlie did not eat my lunch!<br>";
      }
    }
    isBitten();
  ?>
</body>
</html>
