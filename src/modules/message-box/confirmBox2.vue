<template>
  <transition name='zoom'>
    <div v-show="show">
      <div class="mask-box"></div>
      <div class="warn-box">
        <!-- <div class="title">{{title}}</div> -->
        <div class="content">{{content}}</div>
        <div class="btn-box top-one-px">
          <div class="btn confirm" @click="()=>{$emit('cancelAction');$emit('updata:show', false)}">{{cancelButtonText}}</div>
          <div class="btn" @click="()=>{$emit('confirmAction');$emit('updata:show', false)}">{{confirmButtonText}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '提示'
    },
    content: {
      type: String,
      default: '确定执行?'
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
// .zoom-enter, .zoom-leave-to {
//   opacity: 0;
//   transform: scale(0.8);
// }
// .zoom-leave-to, .zoom-enter {
//   opacity: 0;
//   transform: scale(1.2);
// }
.mask-box {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #333;
  opacity: 0.3;
  z-index: 10;
}
.warn-box {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  // border: 1PX #000 solid;
  border-radius: 5px;
  text-align: center;
  background-color: #fff;
  z-index: 11;
  .title {
    line-height: 36px;
    font-size: 20px;
    font-weight: bold;
  }
  .content {
    line-height: 24px;
    font-size: 16px;
    padding: 20px 15px;
  }
  .btn-box {
    display: flex;
    // border-top: 0.5px #efefef solid;
    .btn {
      flex: 1;
      line-height: 34px;
      border-left: 1PX solid #efefef;
      color: #88b8f8;
      font-weight: bold;
    }
    .confirm {
      border-left: 0;
    }
  }
}
</style>
