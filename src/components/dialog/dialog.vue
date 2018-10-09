<template>
  <section class="sdk_dialog" @touchmove="preventMove()">
    <div class="mask"></div>
    <div class="content">
      <div class="title">{{title}}</div>
      <div class="dialogBox"><slot name="dialogBox">这是默认的东西</slot></div>
      <div class="btn_group">
        <a href="javascript:;" class="cancel" @click="onCancel">{{cancelBtn}}</a>
        <a href="javascript:;" class="confirm" @click="onConfirm">{{confirmBtn}}</a>
      </div>
    </div>
  </section>
</template>

<script>
  
  export default {
    name: 'sdk_dialog',
    props:{
      title:{
        type:String,
        default:''
      },
      width:{
        type:String,
        default:'12rem'
      },
      height:{
        type:String,
        default:'auto'
      },
      cancelBtn:{
        type:String,
        default:'取消'
      },
      confirmBtn:{
        type:String,
        default:'确定'
      }
    },
    data(){
      return {
        
      }
    },
    created(){
      
    },
    methods:{
      preventMove(){
        // let event = e || event;
        event.preventDefault();
        event.stopPropagation();
      },
      onCancel(){
        this.$emit('onCancel')
      },
      onConfirm(){
        this.$emit('onConfirm')
      }
    },
    mounted(){
      let dialogDom = document.querySelector('.sdk_dialog .content')
      dialogDom.style.width = this.width
      dialogDom.style.height = this.height
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import './dialog.scss'
</style>
