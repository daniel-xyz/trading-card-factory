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

      <div v-for="(card, index) in ownCards" :key="index">
        Title: {{ card.title }} <br>
        Attack: {{ card.attack }} <br>
        Defense: {{ card.defense }} <br>
        Creator: {{ card.creator }} <br>
        Artwork: {{ card.artwork }}
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ButtonMenu from '~/components/ButtonMenu'

export default {
  components: {
    ButtonMenu,
  },
  computed: {
    ...mapGetters(['ownCards']),
  },
  created() {
    this.loadGenesisCard()
  },
  methods: {
    ...mapActions(['loadGenesisCard']),
  },
}
</script>
