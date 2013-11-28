/*
 *   jquery cabanaOutLoud plugin
 *   jQuery UI Widget-factory plugin (for 1.8/9+)
 *   v0.1
 */

;(function ($, window, document, undefined) {

  $.widget("cabana.cabanaOutLoud", {
    /*
    *   set version
    */
    version: '0.1',

    /*
     * Options to be used as defaults
     */
    options: {
      url: window.location.href,

      playText: "Play",
      pauseText: "Pause",
      stopText: "Stop",

      playClass: "col_play",
      stopClass: "col_stop",
      pauseClass: "col_break",

      audio: document.createElement("audio"),
      trackPos: null,
      part: 0,

      controlsContainerClass: 'cabanaoutloud-controls-container'
    },

    /*
     * Prefix all custom events that this widget will fire: "FBComments:beforerender"
     */
    widgetEventPrefix: 'cabanaOutLoud:',

    /*
     * Setup widget (eg. element creation, apply theming, bind events etc.)
     */
    _create: function () {
      this._render();
      this._hidePause();
      this._hideStop();

      var _this = this;
      $('.'+this.options.playClass,
        '.'+this.options.pauseClass,
        '.'+this.options.stopClass).click(function(e) {
        e.preventDefault();
      });

      $('.'+this.options.playClass).click(function()  { _this.play(); });
      $('.'+this.options.pauseClass).click(function() { _this.pause(); });
      $('.'+this.options.stopClass).click(function()  { _this.stop(); });

      var _this = this;
      $(this.options.audio).on('ended', function() {
        _this.continue();
      });
    },

    /*
     * Destroy an instantiated plugin and clean up modifications the widget has made to the DOM
     */
    _destroy: function () {
      $('.'+this.options.playClass,
        '.'+this.options.pauseClass,
        '.'+this.options.stopClass).remove();

      $(this.options.audio).stop().remove();
    },

    /*
     * Render to the DOM
     */
    _render: function () {
      var markup = [
          "<button type='button' class='"+this.options.playClass+"'>"
        +   this.options.playText
        + "</button> ",

          "<button type='button' class='"+this.options.pauseClass+"'>"
        +   this.options.pauseText
        + "</button> ",

          "<button type='button' class='"+this.options.stopClass+"'>"
        +   this.options.stopText
        + "</button>"
      ].join("");

      $("."+this.options.controlsContainerClass).append(markup);
    },

    /*
     * Set options
     */
    _setOption: function (key, value) {
      switch (key) {
        case "someValue":
          //this.options.someValue = doSomethingWith( value );
          break;
        default:
          //this.options[ key ] = value;
          break;
      }
      this._super( "_setOption", key, value );
    },

    play: function() {
      this.options.audio.setAttribute("type", "audio/mpeg");
      this._continueOnEnd();
      this.options.audio.play();

      this._hidePlay();
      this._showPause();
      this._showStop();
    },

    pause: function() {
      if (this.options.trackPos == null) {
        this.options.trackPos = this.options.audio.currentTime;
        this.options.audio.pause();
        this._pauseElem().text(this.options.playText);
      } else {
        this.options.audio.currentTime = this.options.trackPos;
        this.options.audio.play();
        this.options.trackPos = null;
        this._pauseElem().text(this.options.pauseText);
      }
    },

    stop: function() {
      this.options.trackPos = null;
      this.options.part = 0;
      this._continueOnEnd();
      this._hidePause();
      this._showPlay();
      this._hideStop();
      this._pauseElem().text(this.options.pauseText);
    },

    continue: function() {
      this.options.part++;
      this._continueOnEnd();
      this.options.audio.play();
    },

    _continueOnEnd: function() {
      var src =
        // at some point we should implement that this class can be changed
        // most of the plumbing required has been done
        "/cabana.cabanaOutLoud.parser.php?container=" + "cabanaoutloud" +
        "&parse=" + this.options.url +
        "&part=" + this.options.part;

      this.options.audio.setAttribute("src", src);
    },

    _stopElem: function()  { return $('.'+this.options.stopClass);  },
    _pauseElem: function() { return $('.'+this.options.pauseClass); },
    _playElem: function()  { return $('.'+this.options.playClass);  },

    _hidePause: function() { $(this._pauseElem()).hide(0); },
    _hideStop: function()  { $(this._stopElem()).hide(0);  },
    _hidePlay: function()  { $(this._playElem()).hide(0);  },

    _showPause: function() { $(this._pauseElem()).show(0); },
    _showStop: function()  { $(this._stopElem()).show(0);  },
    _showPlay: function()  { $(this._playElem()).show(0);  }
  });

})(jQuery, window, document);
