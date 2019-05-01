<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card v-for="(card, i) in cards" :key="i" style="margin-bottom: 16px;">
        <img :src="resolve(card.img)" width="100%" />
        <v-card-title primary-title>
          <div>
            <div class="headline" v-text="card.title"></div>
            <span class="grey--text" v-text="card.subtitle"></span>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    cards: [
      { img: 'static/squirrel.jpg', title: 'Squirrel', subtitle: '1,000 miles of wonder' },
      { img: 'static/sky.jpg', title: 'Sky', subtitle: '1,000 miles of wonder' },
      { img: 'static/bird.jpg', title: 'Bird', subtitle: '1,000 miles of wonder' },
      { img: 'static/planet.jpg', title: 'Planet', subtitle: '1,000 miles of wonder' },
    ],
  }),
}
</script>
