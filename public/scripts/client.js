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

  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ]
  
  const renderTweets = (tweets) => {
    for (let tweet of tweets) {
      let $currTweet = createTweetElement(tweet);
      $('.container').append($currTweet);
    }
  }
  
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

  $('.container .new-tweet form').submit(event => {
    event.preventDefault();
    const input = $('#tweet-text').val();
    console.log($(input).serialize());
  })
  
  renderTweets(data);
  
});


