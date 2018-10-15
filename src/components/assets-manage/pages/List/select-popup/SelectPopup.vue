<template>
  <div>
    <VMask v-show="show" @click="()=>$emit('update:show',0)"></VMask>
    <transition :name="'pop-zoom'"
                :enter-active-class="'transition-active'"
                :leave-active-class="'transition-active'">
    <div class="pop" v-show="show">
      <div class="inner-pop">
        <keep-alive>
        <components :is="['TypeMulti', 'StateSelect', 'DeptSelect'][type]" @change="onChange" :rootData="rootData" :show="show"></components>
        </keep-alive>
        <a class="confirm" @click="confirm">确认</a>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
  import VMask from '@/modules/mask/VMask'
  import TypeMulti from './TypeMulti'
  import StateSelect from './StateSelect'
  import DeptSelect from './DeptSelect2'
  export default {
    name: 'select-popup',
    // props: ['show', 'type'],
    props: {
      show: {},
      type: Number
    },
    data () {
      return {
        rootData: null,
        selected: {
          0: 0,
          1: -1,
          2: -1
        },
        selectedRoot: -1
      }
    },
    methods: {
      onChange (type, id, rootId) {
        this.selected[type] = id
        if (type === 0) {
          this.selectedRoot = rootId
        }
      },
      confirm () {
        this.$emit('update:show', 0)
        /* eslint-disable camelcase */
        let {0: asset_type_id, 1: status_id, 2: dep_id} = this.selected
        console.log(this.selected)
        let params = {
          type_id: this.selectedRoot,
          asset_type_id,
          status_id,
          dep_id
        }
        this.$emit('confirm', params)
      },
      loadDataOne () {
        this.loadDataOne = null
        this.$preloaderFull.show()
        this.$axios.get('/mobicampus/assets/v1/gettypelist').then(({data}) => {
          if (data.status === 200) {
            this.rootData = data.result.data
          } else {
            return Promise.reject(new Error(data.message))
          }
        }).catch(e => {
          this.$simpleMsg(e)
        }).then(() => {
          this.$preloaderFull.close()
        })
      }
    },
    watch: {
      show (v) {
        if (v) {
          if (this.loadDataOne && (this.type !== 2)) {
            this.loadDataOne()
          }
        }
      }
    },
    components: {
      VMask,
      TypeMulti,
      StateSelect,
      DeptSelect
    }
  }
</script>

<style scoped>
  .pop {
    position: absolute;
    top: 91px;
    left: 50%;
    max-height: 500px;
    width: 96%;
    transform: translateX(-50%);
    background-color: #fff;
    border-radius: 10px;
    z-index: 10;
    .inner-pop {
      /*padding: 0 10px;*/
      .confirm {
        display: block;
        /*width: 100%;*/
        border-radius: 10px;
        background-color: #fff;
        color: #85b2dc;
        padding: 14px 0;
        text-align: center;
        border: 1PX solid #85b2dc;
        outline: none;
        margin: 20px 10px;
      }
    }
  }
  .pop-zoom-enter, .pop-zoom-leave-to {
    opacity: 0;
    transform:translateX(-50%) scale(0.9, 0.9);
  }
</style>
