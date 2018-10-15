<template>
  <div class="box">
    <input type="text" v-model="i">
    <button @click="bbb">按钮</button>
    <demo ref="selectTime" :list='d' @action='aaa'></demo>
  </div>
</template>

<script>
/* eslint-disable no-template-curly-in-string */
import Cell from '@/components/commonCom/cell'
import FormCom from '@/components/commonCom/formCom'
// import demo from '@/modules/select-time/select-time'
import confirmBoxCom from '@/modules/message-box/confirmBox2'
import demo from './demo'
export default {
  components: {
    demo,
    Cell,
    FormCom,
    confirmBoxCom
    // listSelect,
    // dragExchange,
  },
  data () {
    return {
      i: 0,
      show: false,
      dateSelA: '',
      dateSelB: '',

      time: '',
      list: [],
      list2: {
        a: {
          b: {
            c: []
          }
        }
      }
    }
  },
  computed: {
    d () {
      return this.list2.a.b.c
    }
  },
  beforeCreate () {
    // console.log('beforeCreate baoxiu')
  },
  created () {
    for (let i = 0; i < 10; i++) {
      this.list.push(this.getList(i))
    }
    // console.log('this.list', this.list)
    // setTimeout(() => {
    //   this.list = Object.assign({}, this.list)
    // }, 1000)
  },
  beforeMount () {
    // console.log('beforeMount baoxiu')
  },
  mounted () {
    // this.d = '789'
    // console.log('mounted baoxiu')
  },
  watch: {
    list2 () {
      console.log('watch')
    }
  },
  methods: {
    aaa (item, i) {
      item.isSelect = !item.isSelect
    },
    bbb () {
      this.list2.a.b.c = this.getList()
    },
    getList (a) {
      let list = []
      for (let i = 0; i < 10; i++) {
        list.push({
          content: a + '' + i,
          isSelect: false
        })
      }
      return list
    }
  }
}
</script>

<style scoped lang='scss'>
button {
  min-width: 30px;
  height: 20px;
}
.aaa {
  // transform: scale(0.1);
  width: 100px;
  height: 100px;
  background: #ccc;
}
.box {
  overflow: hidden;
  margin: 10%;
  height: 300px;
  border: 1PX solid #ccc;
}

// .v-enter {
//   // background: #f00;
//   transition: all 3s;
//   font-size: 100px;
// }
// .v-enter-active {
//   // background: #0f0;
//   transition: all 3s;
//   font-size: 50px;
// }
// .v-enter-to {
//   // background: #00f;
//   // font-size: 14px;
// }

// .v-leave {
//   // background: #f00;
//   font-size: 100px;
// }
// .v-leave-active {
//   // background: #0f0;
//   transition: all 3s;
//   font-size: 50px;
// }
// .v-leave-to {
//   // background: #00f;
//   font-size: 14px;
// }
</style>
