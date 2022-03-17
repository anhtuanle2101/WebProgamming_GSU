<?php
$host="localhost";
$user="root";
$pass="Tuananh123";
$r=mysql_connect($host,$user,$pass);
if (!$r){
  echo "Cound not connect to server\n";
  trigger_error(mysqp_error(),E_USER_ERROR);
}
else{
  echo "Connection established\n";
}

echo  mysql_get_server_info()."\n";
mysql_close();
 ?>
