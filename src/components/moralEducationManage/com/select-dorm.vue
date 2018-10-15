<template>
  <div class="select-dorm">
    <VMask v-show="isShow" @click="isShow=!isShow"></VMask>
    <div class="head" @click='isShow=!isShow'>
      <span class="text">{{gradeAndClass||'请选择'}}</span>
      <i class="iconfont">&#xe6ac;</i>
      <div class="content" :class="{active:isShow}" @click.stop>
        <listSelect attr='name' :list='listA' :currIndex='currIndexA' @selectData="onchangeA"></listSelect>
        <listSelect attr='dorm_name' :list='listB' :currIndex='currIndexB' @selectData="onchangeB"></listSelect>
      </div>
    </div>
  </div>
</template>

<script>
import listSelect from '@/modules/list/list-select'
import VMask from '@/modules/mask/VMask'
export default {
  name: 'select-dorm',
  components: {
    listSelect,
    VMask
  },
  data () {
    return {
      currIndexA: 0,
      currIndexB: 0,
      isShow: false,
      listA: []
    }
  },
  watch: {
    gradeAndClass () {
      let { listB, currIndexB } = this
      listB[currIndexB] && this.$emit('getDormInfo', listB[currIndexB])
    }
  },
  computed: {
    gradeAndClass () {
      let { listA, listB, currIndexA, currIndexB } = this
      let gradeData = listA[currIndexA]
      let classData = listB[currIndexB]
      return classData ? `${gradeData['name']}${classData['dorm_name']}` : ''
    },
    listB () {
      let i = this.currIndexA
      return this.listA[i] ? this.listA[i].dorm_list : []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    initSelClass ({ grade, classId }) {
      let currIndexA = this.listA.findIndex(item => {
        return item.grade === grade
      })
      this.currIndexA = currIndexA === -1 ? 0 : currIndexA
      let currIndexB = this.listA[this.currIndexA].classes.findIndex(item => {
        return item.class_id === classId
      })
      this.currIndexB = currIndexB === -1 ? 0 : currIndexB
    },
    onchangeA (d) {
      this.gradeData = d.value
      this.currIndexA = d.i
    },
    onchangeB (d) {
      this.currIndexB = d.i
    },
    getData () {
      this.$preloaderFull.show()
      return this.$axios.get(`/palm/v2/dorm/list`).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          let d = data.result.data
          this.listA = d

          console.log('listA', this.listA)
          console.log('listB', this.listB)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.select-dorm {
}
.head {
  position: relative;
  z-index: 9;
  background: #eeeff3;
  line-height: 38px;
  height: 38px;
  text-align: center;
  color: #88b8f8;
  font-size: 15px;
}
.content {
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  overflow: hidden;
  transition: all 0.2s;
  padding: 0 16px;
  background: #fff;
  display: flex;
  height: 0;
  &.active {
    padding: 30px 16px;
    height: 250px;
  }
}
</style>
