<template>
  <div class="information">
    <Header
      :isLeft="true"
      title="详细资料"
      btn_icon="ellipsis-h"
    />
    <div class="container">
      <UserCell :user="targetUser" />
      <div class="btn_wrapper">
        <YButton
          @click="$router.push({name: 'chat', params: { targetUser }})"
        >发消息</YButton>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import UserCell from '../components/UserCell'
import YButton from '../components/YButton'

export default {
  name: 'Information',
  components: {
    Header,
    UserCell,
    YButton
  },
  computed: {
    targetUser () {
      console.log(this.$store.getters.targetUser)
      return this.$store.getters.targetUser
    }
  }
}
</script>

<style scoped>
  .information {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .container {
    width: 100%;
    height: calc(100% - 50px);
    margin-top: 50px;
    box-sizing: border-box;
    padding: 16px 0;
    background-color: #f1f1f1;
  }
  .btn_wrapper {
    box-sizing: border-box;
    padding: 20px;
  }
</style>