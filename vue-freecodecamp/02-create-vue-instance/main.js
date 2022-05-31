// Vue JS goes here
let app = new Vue({
  // options object
  el: '#app',
  data: {
    alert: 'This is an alert message!',
    // projects: [
    //   { title: 'portfolio', desc: 'Lorem ipum' },
    //   { title: 'twitter clone', desc: 'Lorem ipum' }
    // ]
    projects: [
      {title: "portfolio", languages: ["HTML", "CSS", "VueJS"]},
      {title: "grocery shop", languages: ["HTML", "CSS", "PHP"]},
      {title: "blog", languages: ["HTML", "CSS", "PHP"]},
      {title: "automation script", languages: ["Python"]},
      {title: "eCommerce", languages: ["HTML", "CSS", "PHP"]}
    ]
  }
});