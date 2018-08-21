<template>
  <div class="card">
    <h2 class="title">{{ card.title }}</h2>
    <div class="artwork-container">
      <img v-if="image.loaded" :src="image.src" alt="Card Artwork" class="artwork">
      <div v-else class="loading-indicator">
        <div/><div/>
      </div>
    </div>
    <div class="stats-container">
      <div class="attack">
        ⚔️ {{ card.attack }}
      </div>
      <div class="defense">
        🛡 {{ card.defense }}
      </div>
    </div>
  </div>
</template>

<script>
import { getIpfsHashFromBytes32 } from '@/utils/ipfs'

export default {
  props: {
    card: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      image: {
        src: null,
        loaded: false,
      },
    }
  },
  mounted() {
    this.getImage()
  },
  methods: {
    getImage() {
      const validCID = getIpfsHashFromBytes32('0xfe0d246ece96ef9c6c317f4b76c7dd9be4be585c2f8f743d47d9de07a2e207c8')

      this.$ipfs.files.cat(validCID, (err, file) => {
        if (err) {
          this.image.loaded = false

          throw err
        }

        // converting the received data into an "image"
        var bytes = new Uint8Array(file)

        this.image.src = 'data:image/png;base64,' + this.encodeToBase64(bytes)
        this.image.loaded = true
      })
    },
    encodeToBase64(uint8Array) {
      var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
      var output = ''
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4
      var i = 0

      while (i < uint8Array.length) {
        chr1 = uint8Array[i++]
        chr2 = i < uint8Array.length ? uint8Array[i++] : Number.NaN // Not sure if the index
        chr3 = i < uint8Array.length ? uint8Array[i++] : Number.NaN // checks are needed here

        enc1 = chr1 >> 2
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
        enc4 = chr3 & 63

        if (isNaN(chr2)) {
          enc3 = enc4 = 64
        } else if (isNaN(chr3)) {
          enc4 = 64
        }
        output += keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4)
      }
      return output
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

.stats-container {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.artwork-container {
  height: 100%;
}

.artwork {
  height: 176px;
}

.attack,
.defense {
  display: inline;
}

.title {
  margin-bottom: 12px;
  font-size: 0.8rem;
}

@keyframes loading-indicator {
  0% {
    top: 96px;
    left: 96px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 18px;
    left: 18px;
    width: 156px;
    height: 156px;
    opacity: 0;
  }
}

@-webkit-keyframes loading-indicator {
  0% {
    top: 96px;
    left: 96px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 18px;
    left: 18px;
    width: 156px;
    height: 156px;
    opacity: 0;
  }
}

.loading-indicator {
  position: relative;
  width: 160px;
  height: 160px;
  -webkit-transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
  transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
}

.loading-indicator div {
  box-sizing: content-box;
  position: absolute;
  border-width: 4px;
  border-style: solid;
  opacity: 1;
  border-radius: 50%;
  -webkit-animation: loading-indicator 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  animation: loading-indicator 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

.loading-indicator div:nth-child(1) {
  border-color: #3b8070;
}

.loading-indicator div:nth-child(2) {
  border-color: #d3d3d3;
  -webkit-animation-delay: -0.5s;
  animation-delay: -0.5s;
}
</style>