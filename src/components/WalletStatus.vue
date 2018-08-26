<template>
  <div class="wallet-status">
    <strong>Wallet Status:</strong>
    
    <span v-if="!account" class="error">Not connected</span>

    <template v-else>
      <div class="success">::: Connected</div>
      <div> ::: Address: {{ account }}</div>
      <div> ::: Balance: Ξ {{ $web3.utils.fromWei($web3.utils.toBN(balance), 'ether') }}</div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      account: null,
      balance: 0,
    }
  },
  async created() {
    const accounts = await this.$web3.eth.getAccounts()

    if (!accounts || !accounts.length) return null

    const balance = await this.$web3.eth.getBalance(accounts[0])

    this.account = accounts[0]
    this.balance = balance
  },
}
</script>

<style scoped>
.wallet-status {
  position: absolute;
  bottom: 24px;
  left: 24px;
}
</style>
