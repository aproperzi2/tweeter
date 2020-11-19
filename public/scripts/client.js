/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const MAXLENGTH = 140;

$(document).ready(() => {

  // toggle form
  $('.new-tweet').hide();
  $('#write-a-new-tweet').click(function() {
    $('.new-tweet').slideToggle('slow');
  })

  // bouncing arrow


  $('textarea').on('keyup', function() {
    const remain = MAXLENGTH - $(this).val().length;
    $('.counter').html(remain);

    if (remain < 0) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', 'grey');
    }
  });

  const createTweetElement = (tweetData) => {
    const $tweet = $(`
    <article class="tweets">
      <div id="tweet">
        <header id="tweeter-header">
          <div id="img-name">
            <img src="${tweetData.user.avatars}" alt="">
            <span>${tweetData.user.name}</span>
          </div>
            <span id="fade"><b>${tweetData.user.handle}</b></span>
        </header>
        <main id="tweet-main">
          <span>${tweetData.content.text}</span>
        </main>
        <footer id="tweet-footer">
          <span><b>${tweetData.created_at}</b></span>
          <div id="social-icons">
            <img src="/images/flag.png" alt="">
            <img src="/images/retweet.png" alt="">
            <img src="/images/like.png" alt="">
          </div>
        </footer>
      </div>
    </article>`);
    
    return $tweet;
  };

  const renderTweets = (tweets) => {
    for (let tweet of tweets) {
      let $currTweet = createTweetElement(tweet);
      $('.tweet-container').prepend($currTweet);
    }
  }

  const loadTweets = () => {
    $.ajax('/tweets', {method: 'GET'}) 
      .then(function(tweets) {
        renderTweets(tweets);
      })
  }

  const getTweets = (data) => {
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: data,
      success: function(data) {
        console.log('Success', data);
      }
    }) 
  }

  $('.container .new-tweet form').submit(event => {
    event.preventDefault();
    const $input = $('#tweet-text');
    if ($input.val() === "") {
      $("#error").hide();
      $("#error").text("You cannot submit an empty text field. Please try again.");
      $("#error").slideDown('slow');
      setTimeout(function() {
        $("#error").slideUp('slow');
      }, 5000);
      return;
    } else if ($input.val().length > MAXLENGTH) {
      $("#error").hide();
      $("#error").text("You cannot submit that many characters. Please try again.");
      $("#error").slideDown('slow');
      setTimeout(function() {
        $("#error").slideUp('slow');
      }, 5000);
      return;
    }
    getTweets($input.serialize());
    $('.tweets').remove();
    setTimeout(function() {
      loadTweets();
    }, 1000)
    
  })

  loadTweets();
  
});


