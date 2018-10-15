<template>
  <div>
    <div class="mask-box"></div>
    <div class="warn-box">
      <div class="title">
        <span class="icon iconfont-leaveSchool">&#xe621;</span>
        <span class="text">{{title}}</span>
      </div>
      <div class="content">{{content}}</div>
      <div class="btn-box">
        <div class="btn cancelmBtn" @click="()=>$emit('cancelAction')">{{cancelButtonText}}</div>
        <div class="btn confirmBtn" @click="()=>$emit('confirmAction')">{{confirmButtonText}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '正在放学'
    },
    content: {
      type: String,
      default: ''
    },
    confirmButtonText: {
      type: String,
      default: '确定'
    },
    cancelButtonText: {
      type: String,
      default: '取消'
    }
  }
}
</script>

<style lang='scss' scoped>
.mask-box{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #333;
    opacity: 0.3;
    z-index: 10;
  }
  .warn-box{
    padding-top: 50px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width:73%;
    border-radius: 10px;
    text-align: center;
    background-color: #f75f5e;
    z-index: 11;
    .title{
      line-height: 40px;
      font-size: 37px;
      font-weight: bold;
      color: #fefefe;
      .icon{
        font-size: 37px;
      }
    }
    .content{
      height: 190px;
      line-height: 30px;
      font-size: 18px;
    }
    .btn-box{
      border-top: 1PX solid #f9797a;
      padding: 16px 0;
      display: flex;
      color: #fefefe;
      .btn{
        flex: 1;
        line-height: 41px;
        font-weight: bold;
      }
      .cancelmBtn{
        border-right: 1PX solid #f9797a;
      }
    }
  }
</style>
