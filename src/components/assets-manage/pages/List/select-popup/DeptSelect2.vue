<template>
  <div class="type">
    <ul class="menuCls" @click="onSelectNav">
      <li class="menuCls-item" v-for="(d,i) of history" :data-index="i" :class="{active:historyCount-1===i}">
        <p>{{d.name}}</p>
        <i class="iconfont-assets" v-show="historyCount-1!==i">&#xe60d;</i>
      </li>
    </ul>
    <div class="assetCon" @click="onSelect">
      <SwitchOne :switchState="showIndex" :switchType="switchType" @loadData="loadDataSwitch">
        <template slot-scope="props">
          <ul>
            <li v-for="(d,i) of props.data" class="assetCon-item" :data-index="i" :data-id="d.id" :key="d.id" :class="{active:selectedId===d.id}">{{d.name}}</li>
          </ul>
        </template>
      </SwitchOne>
    </div>
  </div>
</template>

<script>
  import SwitchOne from '@/modules/switch-one/SwitchOne2'
  import scopeElements from '@/modules/corejs/dom/scope-elements-plus'
  export default {
    name: 'state-select',
    props: ['rootData'],
    data () {
      return {
        showIndex: 0,
        switchType: 'left',

        history: [],
        selectedId: 0,
        selectedIndex: 0
      }
    },
    computed: {
      historyCount () {
        return this.history.length
      }
    },
    components: {
      SwitchOne
    },
    created () {
      this.list = [{
        id: 0,
        name: '全部'
      }]
    },
    methods: {
      onSelectNav (e, vnode) {
        scopeElements(e.target, vnode.elm, {
          'LI': elem => {
            if (elem.classList.contains('active')) return
            let index = elem.dataset.index
            let {history} = this
            this.selectedId = history[index].id
            history.splice(index * 1 + 1)

            this.selectedIndex = 0

            this.switchType = 'right'
            this.showIndex = !this.showIndex
          }
        })
      },
      onSelect (e, vnode) {
        scopeElements(e.target, vnode.elm, {
          'LI': elem => {
            if (elem.classList.contains('active')) return
            let id = elem.dataset.id
            let index = elem.dataset.index
            this.selectedId = id
            this.selectedIndex = index
            if (index === '0') return
            this.switchType = 'left'
            this.showIndex = !this.showIndex
          }
        })
      },
      loadDataSwitch (succeed) {
        this.$preloaderFull.show()
        this.loadData().then(data => {
          let num = data.length
          if (num) {
            if (this.switchType === 'left') {
              this.history.push(this.list[this.selectedIndex])
            }
            data.unshift({
              id: this.history[this.historyCount - 1].id,
              name: '全部'
            })
            this.list = data
            succeed(data)
          } else {
            succeed(false)
          }
        }).catch(e => {
          this.$simpleMsg(e)
        }).then(() => {
          this.$preloaderFull.close()
        })
      },
      loadData () {
        return this.$axios.get('/schoolorg/v1/getDeptList/' + this.selectedId).then(({data}) => {
          if (data.status === 200) {
            return data.result.data
          } else {
            return Promise.reject(new Error(data.message))
          }
        })
      }
    },
    watch: {
      selectedId (id) {
        this.$emit('change', 2, id)
      }
    }
  }
</script>

<style scoped>
  .type {
    overflow: hidden;
    clear: both;
    padding: 0 10px;
    .menuCls {
      padding: 20px 12px 20px 10px;
      border-right: 1PX solid #85b2dc;
      float: left;
      height: 266px;
      min-width: 86px;
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
      /*.asset-cont-box{
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: auto;

      }*/
      ul{
        margin: 0 10px;
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
