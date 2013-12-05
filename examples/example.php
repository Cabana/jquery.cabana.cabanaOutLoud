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
        var loud = $('[data-cabanaoutloud-read-this]');

        loud.cabanaOutLoud({
          playText: "Læs op",
          stopText: "Stop",
          pauseText: "Pause",
          controlsContainerClass: 'controls'
        });
      });

    </script>
  </head>
  <body>

    <div class="controls">
    </div>

    <div data-cabanaoutloud-read-this>
      <p>Her er teksten, som bliver læst op. Ja det er den!</p>
    </div>

  </body>
</html>
