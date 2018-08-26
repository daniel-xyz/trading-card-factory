<template>
  <div>
    <wallet-status/>
    <nuxt/>
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

