<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> | 
      <router-link :to="{ name: 'profile', params: { username: 'azad' } }">Profile</router-link>  
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  // programmaticNavigation = [
  //   // route by route path
  //   "this.$route.push('home')",

  //   // object
  //   "this.$route.push({ path: 'home' })",

  //   // named route navigation with parameters
  //   "this.$route.push({ name: 'user', params: { userId: '123' } })",

  //   // with query params, resulting in /profile?info=some_info
  //   "this.$route.push({ path: 'profile', query: { info: 'some_info' } })"
  // ]
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
