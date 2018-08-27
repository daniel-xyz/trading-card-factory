<template>
  <div class="wallet-status">
    <strong>Wallet Status</strong>
    
    <div v-if="!account" class="error">Not connected</div>

    <template v-else>
      <div>::: <span class="success">Connected</span></div>
      <div>::: Address: {{ account }}</div>
      <div>::: Balance: Ξ {{ $web3.utils.fromWei($web3.utils.toBN(balance), 'ether') }}</div>
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
  text-align: left;
  margin-left: 24px;
  margin-bottom: 24px;
}
</style>
