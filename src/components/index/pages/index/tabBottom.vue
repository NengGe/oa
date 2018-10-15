<template>
  <div class="tab-bottom">
    <ul class="list">
      <li v-click="()=>listAction(item, i)" class="item iconfont" :class="{'active': currIndex===i, 'isWeixin': true}" v-for="(item,i) in tabList" :key="i">
        <div class="icon" v-html="item.icon"></div>
      </li>
    </ul>
    <div class="add-box" :class="{'active': isShowMore}">
      <div class="icon-box" v-click="addAction">
        <div class="icon iconfont">&#xe61a;</div>
      </div>
    </div>
    <!-- 更多 -->
    <More :show="isShowMore"></More>
  </div>
</template>

<script>
// import '@/components/index/static/css/animate.min.css'
import More from './More'
export default {
  components: {
    More
  },
  props: {
    isWeixin: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      isShowMore: false,
      tabList: [
        { icon: '&#xe6bd;', com: 'index', isNative: false },
        { icon: '&#xe68b;', com: 'message', isNative: true },
        { icon: '&#xe61a;', com: '', isNative: false },
        { icon: '&#xe647;', com: 'contacts', isNative: true },
        { icon: '&#xe60d;', com: 'personal', isNative: false }
      ],
      currIndex: 0
    }
  },
  methods: {
    addAction () {
      this.isShowMore = !this.isShowMore
    },
    listAction (item, i) {
      if (item.isNative) { // 原生界面
        window.oa.goNativeInterface(item.com)
      } else { // H5界面
        this.$router.replace({ name: item.com })
        this.currIndex = i
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-bottom {
  z-index: 1;
  box-shadow: 0px 3px 25px 0px rgba(0, 24, 47, 0.15);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50px;
  background-color: #fff;
}
.list {
  display: flex;
  justify-content: space-around;
  height: 50px;
  align-items: center;
}
.item {
  font-size: 22px;
  color: #dce7f6;
  &.active {
    color: #4ea8f4;
  }
  .icon {
    width: 30px;
    text-align: center;
    font-size: 24px;
  }
}
.item:nth-child(3) {
  width: 60px;
}
.isWeixin.item:nth-child(2),
.isWeixin.item:nth-child(4) {
  display: none;
}
.isWeixin.item:nth-child(3) {
  margin: 0 -60px;
}
.add-box {
  z-index: 10;
  position: absolute;
  left: 50%;
  top: 11px;
  width: 62px;
  height: 62px;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 50%;
  background: linear-gradient(
    to bottom,
    transparent 20px,
    transparent 20px,
    #e7e9eb 20px
  );
}
.icon-box {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background: #fff;
  transform: translateY(8px);
  .icon {
    position: relative;
    background-color: #add6f9;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    color: #fff;
    font-size: 32px;
    transition: transform 0.3s;
    box-sizing: border-box;
  }
}
.add-box.active {
  background: #fff;
  .icon {
    background-color: transparent;
    transform: rotate(135deg);
    border: 1PX solid #ccc;
    color: #ccc;
  }
}
</style>
