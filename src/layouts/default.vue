<template>
  <div class="container">
    <nuxt/>
    <wallet-status/>
  </div>
</template>

<script>
import WalletStatus from '~/components/WalletStatus'

export default {
  components: {
    WalletStatus,
  },
}
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  padding: 24px;
}
</style>
