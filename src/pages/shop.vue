<template>
  <section class="container">
    <div>
      <h1 class="title">
        Buy Cards
      </h1>

      <h2 class="subtitle">
        Every time you buy a card, the creator of it will be rewarded!
      </h2>

      <button-menu/>

      <card-grid :cards="allCards"/>
    </div>
  </section>
</template>

<script>
import ButtonMenu from '~/components/ButtonMenu'
import CardGrid from '~/components/CardGrid'
import { mapActions, mapGetters } from 'vuex'

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
