(function() {

  $.widget('ui.rating', {
    options: {
      value: 0,
      limit: 5
    },
    _create: function() {
      var elem, i, _i, _ref;
      for (i = _i = 0, _ref = this.options.limit; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        elem = "<span id='ui-rating-star" + (i + 1) + "' class='ui-rating-star'></span>";
        this.element.append(elem);
      }
      return this._rate.call(this, this.options.value);
    },
    _rate: function(value) {
      var elem, i, _i, _ref, _results;
      if (value > this.options.limit) {
        return;
      }
      this.options.value = value;
      _results = [];
      for (i = _i = 0, _ref = this.options.limit; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        elem = this.element.find("#ui-rating-star" + (i + 1));
        if (i < this.options.value) {
          _results.push(elem.addClass("ui-rating-starred"));
        } else {
          _results.push(elem.addClass("ui-rating-unstarred"));
        }
      }
      return _results;
    }
  });

}).call(this);
