<template>
  <div class="exception">
    <div class="content">
      <h1>{{ config[type].title }}</h1>
      <div class="desc">{{ config[type].desc }}</div>
      <div class="action">
        <i-button type="primary" @click="$_handleToHome">返回首页</i-button>
        <p>{{ $t('t.code') }}</p>
        <p>{{ currentApp }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from 'iview'
import PackageJson from '../../../package.json'

export default {
  name: 'ExceptionFrame',
  components: {
    [Button.name]: Button
  },
  props: {
    type: {
      type: String,
      default: '404'
    }
  },
  data() {
    return {
      config: {
        403: {
          title: '403',
          desc: '抱歉，你无权访问该页面'
        },
        404: {
          title: '404',
          desc: '抱歉，你访问的页面不存在或仍在开发中'
        },
        500: {
          title: '500',
          desc: '抱歉，服务器出错了'
        }
      },
      currentApp: PackageJson.name
    }
  },
  methods: {
    $_handleToHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.exception {
  align-items: center;
  text-align: center;
  margin-top: 150px;

  .content {
    display: inline-block;
    flex: auto;

    h1 {
      color: #434e59;
      font-size: 72px;
      font-weight: 600;
      line-height: 72px;
      margin-bottom: 24px;
    }

    .desc {
      color: rgba(0, 0, 0, 0.45);
      font-size: 20px;
      line-height: 28px;
      margin-bottom: 16px;
    }
  }
}
</style>
