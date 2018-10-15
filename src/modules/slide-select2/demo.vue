<template>
  <div>
    <button @click="show">弹出</button>
    <SlideSelect ref="vSlideSelect" />
  </div>
</template>

<script>
import SlideSelect from './SlideSelect'
export default {
  components: {
    SlideSelect
  },
  mounted () {
    // this.show()
  },
  methods: {
    show () {
      let list = []
      for (let i = 0; i < 10; i++) {
        list.push({
          text: 'v1-' + i,
          value: i
        })
      }
      let list2 = []
      for (let i = 0; i < 10; i++) {
        list2.push({
          text: 'v2-' + i,
          value: i
        })
      }

      this.$refs.vSlideSelect.show({
        titles: ['列表1', '列表2'],
        lists: [list, list2],
        // selectedIndexs: [0, 0], // 当前选择，通过重新赋值控制子组件选择
        selectedValues: [2], // 当前选择
        onConfirm (selectedValues) {
          console.log(selectedValues)
          return false // 可阻止关闭
        }
      })
    }
  }
}
</script>

