(function() {

  $.widget('ui.rating', {
    options: {
      value: 0,
      limit: 5,
      readOnly: true,
      hints: ['Poor', 'Average', 'Good', 'Very Good', 'Excellent'],
      onRate: null
    },
    _create: function() {
      if (isNaN(this.options.limit)) {
        return;
      }
      if (this.options.value > this.options.limit) {
        return;
      }
      this._initStars();
      this._setValue();
      return this._setMode();
    },
    _initStars: function() {
      var elem, i, _i, _ref, _results;
      if (isNaN(this.options.limit)) {
        return;
      }
      this.element.empty();
      _results = [];
      for (i = _i = 0, _ref = this.options.limit; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        elem = "<span id='ui-rating-star" + (i + 1) + "' class='ui-rating-star'></span>";
        _results.push(this.element.append(elem));
      }
      return _results;
    },
    _setValue: function(value) {
      var elem, i, points, _i, _ref;
      points = value || this.options.value;
      if (points > this.options.limit) {
        return;
      }
      for (i = _i = 0, _ref = this.options.limit; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        elem = this.element.find("#ui-rating-star" + (i + 1));
        if (i < points) {
          elem.removeClass("ui-rating-unstarred").addClass("ui-rating-starred");
        } else {
          elem.removeClass("ui-rating-starred").addClass("ui-rating-unstarred");
        }
      }
      return this.element;
    },
    _setHints: function() {
      var i, _i, _ref, _results;
      _results = [];
      for (i = _i = 0, _ref = this.options.limit; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        if (this.options.hints[i]) {
          _results.push(this.element.find("#ui-rating-star" + (i + 1)).attr('title', this.options.hints[i]));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    },
    _removeHints: function() {
      return this.element.find('.ui-rating-star').attr('title', '');
    },
    _setMode: function() {
      var thisref,
        _this = this;
      if (this.options.disabled) {
        this.element.find('.ui-rating-star').removeClass('ui-rating-starred ui-rating-unstarred').addClass('ui-rating-disabled');
        this._removeHints();
      } else {
        this.element.find('.ui-rating-star').removeClass('ui-rating-disabled');
        this._setHints();
      }
      if (this.options.readOnly) {
        return this.element.undelegate('.ui-rating-star', 'mouseenter').undelegate('.ui-rating-star', 'mouseleave').find('.ui-rating-star').addClass('ui-rating-readonly');
      } else {
        thisref = this;
        return this.element.delegate('.ui-rating-star', 'mouseleave', function(ev) {
          return _this._setValue();
        }).delegate('.ui-rating-star', 'mouseenter', function(ev) {
          var count, id;
          id = $(this).attr('id');
          count = parseInt(/ui-rating-star(\d+)/.exec(id)[1], 10);
          return thisref._setValue(count);
        }).delegate('.ui-rating-star', 'click', function(ev) {
          var count, hint, id;
          id = $(this).attr('id');
          count = parseInt(/ui-rating-star(\d+)/.exec(id)[1], 10);
          thisref.options.value = count;
          hint = thisref.options.hints[count - 1];
          if (thisref.options.onRate) {
            return thisref.options.onRate.call(thisref, count, hint);
          }
        }).find('.ui-rating-star').removeClass('ui-rating-readonly');
      }
    },
    _setOption: function(key, value) {
      switch (key) {
        case 'limit':
          if (isNaN(this.options.limit)) {
            return;
          }
          this.options.limit = value;
          this._initStars();
          return this._setValue();
        case 'value':
          if (this.options.value > this.options.limit) {
            return;
          }
          this.options.value = value;
          return this._setValue();
        case 'readOnly':
          this.options.readOnly = value;
          return this._setMode();
        case 'hints':
          if (value instanceof Array) {
            this.options.hints = value;
          }
          return this._setHints();
        case 'disabled':
          this.options.disabled = value;
          this._setMode();
          return this._setValue();
        default:
          return console.error('Invalid Option');
      }
    },
    value: function() {
      if (arguments.length <= 0) {
        return this.options.value;
      } else if (arguments.length === 1) {
        if (isNaN(arguments[0])) {
          return;
        }
        this.options.value = arguments[0];
        return this._setValue();
      }
    }
  });

}).call(this);
