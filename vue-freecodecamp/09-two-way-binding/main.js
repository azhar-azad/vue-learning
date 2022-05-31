let app = new Vue({
  // options object
  el: '#app',
  data: {
    tweets: [],
    tweet: '',
    max_length: 200
  },
  methods: {
    submitData() {
      if (this.tweet.length <= this.max_length) {
        this.tweets.unshift(this.tweet);
        this.tweet = '';
      }
    }
  }
});
