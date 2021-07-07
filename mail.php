<?php
// Проверяем тип запроса, обрабатываем только POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Получаем параметры, посланные с javascript
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $data = $_POST['data'];

    // создаем переменную с содержанием письма
    if ($data) {
        $content = $name . ' оставил заявку на вызов замерщика по номеру ' . $phone . ' на ' . $data . ' дату. ';
    } else {
        $content = $name . ' оставил заявку на вызов замерщика по номеру ' . $phone;
    }

    // Первый параметр - кому отправляем письмо, второй - тема письма, третий - содержание
    $success = mail("callme@kitchens.com", 'Заявка на вызов замерщика', $content);
    if ($success) {
        // Отдаем 200 код ответа на http запрос
        http_response_code(200);
        echo "Письмо отправлено";
    } else {
        // Отдаем ошибку с кодом 500 (internal server error).
        http_response_code(500);
        echo "Письмо не отправлено";
    }

} else {
    // Если это не POST запрос - возвращаем код 403 (действие запрещено)
    http_response_code(403);
    echo "Данный метод запроса не поддерживается сервером";
}