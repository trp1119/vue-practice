<template>
  <div>
    <Header title="微信" btn_icon="plus" />
    <div class="container">
      <UserCell
        v-for="(chatItem, index) in chatDataList"
        :key="index"
        :user="chatItem.target"
        :count="chatItem.count"
        @click="$router.push({ name: 'chat', params: { targetUser: chatItem.target }})"
      />
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import UserCell from '../components/UserCell'
import WSocket from '../socket'
import jwt_decode from 'jwt-decode'

export default {
  name: 'Chats',
  components: {
    Header,
    UserCell
  },
  data () {
    return {
      chatDataList: []
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$axios.get(`/api/messages/msg/${vm.user.id}`)
        .then(res => {
          vm.chatDataList = res.data
        })
    })
  },
  mounted() {
    WSocket.init({user: this.user}, message => {
      this.setMsgCount(message)
    }, error => {
      console.log(error)
    })
  },
  computed: {
    user () {
      const token = localStorage.wxToken
      // // 解析token
      const decode = jwt_decode(token)
      return decode
    }
  },
  methods: {
    setMsgCount (message) {
      console.log(message)
      // 判断消息列表中是否有该用户
      let chatUser = this.chatDataList.filter(chatItem => {
        return chatItem.target._id === message.from
      })
      // 如果存在，count + 1，并将消息保存在列表中
      if (chatUser.length > 0) {
        chatUser[0].count++
        chatUser[0].message.push({
          msg: message.msg,
          source: 'other'
        })
        console.log(chatUser[0].target, chatUser[0].count, chatUser[0].message)
        this.saveMessage(chatUser[0].target, chatUser[0].count, chatUser[0].message)
      } else {
        // 如果不存在，那么获取用户信息，并显示提醒
        this.getUserInfo(message)
      }
    },
    getUserInfo (message) {
      // 根据 id 查询用户信息
      this.$aixos.get(`/api/users/${message.from}`)
        .then(res => {
          const msg = []
          msg.push({
            msg: message.msg,
            source: 'other',
          })
        })
        // 将消息保存在聊天列表中， count 为 1
        this.chatDataList.push({
          target: res.data,
          count: 1,
          message: msg
        })
        this.saveMessage(res.data, 1, msg)
    },
    /**
     * 保存信息
     */
    saveMessage (targetUser, count, msg) {
      const messageObj = {
        target: {
          avatar: targetUser.avatar,
          name: targetUser.name,
          _id: targetUser._id
        },
        count,
        message: msg,
        user_id: this.user.id
      }
      this.$axios.post('/api/messages/addmsg', messageObj)
        .then(res => {
          console.log(res)
          console.log('数据保存成功2')
        })
    }
  }
}
</script>

<style scoped>
  .chat {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .container {
    width: 100%;
    height: calc(100% - 50px);
    margin-top: 50px;
    overflow: auto;
  }
</style>