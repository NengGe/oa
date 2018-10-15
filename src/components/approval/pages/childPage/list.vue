<template>
  <ul class="list">
    <li class="item clickActive" v-for="(item, i) in data" :key="item.id" @click="$emit('action', item, i)" :class="{hide:item.hide}">
      <transition name='fade'>
        <div class="content bottom-one-px" v-if="!item.hide">
          <div class="title-box">
            <span class="title ep">{{'标题'+i}}</span>
            <!-- <span class="status clickActive" v-if="item.is_overdue">已逾期</span> -->
          </div>
          <div class="row ep">
            <span class="l">外出时间：</span>
            <span class="r">{{item.time}}</span>
          </div>
          <div class="row ep">
            <span class="l">外出人员：</span>
            <span class="r">{{item.person}}</span>
          </div>
          <div class="row ep">
            <span class="l">外出地点：</span>
            <span class="r">{{item.des}}</span>
          </div>
        </div>
      </transition>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    data: Array
  },
  data () {
    return {
      showBg: false
      // list: []
    }
  },
  created () {
    // for (var i = 0; i < 10; i++) {
    //   this.list[i] = {
    //     time: '10:' + i,
    //     person: '张三三' + i,
    //     des: '深圳' + i
    //   }
    // }
  }
}
</script>

<style lang='scss' scoped>
.fade-leave-active {
  transition: all 3s ease;
  font-size: 17px;
  opacity: 1;
}

.fade-leave {
  // opacity: 0;
  font-size: 100px;
}
.v-enter {
}
.v-enter-active {
}
.v-enter-to {
}

.v-leave {
  transform: translateX(50%);
  // background: #f00;
}
.v-leave-active {
  transition: all 3s;
  transform: translateX(100%);
  background: #f00;
}
.v-leave-to {
  // background: #f00;
}

.item {
  transition: all 3s ease;
  font-size: 14px;
  // transition: all 30s;
  // background-color: #ccc;
  padding: 15px 12px 0 14px;
}
.content {
  padding-bottom: 15px;
}
.title-box {
  .title {
    max-width: 250px;
    display: inline-block;
    vertical-align: middle;
    line-height: 28px;
    // font-size: 18px;
    color: #555;
    font-weight: bold;
  }
  .icon-message {
    font-size: 15px;
    color: #f8b788;
  }
  .status {
    width: 60px;
    height: 20px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: bold;
    color: #fd939b;
    border: 1PX solid #fd939b;
    text-align: center;
    vertical-align: middle;
    line-height: 20px;
    float: right;
  }
}
.row {
  font-size: 13px;
  color: #999;
  line-height: 28px;
  .time {
    float: right;
  }
}
.hide {
  // background: #555;
}
</style>
