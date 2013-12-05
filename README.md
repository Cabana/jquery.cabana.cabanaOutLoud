# Cabana Out Loud

Text to speech.

## Dependencies

* jQuery library
* jQuery UI Core library
* phpQuery-onefile.php
* cabana.cabanaOutLoud.parser.php

## Usage

- Put "cabana.cabanaOutLoud.parser.php" and "phpQuery-onefile.php" at the root.
- Make an element for the controls.
- Make an element with some text you wanna have read out loud.
- Instantiate the plugin.

```javascript
$('[data-cabanaoutloud-read-this]').cabanaOutLoud();
```

## Options

```javascript
$('.cabanaoutloud').cabanaOutLoud({

  url: [string] // The URL for the page where the text to be read this. Default is `window.location.href`.

  playText: [string] // Text on the play button. Default is "Play".

  pauseText: [string] // Text on the pause button. Default is "Pause".

  stopText: [string] // Text on the stop button. Default is "Stop".

  playClass: [string] // The class added to the play button. Default is "col_play".

  pauseClass: [string] // The class added to the pause button. Default is "col_pause".

  stopClass: [string] // The class added to the play button. Default is "col_play".

  controlsContainerClass: [string] // The class of the element where the controls will be placed. Default is "cabanaoutloud-controls-container".

  textContainerSelector: [string] // A selector matching the element containing the text to read. Default is "[data-cabanaoutloud-read-this]".

});
```

## Methods

- `destroy`: Remove the sayt functionality by unbinding the events and removing the results container.
- `option`: Sets an option associated with the specified `optionName`. Options can be changed in the fly after the plugin has been initialized.

## Data parameters

Some of the options can also be set via `data-` attributes on the element. They will override any options set when initializing the plugin.

- `data-col-url`
- `data-col-play-text`
- `data-col-pause-text`
- `data-col-stop-text`
- `data-col-play-class`
- `data-col-pause-class`
- `data-col-stop-class`
- `data-col-controls-container-class`
- `data-col-text-container-selector`

## Events

- `cabanoutloud:play`: When the audio starts.
- `cabanoutloud:stop`: When the audio stops.
- `cabanoutloud:pause`: When the audio pauses, or resumes.
- `cabanoutloud:pause:pause`: When the audio pauses.
- `cabanoutloud:pause:resume`: When the audio resumes after a pause.
