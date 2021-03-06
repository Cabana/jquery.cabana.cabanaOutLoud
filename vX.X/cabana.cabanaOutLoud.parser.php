<?php  header("Access-Control-Allow-Origin: *");

/*
Version: 0.7
Last update: 18. august 2014
Last editor: Leo Ørsnes
*/


$context = stream_context_create(array('http' => array('header'=>'Connection: close\r\n')));


require_once("../phpQuery-onefile.php");

function multiexplode ($explodes, $string) {
  $ready = str_replace($explodes, $explodes[0], $string);
  $launch = explode($explodes[0], wordwrap($ready, 80, $explodes[0]));
  return $launch;
}

if (isset($_GET['parse'])) {

  $page = file_get_contents($_GET['parse'], false, $context);

  if ($page === false) {
    header("Content-type: text/html;");
    print "Der opstod en fejl!<br />Fejlkode: 12872";
    exit;
  } else {
    header("Content-type: audio/mpeg;");
  }
  //$page = file_get_contents("http://www.fagbladet3f.dk/2-sektion/dit-job/10f6db2a53ea47ca9b0be7d639eff4b5-20130930-her-er-de-naeste-ti-aars-megabyggerier");
  $doc = phpQuery::newDocumentHTML($page);
  foreach (pq($_GET['container']) as $item) {
    $text .= trim(pq($item)->text()).". ";
  }
  if (pq(".last" . $_GET['container'])) {
    $factbox = trim(pq(".last" . $_GET['container'])->text());
  }
  //$text = trim(pq(".content.article .article")->text());


  if ($factbox != "") {
    $text .= $factbox;
  }

  $text = str_replace("..", ".", $text);
  $text = str_replace("- ", "", $text);

  $splitby = Array(". ", ".\n", ",", "?", "!", " - ", ":", "\n");

  //$regex = ^(/\d*\.\d*/);

  $splitted = array_slice(array_filter(multiexplode($splitby, $text)), 0);

  $i = 0;

  while ($i <= count($splitted)) {
    if (isset($splitted[$i])) {
      $splitted[$i] = trim($splitted[$i], " ");
      $splitted[$i] = trim($splitted[$i], "\t");
      $splitted[$i] = trim($splitted[$i], "\n");
      $splitted[$i] = str_replace("cookies", "kukis", $splitted[$i]);
      $splitted[$i] = str_replace("Cookies", "kukis", $splitted[$i]);
    }
    $i++;
  }

  /*$ap = 0; //array position

  foreach ($splitted as $cc) { //cc = checkchar

    if (strlen($cc) > 80) {
      $newcc = wordwrap($cc, 80, ".", true);
    }

  }*/

  if ($_GET['return'] == 1) {
    header("Content-type: text/html; charset=utf-8");
    print "<pre>";
    print_r($splitted);
    print "<pre>";
    exit;
  }

  if (!isset($_GET['part']) && $_GET['mobile'] != "true") {
    $exsound = "https://translate.google.com/translate_tts?tl=en&q=Something%20went%20wrong!";
  } else if ($_GET['mobile'] != "true") {
    $exsound = "https://translate.google.com/translate_tts?ie=UTF-8&tl=da&textlen=".strlen($splitted[$_GET['part']])."&q=".urlencode($splitted[$_GET['part']]);

    $silencepattern = "/^UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU*U$/";
    $finaloutput = "";

    $getsound = file_get_contents($exsound, false, $context);
    $getsound = explode("LAME3.98.2", $getsound);


    foreach ($getsound as $sound) {
      if (!preg_match($silencepattern, $sound)) {
        $finaloutput = $finaloutput.$sound;
      }
    }

    if ($finaloutput != "") {
      print $finaloutput;
    }

  } else {
    $i = 0;

    foreach ($splitted as $part) {
      $collect[$i] = "https://translate.google.com/translate_tts?ie=UTF-8&tl=da&textlen=".strlen($part)."&q=".urlencode($part);
      $sample[$i] = file_get_contents($collect[$i], false, $context);
      $i++;
    }


    foreach ($sample as $s) {
      $output = $output.$s;
    }

    print $output;

  }


} else {
  print "Error! #887";
}
