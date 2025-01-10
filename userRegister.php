<?php

header('Content-Type: application/json');

$response = []; // Inicializar la respuesta

try {
    // Leer los datos JSON enviados desde el cliente
    $json = file_get_contents('php://input');
    $user = json_decode($json, true); // Decodificar como array asociativo

    // Verificar que los datos llegaron correctamente
    if ($user && isset($user['name'], $user['mail'], $user['phone'], $user['pass'])) {
        require_once "DatabaseConnection.php";

        // Crear la conexión
        $con = DatabaseConnection::createConnection();

        // Preparar la consulta
        $stmt = $con->prepare('
            INSERT INTO usuario (name, mail, phone, pass) 
            VALUES (:name, :mail, :phone, :pass)
        ');

        // Vincular los parámetros
        $stmt->bindParam(':name', $user['name']);
        $stmt->bindParam(':mail', $user['mail']);
        $stmt->bindParam(':phone', $user['phone']);
        $stmt->bindParam(':pass', password_hash($user['pass'], PASSWORD_DEFAULT));

        // Ejecutar la consulta
        if ($stmt->execute()) {
            $response = [
                'status' => 'success',
                'message' => 'Usuario registrado correctamente',
                'data' => $user
            ];
        } else {
            throw new Exception("Error al ejecutar la consulta.");
        }
    } else {
        throw new Exception("Datos incompletos o inválidos.");
    }
} catch (Exception $e) {
    $response = [
        'status' => 'error',
        'message' => $e->getMessage()
    ];
}

// Enviar la respuesta como JSON
echo json_encode($response);
