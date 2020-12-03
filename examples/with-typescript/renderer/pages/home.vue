<template lang='html'>
  <div class='container'>
    <img src='/nuxt.png'>
    <h2>Hello Nuxtron.</h2>
    <p>Loaded from the {{ name }}</p>
    <p>
      <NuxtLink to='/about'>About</NuxtLink>
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
  background: white;
  color: black;
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
  color: black;
}
</style>
