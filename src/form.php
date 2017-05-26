<?php
  $errors = array();
  $form_data = array();

  if ($_POST['name'] == "") {
    $errors['name'] = 'Введите Ваше ФИО';
  }

  if ($_POST['tel'] == "") {
    $errors['name'] = 'Введите Ваш телефон';
  }

  if (!empty($errors)) {
    $form_data['success'] = false;
    $form_data['errors']  = $errors;
  } else {
    $message = "<h4>Заявка с сайта ".$_SERVER['HTTP_HOST']."</h4><p>Перезвонить мне:</p>";
    $message .= "Моё имя: ".$_POST['name']."<br />";
    $message .= "Мой номер: ".$_POST['tel']."<br />";

    $headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=utf8' . "\r\n";

    if (mail('azarov91@mail.ru', 'Заявка с сайта '.$_SERVER['HTTP_HOST'], $message, $headers)) {
      $form_data['success'] = true;
      $form_data['posted'] = 'Спасибо! Оставайтесь пожалуйста на связи, Вам позвонит личный менеджер!';
    } else {
      $errors['name'] = 'Ошибка отправки письма!';
    }
  }

  echo json_encode($form_data);
?>
