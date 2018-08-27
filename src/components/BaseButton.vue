<template>
  <button :class="{ 'is-selected': isSelected }" v-on="$listeners" >
    <slot/>
  </button>
</template>

<script>
export default {
  props: {
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
button {
  display: inline-block;
  padding: 10px 30px;
  border-radius: 4px;
  border: 1px solid #3b8070;
  font-size: 16px;
  text-decoration: none;
  color: #3b8070;
  background-color: #fff;
  cursor: pointer;
}

button:hover,
.is-selected {
  color: #fff;
  background-color: #3b8070;
}
</style>
