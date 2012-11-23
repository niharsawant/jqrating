$.widget('ui.rating',
  options :
    value : 0
    limit : 5

  _create : () ->
    for i in [0...@options.limit]
      elem = "<span id='ui-rating-star#{i+1}' class='ui-rating-star'></span>"
      @element.append(elem)
    @_rate.call(@, @options.value)

  _rate : (value) ->
    if value > @options.limit then return
    @options.value = value

    for i in [0...@options.limit]
      elem = @element.find("#ui-rating-star#{i+1}")
      if i < @options.value then elem.addClass("ui-rating-starred")
      else elem.addClass("ui-rating-unstarred")

)
