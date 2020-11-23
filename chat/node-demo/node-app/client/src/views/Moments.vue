<template>
  <div class="circle">
    <Header title="朋友圈" btn_icon="camera" :isLeft="true" @rightClick="$router.push('/publish')" />
    <div class="container">
      <Scroll ref="refresh" @pulldown="loadData" @pullup="loadMore">
        <div class="head_wrapper">
          <div class="user_head">
            <span>{{user.name}}</span>
            <div class="user_img">
              <img :src="user.avatar" alt="" class="head_img">
            </div>
          </div>
        </div>
        <div class="content-wrapper">
          <CellView v-for="(item, index) in momentsList" :key="index" :momentObj="item" />
        </div>
      </Scroll>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import CellView from '../components/CellView'
import Scroll from '../components/Scroll'
import jwt_decode from 'jwt-decode'

export default {
  name: 'Moments',
  components: {
    Header,
    CellView,
    Scroll
  },
  data () {
    return {
      momentsList: [],
      page: 2,
      size: 3,
      loading: false
    }
  },
  computed: {
    user () {
      const token = localStorage.wxToken
      // // 解析token
      const decode = jwt_decode(token)
      return decode
    }
  },
  created() {
    this.getLatesData()
  },
  methods: {
    getLatesData () {
      if (this.loading) return
      this.loading = true
      this.$axios.get('/api/profiles/latest')
        .then(res => {
          this.loading = false
          this.momentsList = res.data
          // 注册事件，解决重置问题
          this.$refs.refresh.$emit('refresh')
        })
        .catch(() => {
          this.loading = false
        })
    },
    loadData () {
      this.page = 2
      this.getLatesData()
    },
    loadMore () {
      if (this.loading) return
      this.loading = true
      this.$axios.get(`/api/profiles/${this.page}/${this.size}`)
        .then(res => {
          this.loading = false
          const result = res.data
          // 遍历数组
          if (result.length > 0) {
            result.forEach(item => {
              this.momentsList.push(item)
            })
            // 自增page
            this.page++
          } else {
            // 数组为空，没有更多数据，补在page自增
            this.$refs.refresh.$emit('loadedDone')
          }
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style scoped>
  .circle {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  .container {
    width: 100%;
    height: calc(100% - 50px);
    padding-top: 50px;
    overflow: auto;
  }
  .head_wrapper {
    width: 100%;
    position: relative;
    height: 200px;
    background: url(../assets/cricle_bg.png) no-repeat;
    background-size: 100% 100%;
  }
  .head_wrapper .user_head {
    position: absolute;
    bottom: -30px;
    right: 16px;
  }
  .user_img {
    width: 60px;
    height: 60px;
    padding: 3px;
    border: 1px solid #c5c5c5;
    box-sizing: border-box;
  }
  .user_head img {
    width: 100%;
    height: 100%;
  }
  .user_head span {
    line-height: 30px;
    position: absolute;
    right: 76px;
    width: 200px;
    text-align: right;
    color: white;
  }
  .content_wrapper {
    padding-top: 20px;
  }
</style>