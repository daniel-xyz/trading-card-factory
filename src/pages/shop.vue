<template>
  <section class="container">
    <div>
      <h1 class="title">
        Buy Cards
      </h1>

      <h2 class="subtitle">
        Every time you buy a card, it's creator will be rewarded!
      </h2>

      <button-menu/>

      <card-grid :cards="allCards" :buy-button="true"/>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import ButtonMenu from '~/components/ButtonMenu'
import CardGrid from '~/components/CardGrid'

export default {
  components: {
    ButtonMenu,
    CardGrid,
  },
  computed: {
    ...mapGetters(['allCards']),
  },
  created() {
    this.loadCards()
  },
  methods: {
    ...mapActions(['loadCards']),
  },
}
</script>
