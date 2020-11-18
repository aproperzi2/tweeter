/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const MAXLENGTH = 140;

$(document).ready(() => {
  $('textarea').on('keyup', function() {
    const remain = MAXLENGTH - $(this).val().length;
    $('.counter').html(remain);

    if (remain < 0) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', 'grey');
    }
  });
});
