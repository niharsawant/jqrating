(function() {

  $.widget('ui.rating', {
    options: {
      value: 0,
      limit: 5,
      readOnly: true,
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
      var elem, i, points, _i, _ref, _results;
      points = value || this.options.value;
      if (points > this.options.limit) {
        return;
      }
      _results = [];
      for (i = _i = 0, _ref = this.options.limit; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        elem = this.element.find("#ui-rating-star" + (i + 1));
        if (i < points) {
          _results.push(elem.removeClass("ui-rating-unstarred").addClass("ui-rating-starred"));
        } else {
          _results.push(elem.removeClass("ui-rating-starred").addClass("ui-rating-unstarred"));
        }
      }
      return _results;
    },
    _setMode: function() {
      var thisref,
        _this = this;
      if (this.options.disabled) {
        this.element.find('.ui-rating-star').removeClass('ui-rating-starred ui-rating-unstarred').addClass('ui-rating-disabled');
      } else {
        this.element.find('.ui-rating-star').removeClass('ui-rating-disabled');
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
          var count, id;
          id = $(this).attr('id');
          count = parseInt(/ui-rating-star(\d+)/.exec(id)[1], 10);
          thisref.options.value = count;
          if (thisref.options.onRate) {
            return thisref.options.onRate.call(thisref, count);
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
        case 'disabled':
          this.options.disabled = value;
          this._setMode();
          return this._setValue();
        default:
          return console.error('Invalid Option');
      }
    }
  });

}).call(this);
