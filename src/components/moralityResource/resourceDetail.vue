<template>
  <div class="resource-detail">
   <p class="head">
     班里的捣蛋鬼，咋整？
   </p>
   <div class="detail-info">
     <div class="info-inner">
       <p class="person">
         发布人：赵一
       </p>
       <p class="publish-time">2018-01-21 21:40</p>
     </div>
   </div>
   <div class="detail-content show-content" v-show="contentType.type === '1'" v-html="contentType.content">
   </div>
   <div class="detail-video show-content"  v-show="contentType.type === '2'">
     <video controls="controls" muted  :src="contentType.files_url" width="100%">
        对不起；您的浏览器不支持HTML5视频在WebM和VP8 / VP9或MP4
    </video>
   </div>
   <div class="detail-file show-content"  v-show="contentType.type === '3'">
     <a :href="contentType.files_url" class="a-load">附件下载</a>
   </div>
  </div>
</template>
<script>
// import indexItem from '@/components/moralityResource/components/indexItem'
export default {
  name: 'resourceDetail',
  data () {
    return {
      contentType: {}
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
    getItem () {
      this.getData('/palm/v2/resource?id=' + this.$route.query.id).then(data => {
        this.contentType = data.moral_resource[0]
        // console.log(data)
      })
    },
    upload () {
      // console.log('hehe')
      // window.location.href = 'http://f30.shenduxuetang.com/b51bdb1d-ee49-4537-9499-3efaf4b9e20c?e=1533376960&token=FlOuHhYOGakSvFFka9eBRf5emNuGpEcCEZmtNsLd:vOiqa-UdpIRZyFG2TqGjCDtVSaA'
    }
  },
  created () {
    this.getItem()
  }
}
</script>
<style scoped>
.resource-detail {
  padding:0px 16px;
}
.head {
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  margin-top: 15px;
}
.detail-info {
  display: flex;
  justify-content: center;
}
.info-inner {
  display: flex;
  margin-top: 15px;
  font-size: 15px;
  color: #999999;
}
.publish-time {
  margin-left: 10px;
}
.detail-content {
  /* text-align: center; */
}
.show-content {
  margin-top: 30px;
  font-size: 15px;
}
.show-content .a-load {
  text-decoration: underline;
}
</style>
