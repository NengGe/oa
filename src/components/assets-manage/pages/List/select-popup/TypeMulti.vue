<template>
  <div class="type">
    <ul class="menuCls" v-click="onSelectNav">
      <li class="menuCls-item" :class="{active:!historyCount}">
        <p>全部</p>
        <i class="iconfont-assets" v-show="historyCount">&#xe60d;</i>
      </li>
      <li class="menuCls-item" v-for="(d,i) of history" :class="{active:historyCount-1===i}" :data-index="i">
        <p>{{d.name}}</p>
        <i class="iconfont-assets" v-show="historyCount-1!==i">&#xe60d;</i>
      </li>
    </ul>
    <div class="assetCon" v-click="onSelect">
      <transition :name="transitionName"
                  :enter-active-class="'slide-active'"
                  :leave-active-class="'slide-active'">
      <div v-show="currShow" class="asset-cont-box">
          <ul>
            <li class="assetCon-item" :class="{active:!firstList.selectedId}">全部</li>
            <li class="assetCon-item" v-for="(d,i) of firstList.children" :data-index="i" :key="d.id" :class="{active:firstList.selectedId===d.id}"><p>{{d.name}}</p></li>
          </ul>
      </div>
      </transition>
      <transition :name="transitionName"
                  :enter-active-class="'slide-active'"
                  :leave-active-class="'slide-active'">
      <div v-show="!currShow" class="asset-cont-box">
          <ul>
            <li class="assetCon-item" :class="{active:!lastList.selectedId}">全部</li>
            <li class="assetCon-item" v-for="(d,i) of lastList.children" :data-index="i" :key="d.id" :class="{active:lastList.selectedId===d.id}"><p>{{d.name}}{{d.selected}}</p></li>
          </ul>
      </div>
      </transition>
    </div>

  </div>
</template>

<script>
  import scopeElements from '@/modules/corejs/dom/scope-elements-plus'
  export default {
    name: 'asset-type-select-multi',
    props: ['rootData'],
    data () {
      return {
        root: {}, // 根数据
        selectedRootId: -1,
        selectedId: 0,
        history: [], // 记录选中项

        // 动画需要，存放当前展示的数据
        firstList: {},
        lastList: {},
        currShow: 0, // 当前显示项

        transitionName: 'tslide-left'
      }
    },
    created () {
      if (this.rootData) {
        this.initSetRootData(this.rootData)
        // this.lastList = this.rootData.type_fixed
      }
    },
    computed: {
      historyCount () {
        return this.history.length
      }
    },
    watch: {
      selectedId (id) {
        this.$emit('change', 0, id, this.selectedRootId)
      },
      selectedRootId (id) {
        this.$emit('change', 0, this.selectedId, id)
      },
      rootData (d) {
        this.initSetRootData(d)
      }
    },
    methods: {
      onSelectNav (e, vnode) {
        scopeElements(e.target, vnode.elm, {
          'LI': elem => {
            if (elem.classList.contains('active')) return
            let index = elem.dataset.index

            let curr

            if (index === undefined) { // 选择全部
              this.history.splice(0)
              curr = this.root
            } else {
              this.history.splice(index * 1 + 1)
              curr = this.history[this.historyCount - 1]
            }
            this.$set(curr, 'selectedId', null)
            this.recordSelected(curr)

            let currShow = this.currShow = !this.currShow
            if (currShow) {
              this.firstList = curr
            } else {
              this.lastList = curr
            }
            this.transitionName = 'tslide-right'
          }
        })
      },
      recordSelected (selectedData) {
        if (selectedData.root === 0) {
          this.selectedId = this.selectedRootId = -1
        } else if (selectedData.root === 1) {
          this.selectedRootId = selectedData.id
          this.selectedId = -1
        } else {
          this.selectedId = selectedData.id
        }
      },
      onSelect (e, vnode) {
        scopeElements(e.target, vnode.elm, {
          'LI': elem => {
            let index = elem.dataset.index
            let preShow = this.currShow
            let parent = preShow ? this.firstList : this.lastList
            if (index === undefined) {
              this.$set(parent, 'selectedId', null)
              this.recordSelected(parent)
              return
            }
            let curr = parent.children[index]
            this.$set(parent, 'selectedId', curr.id)
            this.$set(curr, 'selectedId', null)
            this.recordSelected(curr)
            let child = curr.children
            if (child.length) {
              let currShow = this.currShow = !preShow
              if (currShow) {
                this.firstList = curr
              } else {
                this.lastList = curr
              }
              this.history.push(curr)
              this.transitionName = 'tslide-left'
            }
          }
        })
      },
      initSetRootData (d) {
        /* eslint-disable camelcase */
        let {type_fixed, type_consumables, type_low} = d
        type_fixed.name = '固定资产'
        type_fixed.id = 1
        type_fixed.root = 1
        type_consumables.name = '易耗品'
        type_consumables.id = 2
        type_consumables.root = 1
        type_low.name = '低值资产'
        type_low.id = 3
        type_low.root = 1
        this.root = this.lastList = {
          id: -1,
          root: 0,
          children: [type_fixed, type_consumables, type_low]
        }
      }
    }
  }
</script>

<style scoped>
  .slide-active{
    transition: 0.3s ease;
    transition-property:transform;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    bottom: 0;
  }
  .tslide-left-enter, .tslide-right-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .tslide-left-leave-to, .tslide-right-enter {
    transform: translate3d(-100%, 0, 0);
  }

  .type {
    overflow: hidden;
    clear: both;
    padding: 0 10px;
    .menuCls {
      padding: 20px 12px 20px 10px;
      border-right: 1PX solid #85b2dc;
      float: left;
      height: 266px;
      overflow: auto;
      .menuCls-item {
        margin-bottom: 6px;
        text-align: center;
        color: #85b2dc;
        p {
          /*max-width: 150px;*/
          padding: 7px;
          border: 1PX solid #85b2dc;
          border-radius: 10px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          width: 70px;
        }
        i {
          color: #d0d0d0;
        }

        &.active {
          p {
            color: #fff;
            background-color: #4987c4;
            border-color: #4987c4;
          }
          i {
            color: #4987c4;
          }
        }
      }
    }
    .assetCon {
      margin: 15px 0 0 108px;
      height: 291px;
      overflow: hidden;
      position: relative;
      .asset-cont-box{
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: auto;
        ul{
          margin: 0 10px;
        }
      }
      .assetCon-item {
        padding: 15px 0;
        text-align: center;
        color: #9a9a9a;
        border-bottom: 1PX solid #ddd;
        &.active {
          color: #85b2dc;
        }
      }
      .assetCon-item:last-child {
        border-bottom: none;
      }
    }
  }
</style>
