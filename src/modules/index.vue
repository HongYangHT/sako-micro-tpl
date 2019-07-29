<template>
  <div class="container container-crm">
    <!-- <video-player ref="player" :params="videoOptions" /> -->
    <a-button type="primary" class="mt-1" @click="$_onNav">跳转</a-button>
    <p>{{ $t('t.code') }}</p>
    <p>{{ currentApp }}</p>
    <a-button type="primary" class="mt-1" @click="$_onNavSSO">跳转SSO</a-button>
  </div>
</template>

<script>
import { Button } from 'ant-design-vue'
import { mapActions, mapState } from 'vuex'
import PackageJson from '../../package.json'

export default {
  components: {
    [Button.name]: Button
  },
  data() {
    return {
      params: 123,
      videoOptions: {
        controlBar: {
          children: [
            {
              name: 'playToggle'
            },
            {
              name: 'progressControl'
            },
            {
              name: 'currentTimeDisplay'
            },
            {
              name: 'timeDivider'
            },
            {
              name: 'durationDisplay'
            },
            {
              name: 'volumePanel',
              inline: false
            },
            {
              name: 'fullscreenToggle'
            }
          ]
        },
        autoplay: false,
        controls: true,
        language: 'zh-CN',
        preauto: 'auto',
        width: '100%',
        height: '400',
        src: 'https://vjs.zencdn.net/v/oceans.mp4',
        playbackRates: [0.7, 1.0, 1.5, 2.0]
      },
      currentApp: PackageJson.name
    }
  },
  computed: {
    ...mapState({
      poems: state => state.poems,
      singleSpa: state => state.singleSpa
    }),
    paramb() {
      return 2
    }
  },
  created() {
    this.$_getHomeInit()
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    ...mapActions(['getHomeInit']),
    async $_getHomeInit(params) {
      return this.getHomeInit(params)
    },
    $_onNav() {
      this.$router.push({
        name: '403',
        params: {
          lang: 'en-us'
        }
      })
      // navigateToUrl('')
    },
    $_onNavSSO() {
      let mountedApps = this.singleSpa.getMountedApps()
      mountedApps.forEach(element => {
        this.singleSpa.unloadApplication(element)
      })
      this.singleSpa.navigateToUrl('/sso-micro')
    }
  }
}
</script>

<style>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 140px;
  flex-direction: column;
}

.mt-1 {
  margin-top: 15px;
}
</style>
