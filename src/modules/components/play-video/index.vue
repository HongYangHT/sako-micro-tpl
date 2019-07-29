<template>
  <div class="play-wrapper">
    <video ref="videoPlayer" class="video-js vjs-default-skin vjs-big-play-centered" />
  </div>
</template>

<script>
import videojs from 'video.js/dist/video.min.js'
import 'video.js/dist/video-js.min.css'

export default {
  name: 'VideoPlayer',
  props: {
    params: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      player: null
    }
  },
  watch: {
    params: {
      handler(val) {
        this.player.pause()
        this.player.src(val.src)
        this.player.load(val.src)
        // this.player.play()
      },
      deep: true
    }
  },
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, this.params)
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose()
    }
  },
  methods: {
    stop() {
      this.player.pause()
    }
  }
}
</script>
<style>
.play-wrapper {
  position: relative;
  width: 100%;
  height: 300px;
}

.video-js {
  width: 100%;
  height: 100%;
  font-size: 14px; /* 给.video-js设置字体大小以统一各浏览器样式表现，因为video.js采用的是em单位 */
}

.video-js button {
  outline: none;
}
</style>
