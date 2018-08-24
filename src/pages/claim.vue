<template>
  <section class="container">
    <div>
      <h1 class="title">
        Claim Rewards
      </h1>
      <h2 class="subtitle">
        If you've created a card you'll get rewarded for every purchase of that card.
      </h2>
      <button-menu/>

      <base-button @click="claimRewards">Claim Rewards</base-button>

      <div class="available">
        You can claim Ξ {{ $web3.utils.fromWei($web3.utils.toBN(openRewards), 'ether') }}
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import ButtonMenu from '~/components/ButtonMenu'
import BaseButton from '~/components/BaseButton'

export default {
  components: {
    ButtonMenu,
    BaseButton,
  },
  computed: {
    ...mapGetters(['openRewards']),
  },
  created() {
    this.loadOpenRewards()
  },
  methods: {
    ...mapActions(['loadOpenRewards', 'claimRewards']),
  },
}
</script>

<style scoped>
.available {
  margin-top: 12px;
}
</style>

