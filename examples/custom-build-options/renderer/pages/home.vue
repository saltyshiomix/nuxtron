<template>
  <div class="container">
    <img :src="resolve('static/nuxt.png')">
    <h2>Hello World.</h2>
    <p><nuxt-link :to="resolve('about')">About</nuxt-link></p>
  </div>
</template>

<style scoped>
.container {
  font-family: sans-serif;
  padding-top: 130px;
  text-align: center;
}
</style>
