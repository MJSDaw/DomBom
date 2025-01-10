<?php
    class DatabaseConnection {
        
        private static $servername = "localhost";
        private static $username = "root";
        private static $password = "";
        private static $dbType = "mysql";
        private static $dbName = "dombom";
        private static $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];

        public static function createConnection(){
            $dns = self::$dbType.":host=".self::$servername.";dbname=".self::$dbName.";charset=utf8mb4";

            try {
                $conn = new PDO($dns, self::$username, self::$password, self::$options);
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                return $conn;
              } catch(PDOException $e) {
                echo "Error de Conexión: " . $e->getMessage();
              }
        }

    }