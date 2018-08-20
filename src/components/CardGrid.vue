<template>
  <div class="card-grid">
    <div v-for="(card, index) in cards" :key="index" class="card-container">
      <card :card="card"/>
      <button v-if="buyButton" class="buy-button">Buy for Ξ {{ $web3.utils.fromWei($web3.utils.toBN(card.weiPrice), 'ether') }} </button>
    </div>
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
    buyButton: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.card-grid > .card-container {
  display: inline-block;
  margin: 0.8rem;
}

.buy-button {
  display: block;
  margin: 8px auto auto;
}
</style>