<template lang='html'>
  <div class='container'>
    <img src='/nuxt-black.png'>
    <h2>Thank you for testing Nuxtron</h2>
    <p>Loaded from the {{ name }}</p>
    <p>
      <NuxtLink to='/home'>Back home</NuxtLink>
    </p>
  </div>
</template>

<script lang='ts'>
import { Context } from '@nuxt/types/app';
import Vue from 'vue';

export default Vue.extend({
  asyncData(context: Context) {
    const server = process.server ? 'server' : 'client';
    const name = process.static ? 'static' : server;
    return { name };
  }
});
</script>

<style lang='css' scoped>
.container {
  background: black;
  color: white;
  font-family: 'Lucida Console', Monaco, monospace;
  height: 100%;
  left: 0;
  padding-top: 100px;
  position: absolute;
  text-align: center;
  top: 0;
  width: 100%;
}

a {
  color: white;
}
</style>
