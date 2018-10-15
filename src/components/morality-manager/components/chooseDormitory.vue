<template>
  <div class="choose-dormitory">
    <div class="choose-inner">
      <list-select attr="name" :list="buildList" @selectData="onBuildData" :currIndex="buildIndex"></list-select>
      <list-select attr="dorm_name" :list="roomList" @selectData="onRoomData" :currIndex="roomIndex"></list-select>
    </div>
  </div>
</template>
<script>
import listSelect from '@/modules/list/list-select'
import session from '@/components/morality-manager/assets/js/session.js'
// import sort from '@/components/morality-manager/assets/js/sortNumber.js'
export default {
  name: 'chooseClass',
  components: {
    listSelect
  },
  data () {
    return {
      buildIndex: 0,
      roomIndex: 0,
      buildList: [],
      roomList: [],
      allDormitoryList: []
    }
  },
  methods: {
    getData (url) {
      this.$preloaderFull.show({ mask: true })
      return this.$axios.get(url).then(({ data }) => {
        // console.log(data)
        this.$preloaderFull.close()
        if (data.status === 200) {
          return data.result
        } else {
          return Promise.reject(new Error(data.message))
        }
      }).catch((erro) => {
        this.$preloaderFull.close()
        console.log(erro)
      })
    },
    onBuildData (d) {
      // console.log(d)
      if (d.value) {
        this.roomList = d.value.dorm_list
        this.buildIndex = d.i
      }
    },
    onRoomData (d) {
      // console.log(d.value)
      if (d.value) {
        this.$emit('transDormitoryId', d.value)
        this.roomIndex = d.i
      }
    },
    getDormitoryData () {
      // console.log(this.dormitoryData)
      if (this.dormitoryData && this.dormitoryData.length) {
        this.buildList = this.dormitoryData
        this.roomList = this.buildList[0].dorm_list
      } else {
        // this.getData('/palm/v2/dorm/list').then(data => {
        //   // console.log(data)
        //   this.buildList = data.data
        //   session.set('dormitoryData', data.data)
        //   this.roomList = this.buildList[0].dorm_list
        // })
      }
      // console.log(this.dormitoryData)
    }
  },
  created () {
    // console.log(this.dormitoryData)
    this.getDormitoryData()
  },
  computed: {
    dormitoryData () { // schoolStatisticIndex 组件做的保存
      return JSON.parse(session.get('dormitoryData')) || []
    }
  },
  activated () {
    // this.getDormitoryData()
  }
}
</script>
<style scoped>
  .choose-dormitory {
    height: 250px;
  }
  .choose-inner {
    display: flex;
  }
</style>