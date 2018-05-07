//
// Sidebar Navigation
//

$('.dropdown__toggle').click(function(e) {
  e.preventDefault();

  $(this).toggleClass('is-active');
  $(this).parent().find('.dropdown-menu').toggle();
});

$('.dropdown-menu > li > a').click(function(e) {
  e.preventDefault();
  
  var name = $(this).html();
  var $dropdown = $(this).parents('.dropdown');
  var $dropdown__toggle = $dropdown.find('.dropdown__toggle');
  var $dropdown__name = $dropdown.find('.dropdown__name');
  var $dropdown__menu = $dropdown.find('.dropdown-menu');

  $dropdown__name.html(name);
  $dropdown__toggle.addClass('is-selected');
  $dropdown__menu.hide();
});


//
// Sidebar Navigation
//

$('.sidebar__nav .js-has-subnav').click(function(e) {
  e.preventDefault();

  $(this).toggleClass('is-active');
  $(this).parent().find('.sidebar__subnav').toggle();
});
