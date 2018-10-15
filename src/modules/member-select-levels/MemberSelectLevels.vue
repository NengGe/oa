<template>
    <div ref="eSlideLoader" class="slide-loader-psl">
      <ul class="sl-move">
        <li class="sl-item" v-for="(item,i) in list" :data-index="i">
          <MainList @deptSelect="deptSelect" :deptData="item" :selected="selected" @goBack="goBack" @confirm="$emit('confirm',selected)" :comm="comm" :type="type"></MainList>
        </li>
      </ul>
    </div>
</template>

<script>
  import SliderOne from '@/modules/member-select-levels/slider-one'
  import MainList from '@/modules/member-select-levels/MainList'
  export default {
    props: ['type', 'initSelected'],
    data () {
      return {
        list: [{
          id: 0,
          dept_list: [],
          member_list: [],
          parentId: 0,
          isLoad: 0
        }, {
          id: 0,
          dept_list: [],
          member_list: [],
          parentId: 0,
          isLoad: 0 // 加载中
        }, {
          id: 0,
          dept_list: [],
          member_list: [],
          parentId: 0,
          isLoad: 0
        }],
        positionData: [],
        comm: {
          history: [],
          parentId: 0
        },

        // 已选
        selected: {
          // '111': 1 // 1 已选 2 半选
        }
      }
    },
    components: {
      MainList
    },
    mounted () {
      let {eSlideLoader} = this.$refs
      let sliderOne = this.sliderOne = new SliderOne({
        eDrag: eSlideLoader,
        boxW: eSlideLoader.clientWidth
      })
      this.positionData = sliderOne.sliderPositionData.data

      // 初始值
      if (this.type === 'multiple') {
        this.initSelected.forEach(d => {
          this.selected[d.user_id] = d
        })
      } else {
        let {initSelected} = this
        if (initSelected) {
          this.$set(this.selected, 0, initSelected)
        }
      }
      // sliderOne.changeLeft = () => {
      // }
      // sliderOne.changeRight = () => {
      // }
      // sliderOne.changeAnimateEnd = () => {
      // }
      this.loadData(0)
    },
    methods: {
      deptSelect (id) {
        this.sliderOne.swipeLeft()
        this.loadData(id)
      },
      goBack () {
        let id = this.comm.history.pop()
        if (id === undefined) {
          this.$emit('close')
        } else {
          this.sliderOne.swipeRight()
          this.loadData(id)
        }
      },
      loadData (id) {
        let itemIndex = this.positionData[1].item
        let item = this.list[itemIndex]
        item.isLoad = true
        this.$axios.get('/schoolorg/v1/getDeptAndMemberLists/' + id).then(({data}) => {
          if (data.status === 200) {
            item = data.result.data
            item.isLoad = false
            item.id = id
            this.$set(this.list, itemIndex, item)
          }
        })
      }
    }
  }
</script>

<style scoped>
  .slide-loader-psl {
    overflow: hidden;
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    .sl-move {
      width: 100%;
      height: 100%;
      position: relative;
      transform: translate3d(-100%, 0, 0);
    }
    .sl-item {
      list-style-type: none;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      transform: translate3d(100%, 0, 0);
      overflow: auto;

      &:first-child {
        transform: translate3d(0, 0, 0);
      }
      &:last-child {
        transform: translate3d(200%, 0, 0);
      }
    }
    .animated {
      transition:transform 0.3s ease;
    }
  }

</style>
