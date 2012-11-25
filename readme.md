#JQRating : jQuery Plugin for Rating
Simple jQuery plugin for rating, written in CoffeeScript and LESS.

This plugin uses [widget factory](http://api.jqueryui.com/jQuery.widget), so most of the time it follows jQuery UI conventions. You can learn more about Widget Factory on its [wiki page](http://wiki.jqueryui.com/w/page/12138135/Widget factory). Even though everything is written in preprocessors like Coffeescript and LESS, compiled Javascript and CSS can also be found on respective directories.

### Options
* value    : _(default : 0)_ assign number of points to be marked as starred
* limit    : _(default : 5)_ maximum number of points one can give
* readOnly : _(default : true)_ decides if plugin mode is readonly or editable
* hints    : _(default : ['Hated it', 'Disliked it', 'It was okay', 'Liked it', 'Loved it'])_ tooltip to be shown on stars from left to right order_

### Methods
* onrate : invoked when some one rates

### How to hack
Instead of adding lots of options and increasing size of code, this section depcits how to manipulate with code.
* **Change/Resize Rating Image** : Each star has been assigned `ui-rating-star` class in CSS/LESS. It has properties such as `width`, `height`, `background-size`; feel free to manipulate them according to your convenience. As well as in case of changing star image, selectors such as `ui-rating-starred`, `ui-rating-unstarred`, `ui-rating-disabled` has property `background-image` change it desired image path.
* **Seperate Image for each Star** : Each star has id called `ui-star-rating*n*` where n is index of star. If you wish to assign distinct image to each of such stars, add appropriate selectors with proper index and assign `background-image` to each of them.
* **Custom Tooltips** : I prefer using custom tooltips such as [Tipsy](http://onehackoranother.com/projects/jquery/tipsy/), you can even add custom tooltips for hints. There is a private method called `_setHints` you can add appropriate plugins in that method.

### Dependencies
1.  jQuery v1.8 <
2.  Widget Factory