// Vue JS goes here
let app = new Vue({
  // options object
  el: '#app',
  data: {
    title: 'John Doe portfolio',
    titleHTML: 'John Doe <span class="badge">Portfolio</span>',
    projects: [
      {title: "portfolio", languages: ["HTML", "CSS", "VueJS"]},
      {title: "grocery shop", languages: ["HTML", "CSS", "PHP"]},
      {title: "blog", languages: ["HTML", "CSS", "PHP"]},
      {title: "automation script", languages: ["Python"]},
      {title: "eCommerce", languages: ["HTML", "CSS", "PHP"]}
    ],
    dynamicId: 'projects_section',
    dynamicClass: 'projects',
    disabled: true,
    attribute_name: 'href',
    url: 'https://google.com',
    event_name: 'click',
  },
  methods: {
    runFunction() {
      console.log('test click function');
    }
  }
});

/**
  <!-- Long syntax -->
  <a v-bind:href="url">Some link</a>
  <!-- Shot syntax -->
  <a :href="url">Some link</a>
  <!-- Long syntax with dynamic arguments -->
  <a v-bind:[attribute_name]="url">Some link</a>
  <!-- Shot syntax with dynamic arguments -->
  <a :[attribute_name]="url">Some link</a>
 *
 *
  <!-- Long syntax -->
  <a v-on:click="runFunction">Some link</a>
  <!-- Shot syntax -->
  <a @click="runFunction">Some link</a>
  <!-- Long syntax with dynamic arguments -->
  <a v-on:[attribute_name]="runFunction">Some link</a>
  <!-- Shot syntax with dynamic arguments -->
  <a @:[attribute_name]="runFunction">Some link</a>
* */