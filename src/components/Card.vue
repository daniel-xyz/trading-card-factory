<template>
  <div class="card">
    <h2 class="card__title">{{ card.title }}</h2>
    <div class="card_stats-container">
      <div class="card__attack">
        ⚔️ {{ card.attack }}
      </div>
      <div class="card__defense">
        🛡 {{ card.defense }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style scoped>
.card {
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  width: 220px;
  height: 260px;
  padding: 0.8rem;
  border: 1px solid lightgrey;
  border-radius: 12px;
  overflow: hidden;
}

.card_stats-container {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.card__attack,
.card__defense {
  display: inline;
}

.card__title {
  font-size: 0.8rem;
}
</style>