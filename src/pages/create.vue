<template>
  <section class="container">
    <div>
      <h1 class="title">
        Create a new Card
      </h1>
      <h2 class="subtitle">
        It will show up in Booster Packs afterwards. You'll even get a reward whenever someone gets your Card in a Booster Pack.
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
