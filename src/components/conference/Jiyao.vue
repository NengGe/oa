<template>
  <div class="main">
    <!-- 标题 -->
    <!-- <formTitle readonly :content.sync="title"></formTitle> -->
    <!-- 会议纪要 -->
    <!-- <richtextCom @updateContent='(p) => content=p' placeholder="" :content='summary.content' /> -->
    <!-- 附件 -->
    <!-- <AttachmentCom :imgList="imgList" :needDelBtn="false" :needAddBtn="false" v-show="imgList.length"></AttachmentCom> -->
    <div class="main jiyao-main">
      <div class="mainbox">
        <h4>会议主题：{{title}}</h4>
        <div class="jiyao-detail">
          <h3>会议纪要:</h3>
          <p>{{summary.content}}</p>
        </div>
      </div>
      <div class="mainbox cf">
        <div class="img-box">
          <p>图片:
            <span></span>
          </p>
        </div>
        <div class="img-box img-show-box">
          <ul class="img-show">
            <li v-for="atta of summary.attachment_list"><img :src="atta.src" data-type="1"></li>
          </ul>
        </div>
        <!-- <button class="camera" @click="onClickShow"><img src="../../assets/imgs/xj01.png" alt=""></button> -->
        <div class="clearfix"></div>
      </div>
      <div class="mainbox">
        <h5>参会人员：</h5>
        <ul class="arrivers">
          <li class="active" v-for="item in attended">{{item.user_name}}</li>
        </ul>
        <h5 class="no-arrive">缺席人员：</h5>
        <ul class="arrivers">
          <li v-for="item in NoAttended">{{item.user_name}}</li>
        </ul>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</template>
<script>
import '@/assets/css/conference.css'
import '@/assets/css/modules/conference-jiyao.scss'
import formTitle from '@/components/commonCom/form-title'
import richtextCom from '@/components/commonCom/richtextCom'
import AttachmentCom from '@/components/commonCom/attachment'
export default {
  components: {
    formTitle,
    richtextCom,
    AttachmentCom
  },
  props: ['id'],
  data () {
    return {
      summary: [],
      title: '',
      imgList: [],
      attended: [],
      NoAttended: []
    }
  },
  mounted () {
    this.$axios.get('/mobicampus/meeting/v1/getMeetingSummary/' + this.id).then(({ data }) => {
      if (data.status === 200) {
        let d = data.result.data
        this.summary = d.meet_summary
        this.title = d.meet_title
        this.attended = d.participant_list_attended
        this.NoAttended = d.participant_list_not_attended
        this.imgList = this.summary.attachment_list.map(item => {
          return item.src
        })
      }
    })
  }
}
</script>


