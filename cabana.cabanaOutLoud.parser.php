<?php

require_once("../phpQuery-onefile.php");

if (isset($_GET['parse'])) {
  header("Content-type: audio/mpeg;");
}

function multiexplode ($explodes, $string) {
  $ready = str_replace($explodes, $explodes[0], $string);
  $launch = explode($explodes[0], wordwrap($ready, 80, $explodes[0]));
  return $launch;
}

if (isset($_GET['parse'])) {

  $page = file_get_contents($_GET['parse']);
  //$page = file_get_contents("http://www.fagbladet3f.dk/2-sektion/dit-job/10f6db2a53ea47ca9b0be7d639eff4b5-20130930-her-er-de-naeste-ti-aars-megabyggerier");
  $doc = phpQuery::newDocumentHTML($page);
  foreach (pq($_GET['container']) as $item) {
    $text .= trim(pq($item)->text()).".";
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

  $splitby = Array(".", ",", "?", "!", " - ", ":");

  $splitted = multiexplode($splitby, $text);

  $i = 0;

  while ($i <= count($splitted)) {
    if (isset($splitted[$i])) {
      $splitted[$i] = trim($splitted[$i], " ");
      $splitted[$i] = trim($splitted[$i], "\t");
      $splitted[$i] = trim($splitted[$i], "\n");
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

  if (!isset($_GET['part'])) {
    $exsound = "https://translate.google.com/translate_tts?tl=en&q=Something%20went%20wrong!";
  } else {
    $exsound = "https://translate.google.com/translate_tts?ie=UTF-8&tl=da&textlen=".strlen($splitted[$_GET['part']])."&q=".urlencode($splitted[$_GET['part']]);
  }

  $getsound = file_get_contents($exsound);
  print $getsound;

} else {
  print "Error! #887";
}
