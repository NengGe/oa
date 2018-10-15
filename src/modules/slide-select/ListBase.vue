<template>
  <div class="s-list">
    <div ref="eSel" class="s-sel">
      <div class="s-mask s-t-mask"></div>
      <div class="s-mask s-b-mask"></div>
      <ul ref="eMove" class="s-move">
        <li v-for="(val,i) of list.d" class="s-item" :key="i">{{val}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import SlideSelectBase from './slide-select-base'
  export default {
    name: 'list-base',
    props: ['list', 'id'],
    data () {
      return {
        index: 0
      }
    },
    mounted () {
      let slideSelectBase = this.slideSelectBase = new SlideSelectBase({
        eDrag: this.$el,
        eMove: this.$refs.eMove,
        itemHeight: this.$refs.eSel.clientHeight,
        onChange: index => {
          this.$emit('change', index, this.id)
        }
      })

      let {list} = this
      slideSelectBase.update(list.d.length)
      this.index = list.i
      slideSelectBase.select(this.index)
    },
    watch: {
      list: {
        handler (d) {
          this.slideSelectBase.select(d.i)
        },
        deep: true
      },
      'list.d' (v) {
        this.slideSelectBase.update(v.length)
      }
    }

  }
</script>

<style scoped>
  .s-list{
    flex:1;
    margin: 0 5PX;
    position: relative;
    overflow: hidden;
  }

  .s-sel{
    height: 30PX;
    border-bottom: 1PX solid #407bff;
    border-top: 1PX solid #407bff;
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translateY(-50%);
  }
  .s-move{
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: center;
    font-size: 16PX;
    line-height: 1.8;
  }
  .s-item{
    height: 30PX;

  }

  .s-mask{
    position: absolute;
    height: 88PX;
    left: 0;
    right: 0;
    background-color: rgba(238, 238, 238, 0.75);
    z-index: 1;
    pointer-events:none;
  }
  .s-t-mask{
    top: 0;
    transform: translate3d(0,-100%,0);
    box-shadow: inset 0 20PX 20PX 0 #eee;
  }
  .s-b-mask{
    bottom: 0;
    transform: translate3d(0,100%,0);
    box-shadow: inset 0 -20PX 20PX 0 #eee;
  }
</style>
