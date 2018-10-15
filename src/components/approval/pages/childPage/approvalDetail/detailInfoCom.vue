<template>
  <div class="detailContent-box">
    <div class="personInfo">
      <div class="personImg personInfo-left"></div>
      <div class="personInfo-right">
        <p class="personName">{{dataObj.personName}}</p>
        <p class="status" :class="{'color-orange': dataObj.status.state === '1','color-green': dataObj.status.state === '2', 'color-red': dataObj.status.state === '3', 'color-gray': dataObj.status.state === '4'}">{{dataObj.status.contentText}}</p>
      </div>
    </div>
    <div class="infoContent-box" v-if="displayModule==='normal'">
      <div class="info-row" v-for="(item,index) in dataObj.contentArr" :key="'normal'+index" :class="{specialStyle: item.specialStyle === 'specialStyle'}">
        <div class="keyText">{{ item[0]+':' }}</div>
        <div class="valueText" v-html="item[1]"></div>
      </div>
    </div>
    <!-- 公告详情信息模块 -->
    <div class="infoContent-box" v-if="displayModule==='announceModule'">
      <div class="info-row" v-for="(item,index) in dataObj.contentArr" :key="'announceModule'+index" :class="{specialStyle: item.specialStyle === 'specialStyle'}">
        <div class="keyText">{{ item[0]+':' }}</div>
        <div class="valueText">{{ item[1] }}</div>
      </div>
      <div class="info-row notice-row">
        <div class="keyText">通知对象:</div>
        <div class="valueText" :class="{active: !isSpread}">
          <span class="personName" v-for="(personName, index) in dataObj.noticePersonArr" :key="'personName'+index">{{personName}}</span>
        </div>
        <span class="switchBtn" v-if="dataObj.noticePersonArr.length>4" @click="()=>{isSpread = !isSpread}">{{isSpread?'收起':'展开'}}</span>
      </div>
    </div>
    <!-- 采购详情信息模块 -->
    <info-caigou :data="dataObj" v-if="displayModule==='caigou'"></info-caigou>
    <!-- 附件 -->
    <div class="attachment-box" v-show="dataObj.attachmentArr[0].length + dataObj.attachmentArr[1].length">
      <span>说明附件：</span>
      <div class="attachment">
        <div class="attachmentImgs-box cf">
          <div class="img-box" v-for="(item,index) in dataObj.attachmentArr[0]" :key="'imgbox'+index" @click="imgAction(index)">
            <img :src="item.src">
          </div>
        </div>
        <div class="attachmentDocuments-box cf">
          <div class="document-box" v-for="(item,index) in dataObj.attachmentArr[1]" :key="index">
            <a :href="item.src">{{item.name}}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable camelcase */
import { lookUpPicture } from '@/js/file-upload'
import infoCaigou from './info_caigou'
export default {
  components: {
    infoCaigou
  },
  props: {
    'dataObj': {
      type: Object
    },
    'displayModule': {
      type: String
    }
  },
  data () {
    return {
      isSpread: false
    }
  },
  methods: {
    // 点击图片 原生查看
    imgAction (i) {
      let imgList = this.dataObj.attachmentArr[0]
      let imgSrcArr = imgList.map(item => {
        return item.src
      })
      lookUpPicture(imgSrcArr, i)
    }
  }
}
</script>

<style lang='scss' scoped>
.personInfo {
  width: 100%;
  height: 51px;
  display: flex;
  margin-bottom: 11px;
  .personInfo-left {
    width: 51px;
    height: 51px;
    border-radius: 50%;
    background-color: #ccc;
    background-image: url("@/assets/imgs/ava3.png");
    background-size: 100%;
    // img{
    //   width: 51px;
    //   height: 51px;
    //   border-radius: 50%;
    // }
  }
  .personInfo-right {
    flex: 1;
    padding-left: 11px;
    box-sizing: border-box;
    line-height: 28px;
    .personName {
      font-size: 17px;
      color: #555;
      font-weight: bold;
    }
    .status {
      font-size: 14px;
      line-height: 24px;
    }
  }
}
.detailContent-box {
  background-color: #fff;
  padding: 10px 16px 32px;
  .info-row {
    display: flex;
    line-height: 30px;
    font-size: 13px;
    .keyText {
      width: 75px;
      color: #999;
    }
    .valueText {
      flex: 1;
      color: #666;
      word-break: break-all;
      .personName {
        margin-right: 5px;
      }
    }
    .switchBtn {
      color: #70b9fe;
      margin-right: 5px;
    }
  }
  .attachment-box {
    display: flex;
    span {
      width: 70px;
      color: #999;
    }
    .attachment {
      flex: 1;
      border-radius: 5px;
      background-color: #f0f5f9;
      .img-box {
        height: 62px;
        margin: 6px 3px 0;
        float: left;
        img {
          width: 50px;
          height: 50px;
          display: block;
        }
      }
      .document-box {
        height: 26px;
        line-height: 26px;
        float: left;
        margin: 3px;
        a {
          color: #70b9fe;
          text-decoration: underline;
        }
      }
    }
  }
}
.color-blue {
  color: #6aa2d7;
}
.color-red {
  color: #ed5564;
}
.color-green {
  color: #18da55;
}
.color-orange {
  color: #f8ab59;
}
.color-gray {
  color: #999;
}
.notice-row .valueText.active {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
