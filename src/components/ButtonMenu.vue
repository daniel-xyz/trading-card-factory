<template>
  <div class="links">
    <nuxt-link v-if="$route.name !== 'index'" to="/">
      <base-button class="button">
        Home
      </base-button>
    </nuxt-link>

    <nuxt-link to="/create">
      <base-button :is-selected="isRoute('create')" class="button">
        Create Card
      </base-button>
    </nuxt-link>

    <nuxt-link to="/shop">
      <base-button :is-selected="isRoute('shop')" class="button">
        Card Shop
      </base-button>
    </nuxt-link>

    <nuxt-link to="/overview">
      <base-button :is-selected="isRoute('overview')" class="button">
        My Cards
      </base-button>
    </nuxt-link>

    <nuxt-link to="/claim">
      <base-button :is-selected="isRoute('claim')" class="button">
        Claim Rewards
      </base-button>
    </nuxt-link>
  </div>
</template>

<script>
import BaseButton from '~/components/BaseButton'

export default {
  components: {
    BaseButton,
  },
  methods: {
    isRoute(name) {
      return this.$route.name === name
    },
  },
}
</script>

<style scoped>
.links {
  padding: 16px 16px 50px;
}

.button {
  margin-left: 15px;
}
</style>
