<?php
  header("Content-type: text/html; charset=utf-8;");
  require_once("../phpQuery-onefile.php");
?>

<html>
  <head>
    <title>CabanaOutLoud</title>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
    <script src="http://modernizr.com/downloads/modernizr-latest.js"></script>

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
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, ea asperiores possimus aliquid eos eum error odit ad molestias, porro officiis et aliquam dolor numquam vel voluptas eligendi ducimus. Aperiam.
    </div>

    <div data-cabanaoutloud-read-this>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos accusamus nesciunt quasi facere rerum eius expedita autem incidunt tempore sequi, totam ipsum laborum perspiciatis accusantium, nisi voluptates deserunt, beatae amet.
    </div>

  </body>
</html>
