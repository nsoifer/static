<?php

// only if our POST values are set
if(isset($_POST['name']) && isset($_POST['email']) && isset($_POST['message'])){

  /**
   * Store results to DB
   */

//  $link = mysql_connect('localhost', 'bsc', 'HitMeUp11!');
  $link = mysql_connect('localhost', 'root', 'root');
  if($link){

    $name = mysql_real_escape_string($_POST['name']);
    $email = mysql_real_escape_string($_POST['email']);
    $message = mysql_real_escape_string($_POST['message']);

    mysql_select_db('fk_contact', $link);
    $query = "INSERT INTO contact_messages (name, email, message) VALUES ('$name', '$email', '$message')";
    if(mysql_query($query, $link)){
      echo 'success';
    }else{
      echo mysql_error();
    }
  }

  /**
   * Send the email
   */
  $name = $_POST['name'];
  $email = $_POST['email'];
  $message = $_POST['message'];
  $now = date('Y-m-d g:ia');

  require('class.phpmailer.php');

  $mail = new PHPMailer();

  $mail->IsSMTP();
  $mail->Host = "smtp.gmail.com";
  $mail->SMTPSecure = 'ssl';
  $mail->SMTPAuth = true;
  $mail->Port = 465;

  // Add your SMTP username / password here

  $mail->Username = "bradmatthew@gmail.com";
  $mail->Password = "18h64bms!";

  // Change anything you want from this line down

  $mail->FromName = "Brad Sawicki";
  $mail->AddAddress("brad@bradsawicki.com", "Brad Sawicki");
  $mail->IsHTML(true);

  $mail->Subject = "New message from fourkites.com";
  $mail->Body    = "
<h3>New message from fourkites.com!</h3>
<p><b>Message</b>:<br/>" . nl2br(htmlspecialchars($message)) . "</p>
<p><b>Name</b>: $name</p>
<p><b>Email</b>: $email</p>
<p><b>Date</b>: $now</p>
";

  $mail->Send();

}

?>