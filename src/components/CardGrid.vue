<template>
  <div class="card-grid">
    <card v-for="(card, index) in cards" :key="index" :card="card"/>
  </div>
</template>

<script>
import Card from '~/components/Card'

export default {
  components: {
    Card,
  },
  props: {
    cards: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style scoped>
.card-grid > .card {
  margin: 0.8rem;
}
</style>