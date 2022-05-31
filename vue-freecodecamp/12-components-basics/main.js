Vue.component('tweet-message', {
  // props: ['text', 'date'],
  props: {
    text: String,
    date: String
  },
  template: `
    <div>
        <p>{{ text }}</p>
        <p>{{ date }}</p>    
    </div>
  `
});