<template>
  <div class="detail page-fixed">
    <div class="title">{{title}}</div>
    <div class="info cf">
      <span class="text">类型：{{type}}</span>
      <span class="text">发布人：{{name}}</span>
      <span class="text">发布时间：{{time}}</span>
    </div>
    <p class="content" v-html="content"></p>
    <bottomBtnCom v-if="this.$route.params.isAdmin" @modify='onModify' @delete='onDelete'></bottomBtnCom>
  </div>
</template>
<script>
import bottomBtnCom from './detail/bottomBtnCom'
export default {
  components: {
    bottomBtnCom
  },
  data () {
    return {
      title: '',
      type: '',
      name: '',
      time: '',
      content: '',
      detailData: null
    }
  },
  created () {
    console.log()
    this.getData()
    document.body.style.overflowY = 'hidden'
  },
  destroyed () {
    document.body.style.overflowY = ''
  },
  methods: {
    onModify () {
      this.$router.push({ name: 'newBuild', query: this.detailData })
    },
    onDelete () {
      this.postDel()
    },
    getData () {
      this.$preloaderFull.show()
      return this.$axios.get(`/palm/v2/proclamation?id=${this.$route.params.id}`).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          console.log(111, data)
          let d = data.result.proclamations[0]
          this.detailData = d
          this.title = d.title
          this.type = d.target_id === '0' ? '学校公告' : '班级公告'
          this.name = d.created_by_name
          this.time = this.$getTimeStr(d.created_on, 'yy-mm-dd hh:mm', false)
          this.content = d.content
        }
      })
    },
    postDel () {
      let d = {
        id: this.$route.params.id
      }
      this.$preloaderFull.show()
      return this.$axios.post(`/palm/v2/prodel`, d).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          this.$simpleMsg('已删除')
          this.$router.back()
          this.$emit('del')
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.detail {
  padding: 12px;
  background: #fff;
  z-index: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}
.info {
  // display: flex;
  // justify-content: space-between;

  margin-bottom: 20px;
  font-size: 12px;
  color: #ccc;
  margin-left: -5px;
  .text {
    margin-left: 5px;
    float: left;
  }
}

.title {
  min-height: 45px;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  line-height: 45px;
}
.content {
  line-height: 24px;
}
</style>



