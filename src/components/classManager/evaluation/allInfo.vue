<template>
  <div class="all-info" v-show="show">
    <VMask v-show="show" @click="$emit('changeShow')"></VMask>
    <div class="info-data" v-show="show">
      <p class="p-head">{{gradeName}}{{className}}（{{allPersonList.length && (allPersonList[0].name || '无名')}}）</p>
      <div class="info-data-wrapper" ref="wrapper">
        <ul class="ul-content">
          <li class="info-item"
            v-for="(item, index) in allPersonList"
            :key="index"
          >
            <span class="ranking">{{item.ranking}}</span>
            <div class="period">
              <span v-if="item.period === 'week'">{{item.period_name}}</span>
              <fourWeek v-if="item.period === 'four_week'" :weekList="item.period_name"></fourWeek>
              <span v-if="item.period==='month'">{{item.period_name.substr(0, 2)}}</span>
            </div>
            <span class="score">{{item.score}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import VMask from '@/modules/mask/VMask'
import local from '@/components/classManager/assets/js/localStore.js'
import fourWeek from '@/components/classManager/evaluation/fourWeek'
// import BScroll from 'better-scroll'
export default {
  name: 'allInfo',
  props: {
    show: {
      type: Boolean,
      default: true
    },
    allPersonList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    VMask,
    fourWeek
  },
  mounted () {
  },
  computed: {
    className () {
      return JSON.parse(local.get('gradeClassInfo')).className
    },
    gradeName () {
      return JSON.parse(local.get('gradeClassInfo')).gradeName
    }
  },
  watch: {
    allPersonList () {
      // console.log(this.allPersonList)
    }
  }
}
</script>
<style scoped>
.info-data {
  position: fixed;
  /* overflow: hidden; */
  width: 322px;
  height: 460px;
  z-index: 10;
  background-color: #ffffff;
	border-radius: 5px;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.p-head {
  padding: 20px 0px;
  color: #333333;
  /* font-weight: bold; */
  font-size: 15px;
  text-align: center;
  border-bottom: 1px solid #f1ebeb;
}
.info-item {
  font-size: 15px;
  /* padding: 26px 0px; */
  padding-top: 38px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.info-item:first-of-type {
  padding-top: 0;
}
.info-data-wrapper {
   overflow: auto;
   height: calc(100% - 58px);
}
.ul-content {
  padding-top: 26px;
  /* overflow: hidden; */
}
.ranking {
  	color: #333333;
}
.period {
  color: #999999;
}
.score {
  color: #ff6600;
}
</style>