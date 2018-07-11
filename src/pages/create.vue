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

      <form>
        <div>
          <label for="title">Card Title: </label>
          <input id="title" v-model="title" type="text" placeholder="Text">
        </div>

        <div class="margin-top">
          <label for="attack">Attack Value: </label>
          <input id="attack" v-model="attack" type="number" placeholder="Number">
        </div>

        <div class="margin-top">
          <label for="defense">Defense Value: </label>
          <input id="defense" v-model="defense" type="number" placeholder="Number">
        </div>

        <!-- <div class="margin-top">
          <label for="artwork">Artwork: </label>
          <input id="artwork" type="file">
        </div> -->

        <button type="submit" class="submit-button margin-top-l">Create on Blockchain</button>
      </form>
    </div>
  </section>
</template>

<script>
import ButtonMenu from '~/components/ButtonMenu'

export default {
  components: {
    ButtonMenu,
  },
  data() {
    return {
      title: null,
      attack: null,
      defense: null,
    }
  },
}
</script>
