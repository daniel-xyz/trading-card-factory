<template>
  <div class="card-grid">
    <div v-for="(card, index) in cards" :key="index" class="card-container">
      <card :card="card"/>
      <base-button v-if="buyButton" class="buy-button" @click="buyCard(card)">
        Buy for Ξ {{ $web3.utils.fromWei($web3.utils.toBN(card.weiPrice), 'ether') }}
      </base-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import Card from '~/components/Card'
import BaseButton from '~/components/BaseButton'

export default {
  components: {
    Card,
    BaseButton,
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
  methods: {
    ...mapActions(['buyCard']),
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