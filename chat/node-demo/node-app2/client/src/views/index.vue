<template>
  <div class="index">
    <router-view></router-view>
    <TabBar :tabBarData="tabBarData"/>
  </div>
</template>

<script>
import TabBar from '../components/TabBar'
export default {
  name: 'index',
  components: {
    TabBar
  },
  data () {
    return {
      tabBarData: [
        { title: '微信', icon: 'comment', path: '/chats'},
        { title: '通讯录', icon: 'address-book', path: '/contacts'},
        { title: '发现', icon: 'compass', path: '/discover'},
        { title: '我', icon: 'user', path: '/me'}
      ]
    }
  }
}
</script>

<style scoped>
  .index {
    width: 100%;
    height: 100%;
  }
</style>