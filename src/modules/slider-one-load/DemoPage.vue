<template>
  <div class="slider-one-load">
    <ul class="sl-move">
      <li class="sl-item" v-for="d of items">
        <div class="sl-cont">
          <div class="ques-test">{{d.content}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  /* eslint-disable */
  import './slider-one-load.css'
  import Slider from './slider-one-load'
  export default {
    name: 'slider-one-load',
    data () {
      return {
        totalPage: 5,
        items: [{
          page: 0,
          content: ''
        }, {
          page: 1,
          content: ''
        }, {
          page: 2,
          content: ''
        }]
      }
    },
    mounted () {
      let totalPage = this.totalPage
      let slider = new Slider({
        eDrag: this.$el,
        boxW: this.$el.clientWidth,
        totalPage
      })

      let {items} = this
      slider.onChange = function () {
        let d = this.sliderPositionData.data
        let {pageIndex} = this
        d.forEach(({item: itemIndex}, i) => {
          let page = pageIndex + i - 1
          let item = items[itemIndex]
          items.page = page
          if (page > -1 && page < totalPage) {
            item.content = page
          } else {
            item.content = '空白页'
          }
        })
      }

      // 渲染当前页数据
      slider.onChange()
    },
    methods: {

    }
  }
</script>
