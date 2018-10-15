<template>
  <div class="box cf">
    <div class="item-box" ref="item" v-for="(item, i) in data" :key="'data'+i">
      <oa-iconBtn ref="iconBtn" :contentStyle="contentStyle||contentStyleDef" :attr="attr" :item="item" @action="$emit('action', item, i)">
        <div class="rightTop iconfont add" v-if="$attrs.hasOwnProperty('add')" v-show="needHeadIcon">&#xe61a;</div>
        <!-- <div class="rightTop iconfont del" v-if="$attrs.hasOwnProperty('del')" v-show="needHeadIcon" @click.stop="$emit('del',item, i)">&#xe645;</div> -->
      </oa-iconBtn>
    </div>
  </div>
</template>

<script>
import Drag from '@/modules/corejs/drag/drag-init.js'
export default {
  props: {
    data: {
      type: Array
    },
    attr: {
      type: String,
      default: 'content'
    },
    contentStyle: {
      type: Object
    },
    needHeadIcon: {
      type: Boolean,
      default: false
    },
    enableDrag: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    needHeadIcon (newV) {
      if (newV) {
        // this.dragBind()
        // this.initElSite()
      }
    }
  },
  data () {
    return {
      gridSiteArr: null, // 网格位置
      dragArr: null,
      currDrag: null,
      lastDrag: null,
      index: '',
      contentStyleDef: {
        color: '#666',
        fontWeight: 'bold'
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      // this.gridSiteArr = this.getElSite()
    })
  },
  methods: {
    onAction (item) {
      this.$emit('action', item)
    },
    getElSite () {
      return this.$refs.iconBtn.map(el => {
        return el.getElSite()
      })
    },
    initElSite () {
      this.dragArr.map((drag, i) => {
        drag.el.i = i
        drag.scrollTo(this.gridSiteArr[i], 0)
      })
    },
    dragBind () {
      let { onStart, onMove, onEnd } = this
      this.dragArr = this.$refs.iconBtn.map((item, i) => {
        let dargVm = new Drag({
          el: item.$el,
          enable: true,
          onStart,
          onMove,
          onEnd
        })
        dargVm.init()
        return dargVm
      })
    },
    testCrash (currDrag) {
      let elSize = {
        x: currDrag.el.offsetWidth,
        y: currDrag.el.offsetHeight
      }
      let center = {
        x: elSize.x / 2 + currDrag.elSite.x,
        y: elSize.y / 2 + currDrag.elSite.y
      }
      return this.gridSiteArr.findIndex(elSite => {
        return (center.x > elSite.x &&
          center.x < elSite.x + elSize.x &&
          center.y > elSite.y &&
          center.y < elSite.y + elSize.y)
      })
    },
    onStart (e, that) {
      that.el.style['z-index'] = 1
    },
    onMove (e, that) {
      this.index = this.testCrash(that)
      let i = this.index
      console.log(i)
      let dragIsExchanged = this.dragArr.find(drag => {
        return drag.el.i === i
      })
      if (this.lastDrag && this.lastDrag.el.i !== i) {
        this.lastDrag.scrollTo(this.gridSiteArr[this.lastDrag.el.i], 300)
        this.lastDrag = null
      }
      if (i !== -1) { // 进入模板区域
        if (i !== that.el.i) { // 不是当前元素本身区域
          dragIsExchanged.scrollTo(this.gridSiteArr[that.el.i], 300)
          this.lastDrag = dragIsExchanged
        }
      }
      // if (dragIsExchanged === undefined) { // 没进入模板区域
      //   console.log('if')
      //   // this.lastDrag && this.lastDrag.scrollTo(this.gridSiteArr[this.lastDrag.el.i], 300)
      // } else { // 进入模板区域
      //   console.log('else')
      //   if (this.lastDrag !== dragIsExchanged) {
      //     dragIsExchanged.scrollTo(this.gridSiteArr[that.el.i], 300)
      //     // console.log(this.gridSiteArr[that.el.i], dragIsExchanged.elSite)
      //   }
      //   this.lastDrag = dragIsExchanged
      // }
    },
    onEnd (e, that) {
      that.el.style['z-index'] = 0
      if (this.index >= 0 && that.el.i !== this.index) {
        let i = that.el.i
        that.el.i = this.lastDrag.el.i
        this.lastDrag.el.i = i
        that.scrollTo(this.gridSiteArr[this.index], 300)
      } else {
        that.scrollTo(that.elSitetouchStart, 300)
      }
      console.log(this.dragArr)
    }
  }
}
</script>

<style scoped>
.box {
}
.item-box {
  width: 25%;
  float: left;
  justify-content: space-around;
  padding-top: 21px;
}
.add.rightTop {
  border: 1PX solid #fff;
  color: #fff;
  background: #00aeff;
  right: -5px;
  top: -5px;
  line-height: 22px;
}
.del.rightTop {
  border: 1PX solid #fff;
  color: #fff;
  background: #ff3a4d;
  right: -5px;
  top: -5px;
  line-height: 23px;
}
</style>

