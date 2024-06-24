<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/test2">View Test2</router-link>
      <router-link to="/test3">View Test3</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
