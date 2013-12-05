<?php
  header("Content-type: text/html; charset=utf-8;");
  require_once("../phpQuery-onefile.php");
?>

<html>
  <head>
    <title>CabanaOutLoud</title>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>

    <script type="text/javascript" src="../cabana.cabanaOutLoud.js"></script>

    <script type="text/javascript">
      $(document).ready(function() {
        $('.controls').cabanaOutLoud({
          playText: "Læs op",
          stopText: "Stop",
          pauseText: "Pause"
        });
      });

    </script>
  </head>
  <body>

    <div class="controls">
    </div>

    <div data-cabanaoutloud-read-this>
      En
    </div>

    <div data-cabanaoutloud-read-this>
      To
    </div>

  </body>
</html>
