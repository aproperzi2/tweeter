/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  $('textarea').on('keyup', function() {
    // let remain = 140 - $(this).val().length;
    $('.counter').html(140 - $(this).val().length);

    if (remain < 0) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', 'grey');
    }
  });
});
