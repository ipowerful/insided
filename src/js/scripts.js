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
    if ( groupCheckbox.is(":checked") ){
      groupCheckbox.prop("checked", false);
    }
    
  });


  // Table Toggle Row All
  //------------------------------------------------------------------------------
  $('.table').on('change', '.js-toggle-row-all input', function (e){
    var isChecked = $(this).is(":checked");

    $('.table tr').each(function(){
      var input = $(this).find('.js-toggle-row input');

      if( !isChecked ){
        input.prop("checked", false);
        $(this).removeClass('is-checked');
      } else {
        input.prop("checked", true);
        $(this).addClass('is-checked');
      }
    });
  });



  // User Data Processing
  //------------------------------------------------------------------------------

  // Load User Data
  getUsersData();  

  // Get Data via Ajax
  function getUsersData(){
    var url = "php/users.php";
    $.ajax({
      url: url ,
      dataType: "json",
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
