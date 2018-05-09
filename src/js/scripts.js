"use strict";

$(document).ready(function(){





  // Sidebar Navigation
  //------------------------------------------------------------------------------

  $('.sidebar__nav .js-has-subnav').click(function(e) {
    e.preventDefault();
    $(this).toggleClass('is-active');
    $(this).parent().find('.sidebar__subnav').toggle();
  });



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


// Sidebar Navigation
//------------------------------------------------------------------------------

$(document).ajaxStart(function() {
  $('.backdrop').addClass('is-visible');
});

$(document).ajaxComplete(function() {
  setTimeout(function() { $('.backdrop').removeClass('is-visible') }, 500);
});
