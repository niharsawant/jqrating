#JQRating : jQuery Plugin for Rating
Simple jQuery plugin for rating, written in CoffeeScript and LESS. 

This plugin uses [widget factory](http://api.jqueryui.com/jQuery.widget), so most of the time it follows jQuery UI conventions. You can learn more about Widget Factory on its [wiki page](http://wiki.jqueryui.com/w/page/12138135/Widget factory). Even though everything is written in preprocessors like Coffeescript and LESS, compiled Javascript and CSS can also be found on respective directories.

### Options
* value : _(default : 0)_ assign number of points to be marked as starred
* limit : _(default : 5)_ maximum number of points one can give
* readOnly : _(default : true)_ decides if plugin mode is readonly or editable

### Methods
* onrate : invoked when some one rates

### Dependencies
1.  jQuery v1.8 <
2.  Widget Factory