<template>
  <section class="container">
    <div>
      <h1 class="title">
        My Cards
      </h1>
      <h2 class="subtitle">
        All Cards your Ethereum address owns.
      </h2>
      <button-menu/>
    </div>
  </section>
</template>

<script>
import ButtonMenu from '~/components/ButtonMenu'

export default {
  components: {
    ButtonMenu,
  },
}
</script>

<style scoped>
</style>
