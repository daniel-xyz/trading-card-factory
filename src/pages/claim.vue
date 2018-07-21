<template>
  <section class="container">
    <div>
      <h1 class="title">
        Claim Rewards
      </h1>
      <h2 class="subtitle">
        If you've created a Card you'll get rewarded every time someone finds it in a Booster Pack.
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
