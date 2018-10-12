<template>
  <div class="index" id="index">
    <i-row>
      <i-col span="24" i-class="col-class">
        <a href="../login/main"><img class="topBanner" src="./img/badminton.png"></a>
      </i-col>
    </i-row>
    <i-row>
      <i-col span="24" i-class="col-class">
        <i-divider content="健身运动" size="16"></i-divider>
      </i-col>
    </i-row>
    <i-row>
      <i-col span="8" i-class="col-class">
        <a href="../login/main"><img class="themeActive" src="./img/ride.png"></a>
      </i-col>
      <i-col span="8" i-class="col-class">
        <a href="../login/main"><img class="themeActive" src="./img/run.png"></a>
      </i-col>
      <i-col span="8" i-class="col-class">
        <a href="../login/main"><img class="themeActive" src="./img/swim.png"></a>
      </i-col>
    </i-row>
    <i-row>
      <i-col span="24" i-class="col-class">
        <i-divider content="团体活动" size="16"></i-divider>
      </i-col>
    </i-row>
    <i-row>
      <i-col span="24" i-class="col-class">
        <a href="../login/main"><img class="tbuild" src="./img/ktv.png"></a>
      </i-col>
    </i-row>
    <i-row>
      <i-col span="24" i-class="col-class">
        <a href="../login/main"><img class="tbuild" src="./img/party.png"></a>
      </i-col>
    </i-row>
    <i-tabs :current="current" @change="menuTab" i-class="menuTabs" fixed>
      <a href="../login/main"><i-tab key="tab1" title="创建"></i-tab></a>
      <a href="../login/main"><i-tab key="tab2" title="商城"></i-tab></a>
      <a href="../login/main"><i-tab key="tab3" title="已报"></i-tab></a>
      <a href="../login/main"><i-tab key="tab4" title="我的"></i-tab></a>
    </i-tabs>
  </div>
</template>

<script>

export default {
  name:'index',

  data () {
    return {
      imgurl:'https://file11info.ppdai.com/916ddf1383ac4e6cb6419b5e9a0b050d.jpg?imageView2/1/w/450/h/200',
      current: 'tab1',
    }
  },

  created () {
  },
  methods: {
    menuTab (detail) {
      this.current = detail.mp.detail.key
    }
  },
  mounted(){
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import './index.scss'
</style>
