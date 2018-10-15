<template>
  <div class="box">
    <ul class="list cf" ref="list">
      <li class="item" v-for="(item, i) in 9" :key="i" ref="item" :style="{transform: `translate(${i%3*100}px,${parseInt(i/3)*100}px)`}">
        <div class="icon">{{i}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */
import Drag from "@/modules/module-test/down-pull/drag.js"
export default {
  // components: { MemberSelect },
  data() {
    return {
      vmArr: [],
      elSiteData: [],
      currIndex: 0,
      currEL: null,
      currElSite: {},
      list: [
        {
          a: 1
        }
      ]
    };
  },
  mounted() {
    let { onStart, onMove, onEnd } = this;
    this.vmArr = this.$refs.item.map((item, i) => {
      let dargVm = new Drag({
        el: item,
        enable: true,
        onStart,
        onMove,
        onEnd
      });
      dargVm.init();
      dargVm.elSite = {
        x: (i % 3) * 100,
        y: parseInt(i / 3) * 100
      };
      this.elSiteData.push({
        x: (i % 3) * 100,
        y: parseInt(i / 3) * 100
      });
      return dargVm;
    });
    // new Drag ({
    //     el: this.$refs.list,
    //     enable: true
    //   })
  },
  watch: {
    list: {
      deep: true,
      handler: function() {
        console.log("list 改变");
      }
    }
  },
  methods: {
    onStart(e, that) {
      that.el.style["z-index"] = "2";
      this.currElSite = {
        x: that.elSite.x,
        y: that.elSite.y
      }
      this.currEL = that.el
    },
    onMove(e, that) {},
    onEnd(e, that) {
      that.el.style["z-index"] = "0";
      this.elSiteData.forEach((item, i) => {
        if (
          that.touchMoveSite.x > item.x &&
          that.touchMoveSite.x < item.x + 100 &&
          that.touchMoveSite.y > item.y &&
          that.touchMoveSite.y < item.y + 100
        ) {
          this.currIndex = i;
          that.scrollTo(item, 300);
        }
      })
      let item = this.elSiteData[this.currIndex]
      this.vmArr.forEach(vm => {
        if (vm.elSite.x === item.x && vm.elSite.y === item.y ) {
          if (vm.el === this.currEL) return
          vm.scrollTo(this.currElSite, 300)
        }
      })
    }
  }
};
</script>

<style lang='scss' scoped>
.box {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.list {
  position: relative;
}
.item {
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
  // float: left;
  width: 100px;
  height: 100px;
  border: 2px solid #ccc;
  padding: 5px;
  .icon {
    background: #ccc;
    height: 100%;
    font-size: 56px;
    text-align: center;
    line-height: 90px;
  }
}
</style>
