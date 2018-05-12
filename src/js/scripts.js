"use strict";

$(document).ready(function(){



  // Sidebar Navigation
  //------------------------------------------------------------------------------

  $('.sidebar__nav .js-has-subnav').click(function(e) {
    e.preventDefault();
    $(this).toggleClass('is-active');
    $(this).parent().find('.sidebar__subnav').toggle();
  });


  // Table Toggle Row
  //------------------------------------------------------------------------------

  $('.table').on('change', '.js-toggle-row input', function (e){
    var checkbox = $(this);
    var row = $(this).parents('tr');

    row.toggleClass('is-checked');

    // group checkbox uncheck
    var groupCheckbox = $('.js-toggle-row-all input');
    if ( groupCheckbox.is(':checked') ){
      groupCheckbox.prop('checked', false);
    }

  });


  // Table Toggle Row All
  //------------------------------------------------------------------------------
  $('.table').on('change', '.js-toggle-row-all input', function (e){
    var isChecked = $(this).is(':checked');

    $('.table tr').each(function(){
      var input = $(this).find('.js-toggle-row input');

      if( !isChecked ){
        input.prop('checked', false);
        $(this).removeClass('is-checked');
      } else {
        input.prop('checked', true);
        $(this).addClass('is-checked');
      }
    });
  });


  // Table Sort
  //------------------------------------------------------------------------------
  $('.table .js-table-sort').click(function(e) {
    e.preventDefault();

    var dir = $(this).data('dir');

    if( dir == '') {
      var newDir = 'asc';
    } else if( dir == 'asc') {
      var newDir = 'desc';
    } else if( dir == 'desc') {
      var newDir = 'asc';
    }

    $('.table .sort').data('dir','');
    $(this).data('dir', newDir);
    
    $('.table .sort').removeClass('sort__asc').removeClass('sort__desc');
    $(this).addClass('sort__' + newDir);

    getUsersData();
  });
  

  // Table Search
  //------------------------------------------------------------------------------
  $('#jsUsernameSearch .search__btn').click(function(e) {
    e.preventDefault();

    getUsersData();
  });




  // User Data Processing
  //------------------------------------------------------------------------------

  // Load User Data
  getUsersData();  

  // Get User Attr
  function getUsersAttr(){
    var attr = {};

    // sort attr
    $('.table .sort').each(function(){
      if( $(this).data('dir') != '' ){
        attr['dir'] = $(this).data('dir');
        attr['column'] = $(this).data('column');
        return attr;
      }
    });

    // search attr
    var search = $(document).find('#jsUsernameSearch');
    var searchInput = $(search).find('.search__input');
    var searchInputVal = searchInput.val();
    if( searchInputVal !== undefined ){
      attr['search'] = searchInputVal;
    }

    return attr;
  }

  // Get Data via Ajax
  function getUsersData(){
    var url = 'php/users.php';
    var data = getUsersAttr() ;
    $.ajax({
      url: url,
      data: $.param(data),
      dataType: 'json',
      success: successFn
    });
  }

  // Success
  function successFn(data){
    if(data.length>0){

      var $holder = $('#tableRowHolder');
      var tpl = $('#tableRowTemplate').html();

      $holder.empty();

      var cols = [
        'img', 
        'username', 
        'email',
        'topics',
        'replies',
        'solved',
        'usergroup',
        'rdate',
        'ldate'
      ];

      $.each(data, function( key, json ) {
        var row = tpl;

        $.each(cols, function( key2, column ) {
          row = row.replace('{{' + column + '}}', json[ column ]);
        })

        $holder.append(row);
      });
    }
  }
})


// AJAX Settings
//------------------------------------------------------------------------------

$(document).ajaxStart(function() {
  $('.backdrop').addClass('is-visible');
});

$(document).ajaxComplete(function() {
  setTimeout(function() { $('.backdrop').removeClass('is-visible') }, 500);
});
