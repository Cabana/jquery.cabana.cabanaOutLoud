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
        $('.cabanaoutloud').cabanaOutLoud({
          playText: "Læs op",
          stopText: "Stop",
          pauseText: "Pause",
        });
      });

    </script>
  </head>
  <body>

    <div class="cabanaoutloud-controls-container">
    </div>

    <?php
      /*
        Issue:
        Google do not have an API for their TTS. But theres a generated link in parser.php for the TTS mpeg-file.
        To solve this problem, the parsed text of .cabanaoutloud needs to be seperated in an array for each comma or dot.
        There after the array[0] will be loaded and played, and as soon as the array[0] file has stopped playing, the array[1] will be loaded and start playing.
        When the visitor press Pause, it will only stop the file playing etc.
      */
    ?>

    <div class="cabanaoutloud">
      <p>Her er teksten, som bliver læst op. Ja det er den!</p>
    </div>

  </body>
</html>
