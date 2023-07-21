<script setup>

  import { reactive, ref, computed, onMounted, watch } from 'vue';

// Declarative Rendering
  const counter = reactive({ count: 0 })          // State that can trigger updates when changed are considered reactive. We
  counter.count++                                 // can declare reactive state using Vue's reactive() API. 
                                                  // reactive() only works on onjects (including arrays and built-in types like Map and Set).
  const message = ref('Hello World!')             // ref(), on the other hand, can take any vlaue type and create an object that exposes the
  message.value = 'Changed to Hello World!'       // inner value under a .value property. 
                                                  

// Attribute Bindings | v-bind
  const titleClass = ref('title')                 // A directive is a special attribute that starts with the v- prefix. Directive values are JS
                                                  // expressions that have access to the component's state. 
                                                  // The part after the colot (:id) is the "argument" of the directive. 

// Event Listeners | v-on
  const count = ref(0);
  function increment() {
    count.value++
  }
  function reset() {
    count.value = 0
  }

// Form Bindings | v-model 
// two-way binding | v-model = use v-bind and v-on together
  const text = ref('')
  function onInput(e) {
    // a v-on handler receives the native DOM event as the argument.
    text.value = e.target.value 
  }

// Conditional Rendering | v-if | v-else | v-else-if
  const awesome = ref(true);
  function toggle() {
    awesome.value = !awesome.value
  }

// List Rendering | v-for
  let id = 0
  const newTodo = ref('')
  const hideCompleted = ref(false)
  const todos = ref([
    { id: id++, text: 'Learn HTML', done: true },
    { id: id++, text: 'Learn JavaScript', done: true },
    { id: id++, text: 'Learn Vue', done: false }
  ])
  const filteredTodos = computed(() => {
    return hideCompleted.value 
      ? todos.value.filter((t) => !t.done) 
      : todos.value
  }) 
  function addTodo() {
    todos.value.push({ id: id++, text: newTodo.value, done: false })
    newTodo.value = ''
  }
  function removeTodo(todo) {
    todos.value = todos.value.filter((t) => t !== todo)
  }

// Lifecycle and Template Refs
  const p = ref(null)

  onMounted(() => {
    // component is now mounted. 
    p.value.textContent = 'mounted!'
  }) 

// Watchers
// watch() can directly watch a ref, and the callback gets fired whenever 
// count2's value changes. 
  const count2 = ref(0)
  watch(count2, (newCount) => {
    // yes, console.log() is a side effect
    console.log(`new count is: ${newCount}`)
  })

  const todoId = ref(1)
  const todoData = ref(null)

  async function fetchData() {
    todoData.value = null
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId.value}`)
    todoData.value = await res.json()
  }
  watch(todoId, fetchData)

</script>

<template>
<!-- Declarative Rendering -->
  <h1>{{ message }}</h1>
  <p>count is: {{ counter.count }}</p>
  <br>

<!-- Attribute Bindings | v-bind -->
  <h1 :class="titleClass">Make me red</h1>
  <br>

<!-- Event Listeners | v-on -->
  <button @click="increment">count is: {{ count }}</button>
  <button @click="reset">reset</button>
  <br>

<!-- Form Bindings | v-model -->
  <input :value="text" @input="onInput" placeholder="Type here (v-bind + v-on)">
  <input v-model="text" placeholder="Type here (v-model)">
  <p>{{ text }}</p>

<!-- Conditional Rendering | v-if | v-else | v-else-if -->
  <button @click="toggle">toggle</button>
  <h1 v-if="awesome">Vue is awesome!</h1>
  <h1 v-else>Oh no!!</h1>

<!-- List Rendering | v-for -->
<!-- Computed Property -->
  <form @submit.prevent="addTodo">
    <input v-model="newTodo">
    <button>Add Todo</button>
  </form>
  <ul>
    <li v-for="todo in filteredTodos" :key="todo.id">
      <input type="checkbox" v-model="todo.done">
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
      <button @click="removeTodo(todo)">X</button>
    </li>
  </ul>
  <button @click="hideCompleted = !hideCompleted">
    {{ hideCompleted ? 'Show all' : 'Hide completed' }}
  </button>

<!-- Lifecycle and Template Refs -->
  <p ref="p">hello</p>

<!-- Watchers -->
  <p>Todo id: {{ todoId }}</p>
  <button @click="todoId++">Fetch next todo</button>
  <p v-if="!todoData">Loading...</p>
  <pre v-else>{{ todoData }}</pre>

</template>

<!-- style -->

<style scoped>

.done {
  text-decoration: line-through;
}

.title {
  color: red;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
