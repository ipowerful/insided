//
// Sidebar Navigation
//

$('.sidebar__nav .js-has-subnav').click(function(e) {
  e.preventDefault();
  $(this).toggleClass('is-active');
  $(this).parent().find('.sidebar__subnav').toggle();
});
