<template>
  <div class="loginsdk" id="loginsdk">
    <section class="banner">
      <img src="//ac.ppdaicdn.com/img/mlogin/logo.png" class="logo">
    </section>
    <section style="text-align: center;" v-if="!showMobileBind">
      <button open-type="getUserInfo" type="primary" size="mini" lang="zh_CN" @getuserinfo="onGotUserInfo">用户登录注册</button>
    </section>
    <section v-if="showMobileBind">
      <input type="tel" maxlength="11" name="mobile" id="mobile" placeholder="请输入手机号码" />
      <input type="tel" maxlength="11" name="mobile" id="smscode" placeholder="请输入短信验证码" />
    </section>
  </div>
</template>

<script>
import WXBizDataCrypt from '@/utils/WXBizDataCrypt'
import QQMapWX from '@/utils/qqmap-wx-jssdk'
export default {
  name:'login01',

  data () {
    return {
      showMobileBind:false,
      appId:'wxe373c7d6881b6eea',
      secret:'97d331dd832eea74bf006de688972aba',
      code:'',
      encryptedData:'',
      iv:'',
      openid:'',
      session_key:''
    }
  },

  created () {
  },
  methods: {
    onGotUserInfo(data){
      this.encryptedData = data.mp.detail.encryptedData;
      this.iv = data.mp.detail.iv;
      this.getOpenId()
    },
    getOpenId(){
      let vm = this;
      // wx.request({
      //   url:'https://api.weixin.qq.com/sns/jscode2session?appid=wxe373c7d6881b6eea&secret=97d331dd832eea74bf006de688972aba&js_code='+vm.code+'&grant_type=authorization_code',
      //   method:'get',
      //   success:function(res){
      //     vm.openid = res.data.openid;
      //     vm.session_key = res.data.session_key;
      //     vm.getUnionId()
      //   },
      //   fail:function(error){
      //     console.log(error)
      //   }
      // })
    },
    getUnionId(){
      let vm = this;
      let wxDecode = new WXBizDataCrypt(vm.appId, vm.session_key)
      let decodeData = wxDecode.decryptData(vm.encryptedData , vm.iv)
    }
  },
  mounted(){
    let vm = this;
    // 获取登录CODE
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        vm.code = res.code;
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              vm.encryptedData = res.encryptedData;
              vm.iv = res.iv;
              vm.getOpenId()
            }
          })
        }
      }
    })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import './index.scss'
</style>
