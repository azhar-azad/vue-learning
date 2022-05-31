let app = new Vue({
  // options object
  el: '#app',
  data: {
    tweets: [],
    tweet: '',
    max_length: 200,
    error: ''
  },
  // Computed Properties
  computed: {
    maxCharsText: function () {
      return `Max: ${ this.tweet.length } of ${ this.max_length - this.tweet.length }`;
    },
    errorMessage: function () {
      return `Max char limit reached! excess chars: ${ this.max_length - this.tweet.length }`;
    }
  },
  // Methods
  methods: {
    submitData() {
      if (this.tweet.length <= this.max_length) {
        this.tweets.unshift(this.tweet);
        this.tweet = '';
      }
    }
  }
});
