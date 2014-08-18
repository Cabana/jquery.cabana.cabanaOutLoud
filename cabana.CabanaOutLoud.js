/*
 *   jquery cabanaOutLoud plugin
 *   jQuery UI Widget-factory plugin (for 1.8/9+)
 */

;(function ($, window, document, undefined) {

  $.widget("cabana.cabanaOutLoud", {
    /*
    * set version
    */
    version: '1.7',

    /*
     * Options to be used as defaults
     */
    options: {
      url: window.location.href,

      playText: "Play",
      pauseText: "Pause",
      stopText: "Stop",
      loadingText: "Henter..",

      playClass: "col_play",
      stopClass: "col_stop",
      pauseClass: "col_pause",
      loadingClass: "col_loading",

      audio: document.createElement("audio"),
      preload: document.createElement("audio"),
      trackPos: null,
      part: 0,

      textContainerSelector: '[data-cabanaoutloud-read-this]'
    },

    _applyDataParams: function() {
      this._applyDataParam('url', 'col-url');

      this._applyDataParam('playText', 'col-play-text');
      this._applyDataParam('pauseText', 'col-pause-text');
      this._applyDataParam('stopText', 'col-stop-text');

      this._applyDataParam('playClass', 'col-play-class');
      this._applyDataParam('pauseClass', 'col-pause-class');
      this._applyDataParam('stopClass', 'col-stop-class');

      this._applyDataParam('textContainerSelector', 'col-text-container-selector');
    },

    /*
     * Prefix all custom events that this widget will fire: "cabanaOutLoud:someevent"
     */
    widgetEventPrefix: 'cabanaoutloud:',

    /*
     * Setup widget
     */
    _create: function () {
      var _this = this;

      _this._applyDataParams();

      _this._render();
      _this._hidePause();
      _this._hideStop();

      $('.'+_this.options.playClass).click(function(e)  { e.preventDefault(); });
      $('.'+_this.options.pauseClass).click(function(e) { e.preventDefault(); });
      $('.'+_this.options.stopClass).click(function(e)  { e.preventDefault(); });

      $('.'+_this.options.playClass).click(function()  { _this.play(); });
      $('.'+_this.options.pauseClass).click(function() { _this.pause(); });
      $('.'+_this.options.stopClass).click(function()  { _this.stop(); });

      $(_this.options.audio).on('ended', function() { _this.continue(); });

      $(_this.options.audio).on("loadeddata", function() {
        $("."+_this.options.loadingClass).fadeOut(200);
      });
    },

    /*
     * Destroy an instantiated plugin and clean up modifications the widget has made to the DOM
     */
    _destroy: function () {
      $('.'+this.options.playClass).remove();
      $('.'+this.options.pauseClass).remove();
      $('.'+this.options.stopClass).remove();

      $(this.options.audio).stop().remove();
      $(this.options.preload).stop().remove();
    },

    /*
     * Render to the DOM
     */
    _render: function () {
      var markup = [
          "<button type='button' class='"+this.options.playClass+"'>"
        +   this.options.playText
        + "</button> ",

          "<span class='"+this.options.loadingClass+"' style='display:none;'>"
        +   this.options.loadingText
        + "</span>",

          "<button type='button' class='"+this.options.pauseClass+"'>"
        +   this.options.pauseText
        + "</button> ",

          "<button type='button' class='"+this.options.stopClass+"'>"
        +   this.options.stopText
        + "</button>"
      ].join("");

      $(this.element).append(markup);
    },

    /*
     * Set options
     */
    _setOption: function (key, value) {
      this.options[key] = value;
      this._super( "_setOption", key, value );
    },

    play: function() {
      this._trigger("play", null, {
        element: this.element,
        options: this.options
      });

      this.options.audio.setAttribute("type", "audio/mpeg");
      this._continueOnEnd();
      this.options.audio.play();

      this._hidePlay();
      this._showPause();
      this._showStop();
    },

    pause: function() {
      this._trigger("pause", null, {
        element: this.element,
        options: this.options
      });

      if (this.options.trackPos == null) {
        this.options.trackPos = this.options.audio.currentTime;
        this.options.audio.pause();
        this._pauseElem().text(this.options.playText).addClass("play-icon");

        this._trigger("pause:pause", null, {
          element: this.element,
          options: this.options
        });
      } else {
        this.options.audio.currentTime = this.options.trackPos;
        this.options.audio.play();
        this.options.trackPos = null;
        this._pauseElem().text(this.options.pauseText).removeClass("play-icon");

        this._trigger("pause:resume", null, {
          element: this.element,
          options: this.options
        });
      }
    },

    stop: function() {
      this.options.audio.pause();
      this.options.trackPos = null;
      this.options.part = 0;
      this.options.audio.setAttribute("src", "");
      this._continueOnEnd("stop");
      this._hidePause();
      this._showPlay();
      this._hideStop();
      this._pauseElem().text(this.options.pauseText).removeClass("play-icon");
      $("."+this.options.loadingClass).fadeOut(200);

      this._trigger("stop", null, {
        element: this.element,
        options: this.options
      });
    },

    continue: function() {
      if (typeof(Modernizr) == "undefined" ) {
        if (!this._pauseElem().hasClass("play-icon") && this._stopElem().css("display") != "none" && this._playElem().css("display") == "none") {
          this.options.part++;
          this._continueOnEnd();
          this.options.audio.play();

          this._trigger("continue", null, {
            element: this.element,
            options: this.options
          });
        }
      } else {
        if (Modernizr.mq("(max-width: 767px)")) {
          this.stop();
        } else {
          if (!this._pauseElem().hasClass("play-icon") && this._stopElem().css("display") != "none" && this._playElem().css("display") == "none") {
            this.options.part++;
            this._continueOnEnd();
            this.options.audio.play();

            this._trigger("continue", null, {
              element: this.element,
              options: this.options
            });
          }
        }
      }
    },

    _continueOnEnd: function(action) {

      console.log("_continueOnEnd");

      var absoluteUrl = "http://cdn.cabana.dk/modules/col/v1.7/cabana.cabanaOutLoud.parser.php";
      //var absoluteUrl = "../cabana.cabanaOutLoud.parser.php";

      if (typeof(Modernizr) == "undefined" ) {

        var src =
          absoluteUrl+"?container=" + this.options.textContainerSelector +
          "&parse=" + this.options.url +
          "&part=" + this.options.part;

        this.options.audio.setAttribute("src", src);

        var preloadsrc = 
          absoluteUrl+"?container=" + this.options.textContainerSelector +
          "&parse=" + this.options.url +
          "&part=" + this.options.part+1;

        this.options.preload.setAttribute("src", preloadsrc);

      } else {

        if (Modernizr.mq("(max-width: 767px)")) {
          console.log("small enough");

          if (action != "stop") {
            $("."+this.options.loadingClass).fadeIn(200);
          }

          var src =
            absoluteUrl+"?container=" + this.options.textContainerSelector +
            "&parse=" + this.options.url +
            "&mobile=true";
            this.options.audio.setAttribute("src", src);
        } else {
          var src =
            absoluteUrl+"?container=" + this.options.textContainerSelector +
            "&parse=" + this.options.url +
            "&part=" + this.options.part;
          this.options.audio.setAttribute("src", src);
        }

      }
    },

    _stopElem: function()  { return $('.'+this.options.stopClass);  },
    _pauseElem: function() { return $('.'+this.options.pauseClass); },
    _playElem: function()  { return $('.'+this.options.playClass);  },

    _hidePause: function() { $(this._pauseElem()).hide(0); },
    _hideStop: function()  { $(this._stopElem()).hide(0);  },
    _hidePlay: function()  { $(this._playElem()).hide(0);  },

    _showPause: function() { $(this._pauseElem()).show(0); },
    _showStop: function()  { $(this._stopElem()).show(0);  },
    _showPlay: function()  { $(this._playElem()).show(0);  },

    _applyDataParam: function(optionToSet, dataParam) {
      if ($(this.element).data(dataParam)) {
        this.options[optionToSet] = $(this.element).data(dataParam);
      }
    }
  });

})(jQuery, window, document);
