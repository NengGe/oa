<template>
  <div class="time-box" v-show="isShow">

    <SlideSelect  ref="vSlideSelect"></SlideSelect>
  </div>
</template>

<script>
import SlideSelect from '@/modules/slide-select2/SlideSelect'
export default {
  data () {
    return {
      isShow: false,
      dateStr: '',
      lists: [[], []]
    }
  },
  mounted () {
    this.initLists()
  },
  components: {
    SlideSelect
  },
  methods: {
    show ({initTime, onConfirm}) {
      this.isShow = true
      this.showTimeSelect(initTime, onConfirm)
    },
    close () {
      this.isShow = false
    },
    showTimeSelect (dateSel, cb) {
      // console.log('执行showTimeSelect')
      let hour, min
      if (dateSel) {
        let dateSelArr = dateSel.split(':')
        hour = dateSelArr[0]
        min = dateSelArr[1]
      } else {
        let dateO = new Date()
        hour = dateO.getHours()
        min = dateO.getMinutes()
      }
      this.$refs.vSlideSelect.show({
        titles: ['时', '分'],
        lists: this.lists,
        // selectedIndexs: [10, 0], // 当前选择，通过重新赋值控制子组件选择
        selectedValues: [parseInt(hour), parseInt(min)], // 当前选择
        onConfirm: (selectedValues) => {
          let dataList = selectedValues.getSelectedValues()
          this.dateSel = `${dataList[0].text}:${dataList[1].text}`
          cb(this.dateSel)
          this.close()
        }
      })
    },
    // 初始化时间选择器列表
    initLists () {
      for (let i = 0; i < 24; i++) {
        let obj = {
          text: i > 9 ? i : '0' + i,
          value: i
        }
        this.lists[0].push(obj)
      }
      for (let i = 0; i <= 59; i++) {
        let obj = {
          text: i > 9 ? i : '0' + i,
          value: i
        }
        this.lists[1].push(obj)
      }
    }
  }
}
</script>



