<template>
  <div>
    <v-carousel>
      <v-carousel-item v-for="(src, i) in images" :key="i" :src="resolve(src)" />
    </v-carousel>
  </div>
</template>

<script>
export default {
  data: () => ({
    images: [
      'static/squirrel.jpg',
      'static/sky.jpg',
      'static/bird.jpg',
      'static/planet.jpg'
    ]
  })
}
</script>
