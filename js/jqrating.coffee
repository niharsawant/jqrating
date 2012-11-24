$.widget('ui.rating',
  options :
    value    : 0
    limit    : 5
    readOnly : true
    onRate   : (points) ->

  _create : () ->
    if isNaN(@options.limit) then return
    if @options.value > @options.limit then return
    @_initStars()
    @_setValue()
    @_setMode()

  _initStars : () ->
    if isNaN(@options.limit) then return
    @element.empty()
    for i in [0...@options.limit]
      elem = "<span id='ui-rating-star#{i+1}' class='ui-rating-star'></span>"
      @element.append(elem)

  _setValue : (value) ->
    points = value or @options.value
    if points > @options.limit then return
    for i in [0...@options.limit]
      elem = @element.find("#ui-rating-star#{i+1}")
      if i < points
        elem.removeClass("ui-rating-unstarred").addClass("ui-rating-starred")
      else
        elem.removeClass("ui-rating-starred").addClass("ui-rating-unstarred")

  _setMode : () ->
    if @options.readOnly or @options.disabled
      @element.undelegate('.ui-rating-star', 'mouseenter')
        .undelegate('.ui-rating-star', 'mouseleave')
        .find('.ui-rating-star').addClass('ui-rating-readonly')
    else
      thisref = @
      @element.delegate('.ui-rating-star', 'mouseleave', (ev) => @_setValue())
        .delegate('.ui-rating-star', 'mouseenter', (ev) ->
          id = $(@).attr('id')
          count = parseInt(/ui-rating-star(\d+)/.exec(id)[1], 10)
          thisref._setValue(count)
        )
        .delegate('.ui-rating-star', 'click', (ev) ->
          id = $(@).attr('id')
          count = parseInt(/ui-rating-star(\d+)/.exec(id)[1], 10)
          thisref.options.value = count
          thisref.options.onRate.call(thisref, count)
        )
        .find('.ui-rating-star').removeClass('ui-rating-readonly')

  _disable : () ->
    @element.find('.ui-rating-star')
      .removeClass('ui-rating-starred ui-rating-unstarred')
      .addClass('ui-rating-disabled')
    @_setMode()

  _enable : () ->
    @element.find('.ui-rating-star').removeClass('ui-rating-disabled')
    @_setValue()
    @_setMode()

  _setOption : (key, value) ->
    switch key
      when 'limit'
        if isNaN(@options.limit) then return
        @options.limit = value
        @_initStars()
        @_setValue()
      when 'value'
        if @options.value > @options.limit then return
        @options.value = value
        @_setValue()
      when 'readOnly'
        @options.readOnly = value
        @_setMode()
      when 'disabled'
        @options.disabled = value
        if value then @_disable()
        else @_enable()
      else console.error('Invalid Option')

)
