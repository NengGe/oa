<template>
   <div class="box">
    <div class="row" v-for="(arr, i) in data" :key="'data'+i">
      <oa-iconBtn :contentStyle="contentStyle" :attr="attr" :item="item" v-for="(item, j) in arr" :key="'arr'+i+j" @action="$emit('action', item)">
        <!-- <slot class="rightTop"></slot> -->
      </oa-iconBtn>
    </div>
  </div>
</template>

<script>
export default {
  // render () {
  //   let { contentStyle, attr, $slots } = this
  //   // console.log($slots.default)
  //   const list = []
  //   this.data.forEach((arr, i) => {
  //     const items = []

  //     arr.forEach((item, j) => {
  //       items.push(
  //         <oa-iconBtn contentStyle={contentStyle} attr={attr} item={item} key={'arr' + i + j} onAction={e => { this.onAction(e, item) }}>
  //           {$slots.default}
  //         </oa-iconBtn>
  //       )
  //     })

  //     list.push(
  //       <div class="row" key={'data' + i}>{items}</div>
  //     )
  //   })
  //   return (
  //     <div class="box">{list}</div>
  //   )
  // },
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
    }
  },
  methods: {
    onAction (e, item) {
      // console.log(e)
      this.$emit('action', item)
    }
  }
}
</script>

<style scoped>
.box {
}
.row {
  display: flex;
  justify-content: space-around;
  padding-top: 21px;
}
</style>

