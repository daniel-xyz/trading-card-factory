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

      <form @submit.prevent="submitForm()">
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

        <div class="margin-top">
          <label for="artwork">Artwork: </label>
          <input id="artwork" type="file" @change="captureFile">
        </div>

        <div v-show="isUploading">
          Uploading to IPFS ... (please wait a few seconds ⏳)
        </div>

        <div v-show="ipfsHash">
          Artwork has successfully been uploaded to IPFS! ✅
        </div>

        <div v-if="validationError" class="error">Please fill out the form and upload an image! 🧐</div>
        <button type="submit" class="submit-button margin-top-l">Create on Blockchain</button>
      </form>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import ButtonMenu from '~/components/ButtonMenu'

const IPFS_ERROR =
  "Please wait while the artwork is being uploaded. If for unknown reasons your image couldn't be uploaded, our IT sends you their apologies. Maybe choose another image?"

export default {
  name: 'Create',
  components: {
    ButtonMenu,
  },
  data() {
    return {
      validationError: false,
      title: null,
      attack: null,
      defense: null,
      file: null,
      ipfsHash: null,
      isUploading: false,
    }
  },
  methods: {
    ...mapActions(['createCard']),
    async submitForm() {
      if (!this.isFormValid()) return
      if (!this.ipfsHash) return alert(IPFS_ERROR)

      this.createCard({
        title: this.title,
        attack: this.attack,
        defense: this.defense,
        artwork: this.ipfsHash,
      })
    },
    isFormValid() {
      const isValid = !!this.title && !!this.attack && !!this.defense && !!this.file

      if (!isValid) {
        this.validationError = true

        return false
      }

      this.validationError = false

      return true
    },
    captureFile(e) {
      const reader = new window.FileReader()
      this.file = e.target.files[0]

      reader.onloadend = () => this.uploadArtwork(reader)
      reader.readAsArrayBuffer(this.file)
    },
    uploadArtwork(reader) {
      return new Promise((resolve, reject) => {
        if (!reader || !reader.result) reject()

        const buffer = Buffer.from(reader.result)

        this.isUploading = true

        this.$ipfs.files.add(buffer, { progress: prog => console.log(`received: ${prog}`) }, (error, result) => {
          if (error) {
            console.error(error)
            this.isUploading = false

            reject()
          }

          this.ipfsHash = result[0].hash
          console.log('ipfsHash', this.ipfsHash)
          this.isUploading = false

          resolve(this.ipfsHash)
        })
      })
    },
  },
}
</script>
