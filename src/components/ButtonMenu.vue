<template>
  <div class="links">
    <nuxt-link
      v-if="$route.name !== 'index'"
      class="button"
      to="/">
      Home
    </nuxt-link>

    <nuxt-link
      :class="{ 'button--selected': selected === 'create'}"
      class="button"
      to="/create">
      Create Card
    </nuxt-link>

    <nuxt-link
      :class="{ 'button--selected': selected === 'shop'}"
      class="button"
      to="/shop">
      Card Shop
    </nuxt-link>

    <nuxt-link
      :class="{ 'button--selected': selected === 'overview'}"
      class="button"
      to="/overview">
      My Cards
    </nuxt-link>

    <nuxt-link
      :class="{ 'button--selected': selected === 'claim'}"
      class="button"
      to="/claim">
      Claim Rewards
    </nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: null,
    }
  },
  created() {
    this.selected = this.$route.name
  },
}
</script>

<style scoped>
.links {
  padding: 16px 16px 50px;
}

.button {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button:hover,
.button--selected {
  color: #fff;
  background-color: #3b8070;
}
</style>
