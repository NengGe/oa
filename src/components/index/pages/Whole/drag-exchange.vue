<template>
  <div class="box cf" :class="{active: data.length>4}">
    <div class="item-box" :class="{position:position}" ref="item" v-for="(item, i) in data" :data-index="i" :key="item.id">
      <oa-iconBtn ref="iconBtn" :contentStyle="contentStyle||contentStyleDef" :attr="attr" :item="item" @action="$emit('action', item, i)">
        <!-- <div class="rightTop iconfont add" v-if="$attrs.hasOwnProperty('add')" v-show="needHeadIcon" @click.stop="$emit('add',item, i)">&#xe61a;</div> -->
        <div class="rightTop iconfont del" v-if="$attrs.hasOwnProperty('del')" v-show="needHeadIcon" @click.stop="delAction(item, i)">&#xe645;</div>
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
  data () {
    return {
      gridSize: null,
      gridSiteArr: [], // 网格位置
      dragArr: [],
      currDrag: null,
      lastDrag: null,
      index: '',
      contentStyleDef: {
        color: '#666',
        fontWeight: 'bold'
      },
      position: true,
      isInitDrag: false
    }
  },
  watch: {
    needHeadIcon (newV, oldV) {
      if (this.data.length === 0) return
      if (newV) {
        this.dragSwitch(false)
      } else {
        this.dragSwitch(true)
        this.changeOrder()
      }
    },
    data (newV) {
      if (this.dragArr.length > newV.length) { // 执行了删除

      } else { // 添加 OR 初始化数据
        this.$nextTick(() => {
          for (let i = this.dragArr.length; i < newV.length; i++) {
            let drag = this.dragBind(this.$refs.item[i])
            this.initElSite(drag, this.data[i].display_order - 1)
            drag.disable = !this.needHeadIcon
          }
        })
      }
    }
  },
  created () {
    this.initGridSite()
  },
  methods: {
    changeOrder () {
      this.data.forEach((item, i) => {
        item.display_order = this.dragArr[i].order + 1
      })
    },
    delAction (item, i) {
      let delItem = this.data.splice(i, 1)[0]
      this.dragArr.splice(i, 1)
      this.toMove(delItem.display_order, 6, -1)
      this.changeOrder()
    },
    dragSwitch (bl) {
      this.dragArr && this.dragArr.forEach(drag => {
        drag.disable = bl
      })
    },
    getElSite () {
      return this.$refs.iconBtn.map(el => {
        return el.getElSite()
      })
    },
    initGridSite () {
      let w = window.innerWidth / 4 // 宽
      let h = 98 // 高
      for (let i = 0; i < 7; i++) {
        let r = parseInt(i / 4) // 行 起始值 0
        let l = i % 4 // 列 起始值 0
        let site = {
          x: w * l,
          y: h * r
        }
        this.gridSiteArr.push(site)
      }
    },
    initElSite (drag, i) {
      console.log(i)
      drag.scrollTo(this.gridSiteArr[i], 0)
      drag.order = i
    },
    dragBind (el) {
      let { onStart, onMove, onEnd } = this
      let dargVm = new Drag({
        el,
        enable: true,
        onStart,
        onMove,
        onEnd
      })
      dargVm.init()
      this.dragArr.push(dargVm)
      return dargVm
    },

    dragRemove () {
      this.dragArr.forEach(item => {
        item.remove()
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
      return this.gridSiteArr.findIndex((elSite, i) => {
        return (
          i < this.data.length &&
          center.x > elSite.x &&
          center.x < elSite.x + elSize.x &&
          center.y > elSite.y &&
          center.y < elSite.y + elSize.y)
      })
    },
    onStart (e, that) {
      if (e.target === that.el || e.target.className.indexOf('del') !== -1) return false
      e.preventDefault()
      that.el.style['z-index'] = 1
      this.index = that.order
    },
    onMove (e, that) {
      // e.preventDefault()
      let i = this.testCrash(that)
      this.index = i === -1 ? this.index : i
      if (i !== -1 && i !== that.order) { // 进入模板区域 && 不是当前元素本身区域
        if (that.order > i) { // --> 小
          this.toMove(i, that.order - 1, 1)
        } else { // --> 大
          this.toMove(that.order + 1, i, -1)
        }
        that.order = i
      }
    },
    onEnd (e, that) {
      that.el.style['z-index'] = 0
      this.changeOrder()
      if (this.index >= 0) {
        that.scrollTo(this.gridSiteArr[this.index], 300)
      } else {
        that.scrollTo(that.elSitetouchStart, 300)
      }
    },
    toMove (start, end, flag) {
      this.dragArr.forEach((drag, i) => {
        if (drag.order >= start && drag.order <= end) {
          let order = drag.order + flag
          drag.scrollTo(this.gridSiteArr[order], 300) // 移动
          drag.order = order // 记录 当前序号
        }
      })
    }
  }
}
</script>

<style scoped>
.box {
  position: relative;
  height: 120px;
  transition: height 0.3s;
}
.box.active {
  height: 240px;
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
.position {
  position: absolute;
  left: 0;
  top: 0;
}
</style>

