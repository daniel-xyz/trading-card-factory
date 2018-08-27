<template>
  <section>
    <div>
      <h1 class="title">
        My Cards
      </h1>

      <h2 class="subtitle">
        All cards your ethereum address owns.
      </h2>

      <button-menu/>

      <card-grid :cards="ownCards"/>

      <div v-if="!ownCards || !ownCards.length">
        You don't have any cards yet. Let's <nuxt-link to="/shop">buy</nuxt-link> some!
      </div>
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
    ...mapGetters(['ownCards']),
  },
  created() {
    this.loadCardsOwned()
  },
  methods: {
    ...mapActions(['loadCardsOwned']),
  },
}
</script>
