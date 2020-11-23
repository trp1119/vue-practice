<template>
  <div
    :class="[
      hipsNavBar,
      hipsThinlineTopBottom,
      themeMy,
    ]"
    :style="{height: headerHeight + 'px'}"
  >
    <div class="hips-nav-bar__buttons hips-nav-bar__buttons--left">
      <!-- 返回按钮 -->
      <div v-if="backButton" class="hips-nav-bar__button hips-nav-bar__button--have-icon">
        <hips-icon name="arrow-left" />
      </div>
      <!-- 左侧导航按钮 -->
      <div v-if="leftButtons" class="hips-nav-bar__button hips-nav-bar__button--have-icon">
        <!-- 左侧最多支持两个导航按钮 -->
        <hips-icon v-if="leftButtons[0].buttonIcon" :name="leftButtons[0].buttonIcon"/>
        <span v-if="leftButtons[0].buttonLabel">{{leftButtons[0].buttonLabel}}</span>
          <!-- 第2个自定义导航按钮 bug：如果有了back，这里还能添加，这样左侧就超过2个了-->
        <hips-icon v-if="leftButtons[1]" :name="leftButtons[0].buttonIcon"/>
        <span v-if="leftButtons[1]">{{leftButtons[0].buttonLabel}}</span>
      </div>
      <!-- 左侧slot -->
      <slot name="left"></slot>
    </div>
    <div class="hips-ellipsis hips-nav-bar__title" style="width: calc(100% - 78px); margin: 0px 39px;">
      <span>{{title}}</span>
    </div>
    <div class="hips-nav-bar__buttons hips-nav-bar__buttons--right">
      <slot name="right"></slot>
      <!-- 右侧导航按钮 -->
      <div v-if="rightButtons" class="hips-nav-bar__button hips-nav-bar__button--have-icon">
        <!-- 右侧最多支持两个导航按钮 -->
        <hips-icon v-if="rightButtons[0].buttonIcon" :name="rightButtons[0].buttonIcon"/>
        <span v-if="rightButtons[0].buttonLabel">{{rightButtons[0].buttonLabel}}</span>
          <!-- 第2个自定义导航按钮 bug：如果有了back，这里还能添加，这样左侧就超过2个了-->
        <hips-icon v-if="rightButtons[1].buttonIcon" :name="rightButtons[1].buttonIcon"/>
        <span v-if="rightButtons[1].buttonLabel">{{rightButtons[1].buttonLabel}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon, Tabs, Tab } from 'hips';
export default {
  components: {
    hipsIcon: Icon,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,   
  },
  props: {
    headerHeight: {
      type: [ String, Number ],
      default: '48',
    },
    title: {
      type: [ String ],
      default: '默认标题',
    },
    theme: String,
    backButton: {
      type: [ String, Boolean, Object ],
      showLeftArrow: false,
    },
    leftButtons: Array,
    rightButtons: Array,
  },
  data () {
    return {
      hipsNavBar: 'hips-nav-bar',
      hipsThinlineTopBottom: 'hips-thinline--top-bottom',
      themeMy: 'hips-nav-bar__theme-default'
    }
  },
  methods: {
    themeChange () {
      switch (this.theme) {
        case 'default':
          this.themeMy = 'hips-nav-bar__theme-default'
          return this.themeMy
        case 'primary':
          this.themeMy = 'hips-nav-bar__theme-primary'
          return this.themeMy
        case 'darkPrimary':
          this.themeMy = 'hips-nav-bar__theme-dark-Primary'
          return this.themeMy
        case 'approved':
          this.themeMy = 'hips-nav-bar__theme-dark-approved'
          return this.themeMy
        case 'wait':
          this.themeMy = 'hips-nav-bar__theme-dark-wait'
          return this.themeMy
        case 'reject':
          this.themeMy = 'hips-nav-bar__theme-dark-reject'
          return this.themeMy
        case 'tips':
          this.themeMy = 'hips-nav-bar__theme-dark-tips'
          return this.themeMy
        default:
          this.themeMy = 'hips-nav-bar__theme-default'
          return this.themeMy
      }
    }
  },
  mounted() {
    this.themeChange ()
  },
  watch: {
    theme () {
      this.themeChange ()
    }
  },
}
</script>

<style scoped>
  .hips-nav-bar {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    font-size: 16px;
    position: relative;
    white-space: nowrap;
    width: 100%;
    background-color: #fff;
    color: #1f8ceb;
  }
  .hips-nav-bar__theme-default {
    background-color: #fff;
    color: #1f8ceb;
  }
  .hips-nav-bar__theme-primary {
    background-color: #1f8ceb;
    color: #fff;
  }
  .hips-nav-bar__theme-dark-primary {
    background-color: #1d77c5;
    color: #fff;
  }
  .hips-nav-bar__theme-dark-approved {
    background-color: #48d2a0;
    color: #fff;
  }
  .hips-nav-bar__theme-dark-wait {
    background-color: #f5a627;
    color: #fff;
  }
  .hips-nav-bar__theme-dark-reject {
    background-color: #f96f68;
    color: #fff;
  }
  .hips-nav-bar__theme-dark-tips {
    background-color: #fdf9ed;
    color: #1f8ceb;
  }
  .hips-nav-bar__buttons {
    display: flex;
    align-items: center;
    position: absolute;
    height: 100%;
  }
  .hips-nav-bar__buttons--left {
    text-align: left;
    top: 0;
    left: 0;
  }
  .hips-nav-bar__buttons--right {
    text-align: right;
    top: 0;
    right: 0;
  }
  .hips-ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .hips-nav-bar__title {
    text-align: center;
    font-size: 16px;
  }
  .hips-nav-bar__title {
    color: #4a4a4a;
  }
  .hips-nav-bar__buttons--left .hips-nav-bar__button {
    padding-left: 15px;
  }
  .hips-nav-bar__buttons--right .hips-nav-bar__button {
    padding-right: 15px;
  }
  .hips-icon {
    position: relative;
    display: inline-block;
    font: normal normal normal 14px/1 "hips-icon";
    font-size: inherit;
    text-rendering: auto;
  }
  .hips-nav-bar__buttons .hips-nav-bar__button--have-icon > .hips-icon {
    vertical-align: -1.58px;
    width: 18px;
  }
</style>