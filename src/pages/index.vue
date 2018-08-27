<template>
  <section>
    <div>
      <h1 class="title">
        Trading Card Factory
      </h1>
      <h2 class="subtitle">
        A dApp to create, buy and collect trading cards.
      </h2>
      <button-menu/>
    </div>
  </section>
</template>

<script>
import ButtonMenu from '~/components/ButtonMenu.vue'

export default {
  components: {
    ButtonMenu,
  },
}
</script>

<style scoped>
.title {
  font-size: 100px;
}

.subtitle {
  font-size: 42px;
}
</style>
