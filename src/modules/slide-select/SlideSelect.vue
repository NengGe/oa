<template>
  <div>
    <VMask v-show="show" @click="close"></VMask>
    <transition name="up">
    <div v-if="show" class="slide-select">
      <div class="s-bar">
        <a class="cl-btn" @click="close">取消</a>
        <a class="cfm-btn" @click="confirm">确认</a>
      </div>
      <div v-if="titles" class="s-tit">
        <div class="s-t" v-for="tit in titles">{{tit}}</div>
      </div>
      <div class="s-main">
        <ListBase v-for="(list,i) of lists" :key="i" :list="list" :id="i" @change="onChange"></ListBase>
      </div>
    </div>
    </transition>
  </div>

</template>

<script>
  import ListBase from './ListBase.vue'
  import VMask from '../mask/VMask.vue'
  export default {
    name: 'slide-select',
    props: ['show', 'titles', 'lists'],
    // data () {
    //   return {
    //     show: 1,
    //     titles: ['开始时间', '结束时间'],
    //     lists: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]],
    //     selectedIndexs: [0, 0] // 当前选择，通过重新赋值控制子组件选择
    //   }
    // },
    components: {
      ListBase,
      VMask
    },
    methods: {
      onChange (index, id) {
        this.lists[id].i = index
        this.$emit('change', index, id)
      },
      confirm () {
        this.$emit('confirm', (isSuccess) => {
          if (isSuccess) {
            this.close()
          }
        })
      },
      close () {
        this.$emit('close')
      }
    }
  }
</script>

<style scoped>
  .slide-select{
    background-color: #eee;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;

    .s-bar{
      height: 40PX;
      border-bottom: 1PX solid #ccc;

      a{
        text-align: center;
        line-height: 40PX;
        font-size: 16PX;
        color: #26a2ff;
        float: left;
        width: 50%;
      }
    }

    .s-tit{
      display: flex;
      text-align: center;
      .s-t{
        flex: 1;
        font-size: 14PX;
        line-height: 28PX;
        height: 28PX;
      }
    }

    .s-main{
      display: flex;
      height:200PX;
      width: 100%;
    }

  }
  .up-enter-active, .up-leave-active {
    transition: .2s;
    transition-property:transform;

  }
  .up-enter, .up-leave-to {
    transform: translate3d(0, 99%, 0);
  }



</style>
