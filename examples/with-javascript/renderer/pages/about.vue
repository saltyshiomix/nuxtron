<template>
  <div class="container">
    <img src="/nuxt-black.png">
    <h2>Thank you for testing Nuxtron</h2>
    <p>Loaded from the {{ name }}</p>
    <p>
      <NuxtLink to="/home">
        Back home
      </NuxtLink>
    </p>
  </div>
</template>

<script>
export default {
  asyncData ({ req }) {
    return {
      name: process.static ? 'static' : (process.server ? 'server' : 'client'),
    }
  }
}
</script>

<style scoped>
.container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: black;
  color: white;
  font-family: "Lucida Console", Monaco, monospace;
  padding-top: 100px;
  text-align: center;
}
a {
  color: white;
}
</style>