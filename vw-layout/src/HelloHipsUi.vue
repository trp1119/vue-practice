<template>
  <div>
    两侧slot
    <MyNavBar
      title="标题"
      header-height="48"
      theme="primary"
    >
      <div slot="left">左侧slot</div>
      <div slot="right">右侧slot</div>
    </MyNavBar>
    基础用法
    <MyNavBar
      title="标题"
      :back-button="{
        showLeftArrow: true,
      }"
    />
    没有导航按钮
    <MyNavBar
      title="标题可以很长长长长长长长长长长长长长长长长长长长长长长长长长长"
    />
    两侧最多支持两个导航按钮
    <MyNavBar
      title="标题"
      :back-button="backButton"
      :left-buttons="leftButtons"
      :right-buttons="rightButtons"
    />
    只有图标的按钮
    <MyNavBar
      title="标题"
      :back-button="backButton"
      :left-buttons="leftButtons2"
      :right-buttons="rightButtons2"
    />

  </div>

</template>

<script>
import MyNavBar from './MyNavBar'
export default {
  components: {
    MyNavBar,
  },
  data () {
    return {
      backButton: {
        showLeftArrow: true,
        // backText: '返回'
      },
      leftButtons: [
        {
          buttonIcon: 'close',
          buttonLabel: '关闭'
        }
      ],
      rightButtons: [
        {
          buttonIcon: '',
          buttonLabel: '分享'
        },
        {
          buttonIcon: '',
          buttonLabel: '我的'
        }
      ],
      leftButtons2: [
        {
          buttonIcon: 'close',
          buttonLabel: ''
        }
      ],
      rightButtons2: [
        {
          buttonIcon: 'search',
          buttonLabel: ''
        },
        {
          buttonIcon: 'upgrade',
          buttonLabel: ''
        }
      ],
    }
  },
}
</script>

<style>

</style>