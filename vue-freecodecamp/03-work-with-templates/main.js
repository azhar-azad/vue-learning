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
    ]
  }
});