(function($) {
  "use strict";

  var Dropdown = function( selector ) {
    this.selector = selector;

    this.html = {
      dropdown: '',
      button: '',
      name: '',
      menu: '',
      backdrop: '',
    };

    this.init();
  };


  Dropdown.prototype.init = function () {
    var self = this;

    this.html.dropdown = $(document).find(this.selector);
    this.html.button = $(this.html.dropdown).find('.dropdown__button');
    this.html.name = $(this.html.dropdown).find('.dropdown__name');
    this.html.menu = $(this.html.dropdown).find('.dropdown__menu');
    this.html.backdrop = $(this.html.dropdown).find('.dropdown__backdrop');


    $(this.html.button).on('click', function(event){
      event.preventDefault();
      self.toggle();
    });

    $(this.html.backdrop).on('click', function(event){
      event.preventDefault();
      self.close();
    })

    $(this.html.menu).find(' > li > a').on('click', function(event){
      event.preventDefault();
      self.setCheckbox( $(this) );
    })
  };

  Dropdown.prototype.toggle = function() {
    $(this.html.dropdown).toggleClass('is-active');
    $(this.html.menu).toggle();
    $(this.html.backdrop).toggleClass('show');
  };

  Dropdown.prototype.close = function() {
    $(this.html.dropdown).removeClass('is-active');
    $(this.html.menu).hide();
    $(this.html.backdrop).removeClass('show');
  };

  Dropdown.prototype.setCheckbox = function($el) {
    
    // toggle line class
    $el.toggleClass('is-checked');

    // update dropdown caption
    var selectedCount = $(this.html.dropdown).find("li > a.is-checked").length;
    if (selectedCount > 0) {
      var name = selectedCount + ' items selected';
      $(this.html.button).addClass('is-selected');
    } else {
      var name = 'Filter usergroup';
      $(this.html.button).removeClass('is-selected');
    }
    $(this.html.name).html(name);

    // toggle checkbox attr
    var $checkbox = $el.find('.checkbox input');
    if ($checkbox.attr('checked')) {
      $checkbox.removeAttr('checked');
    } else {
      $checkbox.attr('checked', 'checked');
    }
  };

  var dropdownFilter  = new Dropdown('.dropdown-filter');
  
})(jQuery);