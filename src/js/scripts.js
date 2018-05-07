//
// Dropdown
//

$('.dropdown__toggle').click(function(e) {
  e.preventDefault();

  $(this).toggleClass('is-active');
  $(this).parent().find('.dropdown__menu').toggle();
  $(this).parent().find('.dropdown__backdrop').toggle();
});

$('.dropdown__backdrop').click(function(e) {
  e.preventDefault();

  $('.dropdown').removeClass('is-active');
  $('.dropdown__menu').hide();
  $('.dropdown__backdrop').hide();
});

// Common dropdown behavior
$('.js-dropdown .dropdown__menu > li > a').click(function(e) {
  e.preventDefault();

  var $el = $(this);
  var name = $el.html();
  var $dropdown = $el.parents('.dropdown');
  var $dropdownToggle = $dropdown.find('.dropdown__toggle');
  var $dropdownName = $dropdown.find('.dropdown__name');
  var $dropdownMenu = $dropdown.find('.dropdown__menu');

  $dropdownName.html(name);
  $dropdownToggle.addClass('is-selected');
  $dropdownMenu.hide();
});


// Multi dropdown behavior
$('.dropdown-filter .dropdown__menu > li > a').click(function(e) {
  e.preventDefault();

  var $el = $(this);
  var $checkbox = $el.find('.checkbox input');
  var $dropdown = $el.parents('.dropdown');
  var $dropdownToggle = $dropdown.find('.dropdown__toggle');
  var $dropdownMenu = $dropdown.find('.dropdown__menu');
  var $dropdownName = $dropdown.find('.dropdown__name');

  // toggle line class
  $el.toggleClass('is-checked');

  // update dropdown caption
  var selectedCount = $dropdownMenu.find("li > a.is-checked").length;
  if (selectedCount > 0) {
    var name = selectedCount + ' items selected';
    $dropdownToggle.addClass('is-selected');
  } else {
    var name = 'Filter usergroup';
    $dropdownToggle.removeClass('is-selected');
  }
  $dropdownName.html(name);

  // toggle checkbox attr
  if ($checkbox.attr('checked')) {
    $checkbox.removeAttr('checked');
  } else {
    $checkbox.attr('checked', 'checked');
  }
});



//
// Sidebar Navigation
//

$('.sidebar__nav .js-has-subnav').click(function(e) {
  e.preventDefault();

  $(this).toggleClass('is-active');
  $(this).parent().find('.sidebar__subnav').toggle();
});
