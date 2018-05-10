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

    $('.table .sort').each(function(){
      $(this).data('dir','');
      $(this).removeClass('sort__desc','sort__asc');
    })
    $(this).data('dir', newDir);
    $(this).addClass('sort__' + newDir);

    getUsersData();
  });
  



  // User Data Processing
  //------------------------------------------------------------------------------

  // Load User Data
  getUsersData();  

  // Get User Attr
  function getUsersSortAttr(){
    var attr = {};
    $('.table .sort').each(function(){
      if( $(this).data('dir') != '' ){
        attr['dir'] = $(this).data('dir');
        attr['column'] = $(this).data('column');
        return attr;
      }
    });
    return attr;
  }

  // Get Data via Ajax
  function getUsersData(){
    var url = 'php/users.php';
    var data = $.param( getUsersSortAttr() );
    $.ajax({
      url: url,
      data: data,
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
