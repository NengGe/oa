<template>
  <div class="upload-box">
    <div class="write">
      <textArea :appealIntro="'请写上说明'" ref="textarea" :inputContent="inputContent"></textArea>
    </div>
    <div class="evidence">
      <div class="inner-box">
        <div class="left-inner upload-item">
          <div class="left">
            <i class="iconfont" @click.stop="bottomOptionsShowB=!bottomOptionsShowB">&#xe637;</i>
          </div>
        </div>
        <div class="img-inner upload-item" upload-item v-if="imgUrl.length">
          <div 
          class="img-list" 
          v-for="(item, index) in imgUrl"
          :key="'list'+index"
          >
            <img :src="item" alt="" width="100%" height="100%">
            <closeTag class="close-tag" :size="13" @close="closeImg(index)"></closeTag>
          </div>
        </div>  
        <!-- <div class="right-inner upload-item">
          <div class="right">
            <i class="iconfont">&#xe7bb;</i>
          </div>
          <p class="in">视频</p>
        </div> -->
      </div>
    </div>
    <!-- 底部选择附件上传类型 -->
    <BottomOptions :show.sync="bottomOptionsShowB">
      <ul class="bottomList">
        <li v-for="(item, i) in wayList" :key="'wayList'+i" @click="()=>onWaySelect(item)">{{item.text}}</li>
      </ul>
    </BottomOptions>
  </div>
</template>
<script>
import textArea from '@/components/classManager/components/textArea'
import BottomOptions from '@/modules/bottom-options/BottomOptions'
import closeTag from '@/components/classManager/components/closeTag'
import { openCameraPhoto, openCameraPhotoMulti, lookUpPicture } from '@/js/file-upload'
export default {
  name: 'uploadBox',
  props: {
    inputContent: '',
    imgList: ''
  },
  components: {
    textArea,
    BottomOptions,
    closeTag
  },
  data () {
    return {
      wayList: [{ text: '相机', fn: openCameraPhoto }, { text: '相册', fn: openCameraPhotoMulti }],
      imgUrl: [],
      bottomOptionsShowB: false
    }
  },
  methods: {
    imgAction (imgList, i) {
      lookUpPicture(imgList, i)
    },
    onWaySelect (item) {
      this.bottomOptionsShowB = false
      if (this.imgUrl.length >= 4) {
        this.$simpleMsg('最多只能传4张')
      } else {
        item.fn().then(this.addImg)
      }
    },
    initImg () {
      this.imgUrl = this.imgList ? this.imgList.split(',') : []
      // console.log(this.imgUrl)
    },
    closeImg (index) {
      // this.imgUrl
      this.imgUrl.splice(index, 1)
      this.$emit('transImgUrl', this.imgUrl)
    },
    addImg (imgList) {
      // console.log(imgList)
      // this.imgUrl = imgList[0]
      // UploadFileList(imgList).then(dataList => {
      //   if (dataList.length) {
      //     // console.log(dataList)
      //     // this.imgUrl.push(dataList[0].src)
      //     dataList = dataList.length > 4 ? dataList.slice(0, 4) : dataList
      //     dataList = dataList.map(ele => {
      //       return ele.src
      //     })
      //     // console.log(dataList)
      //     this.imgUrl.push(...dataList)
      //   } else {
      //     this.$simpleMsg('图片上传失败，请重新提交')
      //   }
      this.imgUrl.push(...imgList)
      if (this.imgUrl.length > 4) {
        this.$simpleMsg('最多只能传4张')
        this.imgUrl = this.imgUrl.slice(0, 4)
      }
      this.$emit('transImgUrl', this.imgUrl)
      // })
    },
    getIntro () { // 得到说明信息
      // console.log(this.$refs.textarea)
      return this.$refs.textarea.inContent
    }
  },
  created () {
    this.initImg()
  }
}
</script>
<style scoped>
.upload-box {
  margin-top: 12.5px;
  padding: 21px 16px 16px 12px;
  background: #ffffff;
}
.text {
  width: 100%;
  height: 30px;
  border: none;
  outline: none;
}
.evidence::after {
  display: block;
  content: "";
  clear: both;
}
.evidence {
  margin-top: 23px;
}
.inner-box {
  /* float: left; */
  display: flex;
}
.left,
.right {
  width: 54px;
  height: 52px;
  border-radius: 5px;
  border: solid 1px #666666;
  line-height: 52px;
  text-align: center;
}
.right-inner {
  margin-left: 38px;
}
.evidence i.iconfont {
  color: #666666;
  opacity: 0.84;
  font-size: 25px;
}
.in {
  text-align: center;
  color: #777777;
  font-size: 13px;
  padding-top: 7px;
}
.upload-box /deep/ #in {
  height: 60px;
}
.img-inner {
  /* position: relative; */
  display: flex;
}
.img-inner .img-list {
  margin-left: 10px;
}
.img-inner .img-list:first-of-type {
  margin-left: 0;
}
.img-inner img {
  border-radius: 5px;
  width: 56px;
  height: 56px;
}
.close-tag {
  position: absolute;
  right: -6px;
  top: -6px;
}
.img-list {
  position: relative;
}
.upload-item {
  margin-left: 8px;
}
.upload-item:first-of-type {
  margin-left: 0;
}
</style>