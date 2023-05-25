

<?php
// $server = '163.18.42.31';
$server = 'localhost';
$dbname = '109p2';
$user = 'Roy';
$passwd = '111project';
$dsn = "mysql:dbname=109p2;host=localhost;port:3307";
// $server = 'localhost';
// $dbname = '109p2';
// $user = 'root';
// $passwd = 'haha45La';

try {
  $conn = new PDO("mysql:host=" . $server . ";dbname=" . $dbname.";port:3307", $user, $passwd);
  // $conn = new PDO($dsn, $user, $passwd);
  // $conn = new PDO($dsn, $user, $passwd);
  $conn->exec("SET CHARACTER SET utf8");
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  echo "成功建立MySQL伺服器連接和開啟test資料庫"; 
} catch (PDOException $e) {
  "Connection failed: " . $e->getMessage();
}