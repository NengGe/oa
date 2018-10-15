<template>
  <div class="index-item">
    <LoaderRefresh @loadData="loadData">
    <div class="item-outer">
      <ul>
        <li class="item" 
          v-for="(item, index) in resourceList" 
          :key="index"
          @click="toDetails(item)" 
        >
          <div class="one">
            <span class="left">{{item.title}}</span>
            <span class="right">
              {{item.created_on}}
            </span>
          </div>
          <div class="intro-content">
           {{item.abstract}}
          </div>
        </li>
      </ul>
    </div>
    </LoaderRefresh>
  </div>
</template>
<script>
import LoaderRefresh from '@/modules/loader-refresh/LoaderRefresh'
export default {
  name: 'indexItem',
  props: {
    resourceList: Array
  },
  components: {
    LoaderRefresh
  },
  methods: {
    toDetails (item) {
      this.$router.push({path: '/dysource/dyresourceDetail', query: {id: item.id}})
    },
    loadData ({type, complete, vLoaderBottom} = {}) {
      this.$emit('loadData', {type, complete, vLoaderBottom})
    },
    changeTime () {
      // console.log(this.resourceList)
      const timeFn = (args) => {
        return parseInt(args) < 10 ? '0' + args : args
      }
      this.resourceList.forEach(ele => {
        let date = new Date(ele.created_on)
        ele.created_on = date.getFullYear() + '-' + timeFn(date.getMonth() + 1) + '-' + timeFn(date.getDate()) + ' ' + timeFn(date.getHours()) + ':' + timeFn(date.getMinutes())
      })
    }
  },
  watch: {
    resourceList () {
      this.changeTime()
      // console.log(this.resourceList)
    }
  }
}
</script>
<style scoped>
.item {
  padding: 0px 16px;
  margin-top: 10px;
  border-bottom: 1px solid #e2dbdb;
}
.intro-content {
  overflow: hidden;
  text-overflow: ellipsis;
  display:-webkit-box; 
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2; 
  padding: 15px 0px 0px 0px;
  font-size: 15px;
  color: #999999;
  margin-bottom: 15px;
  /* height: 80px; */
}
.one {
  display: flex;
  justify-content: space-between;
  padding: 6px 0px 0px 0px;
}
.one .left {
  font-size: 15px;
  font-weight: bold;
  color: #333333;
}
.one .right {
  font-size: 15px;
  color: #999999;
}
</style>
