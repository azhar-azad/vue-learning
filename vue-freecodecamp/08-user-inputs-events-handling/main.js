// let userAge = Number(prompt('What\'s your age?'));
let userAge = 18;
let app = new Vue({
  // options object
  el: '#app',
  data: {
    titleHTML: 'John Doe <span class="badge">Portfolio</span>',
    projects: [
      { title: 'My first project', description: 'A simplified Twitter clone', likes: 0 },
      { title: 'My second project', description: 'Projects portfolio with GitHub', likes: 0 }
    ]
  },
  methods: {
    runFunction() {
      console.log('test click function');
    },
    likeProject(index, event) {
      console.log(event); // get the original event
      const project = this.projects[index];
      project.likes++;
      console.log(project.likes);
    },
    addLike(project) {
      const projectTitle = project.title;
      if (!localStorage.getItem(projectTitle)) {
        project.likes++;
        localStorage.setItem(projectTitle, true);
      }
    },
    removeLike(project, event) {
      event.preventDefault(); // This can be omitted if we use the prevent key modifier like this: @click.right.prevent="removeLike(project)"
      const projectTitle = project.title;
      if (project.likes > 0 && localStorage.getItem(projectTitle)) {
        project.likes--;
        localStorage.removeItem(projectTitle);
      }
    }
  },
  mounted() {
    this.projects.forEach(project => {
      if (localStorage.getItem(project.title) !== null) {
        project.likes = 1;
      }
    });
  }
});

/**
  <!-- Long syntax -->
  <a v-bind:href="url">Some link</a>
  <!-- Short syntax -->
  <a :href="url">Some link</a>
  <!-- Long syntax with dynamic arguments -->
  <a v-bind:[attribute_name]="url">Some link</a>
  <!-- Shot syntax with dynamic arguments -->
  <a :[attribute_name]="url">Some link</a>
 *
 *
  <!-- Long syntax -->
  <a v-on:click="runFunction">Some link</a>
  <!-- Short syntax -->
  <a @click="runFunction">Some link</a>
  <!-- Long syntax with dynamic arguments -->
  <a v-on:[attribute_name]="runFunction">Some link</a>
  <!-- Shot syntax with dynamic arguments -->
  <a @:[attribute_name]="runFunction">Some link</a>
* */