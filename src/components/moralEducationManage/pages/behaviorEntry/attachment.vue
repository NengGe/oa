<template>
  <div class='attachment cf'>
    <div class="box clickActive2" v-if="needBtn">
      <div class="img-box" @click="addImg">
        <i class="icon iconfont-morality">&#xe637;</i>
      </div>
      <div class="text">图片</div>
    </div>
    <div class="box" v-for="(item, i) in imgList" :key="'img'+i">
      <img class="img" :src="item" @click="imgAction(item, i)" />
      <span v-if="needBtn" class="closeBtn iconfont" :data-index="i" @click="delAction(imgList, i)">&#xe7c0;</span>
    </div>
    <div class="box clickActive2" v-if="needBtn">
      <div class="img-box">
        <i class="icon iconfont-morality">&#xe7bb;</i>
      </div>
      <div class="text">视频</div>
    </div>
    <div class="box" v-for="(item, i) in videoList" :key="'video'+i">
      <img class="img" />
      <span v-if="needBtn" class="closeBtn iconfont" :data-index="i" @click="delAction(videoList, i)">&#xe7c0;</span>
    </div>
  </div>
</template>

<script>
import { openCameraPhoto, lookUpPicture } from '@/js/file-upload'
export default {
  props: {
    imgList: {
      type: Array
    },
    videoList: {
      type: Array
    },
    needBtn: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    delAction (list, i) {
      this.imgList.splice(i, 1)
    },
    addImg () {
      if (this.imgList.length >= 4) {
        this.$simpleMsg('最多添加4张图片')
        return
      }
      openCameraPhoto().then(d => {
        this.imgList.push(...d)
      })
    },
    imgAction (item, i) {
      let imgList = this.imgList.map(item => {
        return item.src
      })
      lookUpPicture(imgList, i)
    }
  }
}
</script>

<style scoped>
.box {
  width: 54px;
  float: left;
  margin: 8px;
  height: 80px;
  position: relative;
}
.img-box {
  height: 54px;
  border-radius: 6px;
  border: solid 1px #8d8d8d;
  opacity: 0.84;
  text-align: center;
  color: #8d8d8d;
}
.img {
  width: 54px;
  height: 54px;
  border-radius: 6px;
}
.img-box .icon {
  line-height: 54px;
  font-size: 30px;
}
.text {
  text-align: center;
  line-height: 24px;
  color: #8d8d8d;
}
.box .closeBtn {
  position: absolute;
  right: -5px;
  top: -5px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  color: #fd7b7b;
  font-size: 14px;
  line-height: 12px;
}
</style>




