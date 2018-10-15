<template>
  <div class="lookup">
    <div class="title-box">{{desc}}</div>
    <div class="type-box">
      <span class="type-text">类型：</span>
      <span class="type-content">{{typeName}}</span>
    </div>
    <div class="file-box">
      <div class="imgs-box">
        <ul class="imgList" v-show="imgList.length">
           <li class="imgItem" v-for="(item, i) in imgList" :key="'imgList'+i" @click="imgAction(i)">
            <img class="img" :src="item.src"  alt="">
          </li>
        </ul>
      </div>
      <div class="documents-box">
        <ul class="documentList">
          <li class="documentItem"  v-for="(item, i) in documentList" :key="'documentList'+i">
            <div class="ico-box"></div>
            <div class="docu-info-box">
              <div class="docu-name">
                <span class="name">{{item.name}}</span>
                <span class="type">{{item.type}}</span>
              </div>
              <div class="docu-size">{{item.size}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="file-box"></div>
    <!-- 底部 -->
    <div class="bottom-btn" @click="editAction">
      <span class="text">编辑</span>
    </div>
  </div>
</template>

<script>
import confirmBox from '@/modules/message-box/confirmBox.vue'
import { lookUpPicture } from '@/js/file-upload'
export default {
  data () {
    return {
      desc: '',
      typeName: '',
      imgList: [],
      documentList: [],
      // isApproval: false,
      fileTypeId: ''
    }
  },
  created () {
    // if (this.$route.params.isFileAdmin && this.$route.params.status === 'approving') {
    //   this.isApproval = true
    // }
    this.getData(this.$route.params.id)
  },
  components: {
    confirmBox
  },
  methods: {
    imgAction (i) {
      let imgSrcArr = this.imgList.map(item => {
        return item.src
      })
      // console.log('imgSrcArr', imgSrcArr)
      lookUpPicture(imgSrcArr, i)
    },
    editAction () {
      this.$router.replace({name: 'upload', params: {fileId: this.$route.params.id, typeId: this.fileTypeId}})
    },
    getData (id) {
      this.$preloaderFull.show()
      return this.$axios
        .get(`/mobicampus/file/v1/getUpload/${id}`)
        .then(({ data }) => {
          if (data.status === 200) {
            console.log('IF-data-详情', data)
            let dataObj = data.result.data
            this.desc = dataObj.desc
            this.typeName = dataObj.type_name
            this.imgList = dataObj.file_list
            this.fileTypeId = dataObj.type_id
            console.log('this.fileTypeId', this.fileTypeId)
          } else {
            this.$simpleMsg(data.message)
          }
        })
        .catch(e => {
          this.$simpleMsg(e)
        })
        .then(() => {
          this.$preloaderFull.close()
        })
    }
  }
}
</script>

<style lang='scss' scoped>
.lookup{
  z-index: 2;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  padding:0 16px 70px;
  overflow: auto;
  .title-box{
    margin-top: 30px;
    // height: 30px;
    // line-height: 30px;
    font-weight: bolder;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding-bottom: 13px;
    border-bottom: 1PX #ddd solid;
  }
  .type-box{
    display: flex;
    justify-content: space-between;
    padding: 13px 0;
    border-bottom: 1PX #ddd solid;
    color: #666;
    font-weight: bold;
    .type-content{
      color: #999;
    }
  }
  .file-box{
    .imgs-box{
      .imgList{
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: 10px 0;
        border-bottom: 1PX #ddd solid;
        .imgItem{
          box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.3);
          margin: 10px 0;
          width: 90px;
          height: 90px;
          background-color: #ccc;
          border-radius: 5px;
          padding: 3px;
          box-sizing: border-box;
          background-clip: content-box;
          .img{
            width: 100%;
            height: 100%;
            border-radius: 3px;
          }
        }
        .imgItem:nth-child(3n+2){
          margin: 10px 35px;
        }
      }
    }
    .documents-box{
      padding-top: 23px;
      .documentList{
        .documentItem{
          &:last-child{
            margin: 0;
          }
          display: flex;
          margin-bottom: 29px;
          .ico-box{
            width: 32px;
            height: 32px;
            background-color: #75cff6;
            border-radius: 3px;
            margin-right: 13px;
          }
          .docu-info-box{
            flex: 1;
            color: #999;
            .docu-name{
              height: 16px;
              line-height: 16px;
              .name{
                display: inline-block;
                overflow: hidden;
                max-width: 176px;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              .type{
                display: inline-block;
                vertical-align: top;
              }
            }
            .docu-size{

            }
          }
          .delBtn-box{
            align-self: center;
            .icon{
              color: #f26262;
              font-size: 21px;
            }
          }
        }
      }
    }
  }
  .bottom-btn{
      box-shadow: 0 -3px 10px #dbe1e8;
      font-size: 17px;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      line-height: 54px;
      height: 54px;
      background-color: #fff;
      color: #58aeff;
      text-align: center;
    }
    .bottom-btn.sure-btn{
      display: flex;
      .l-btn{
        flex: 1;
      }
      .r-btn{
        flex: 1;
        background-color: #58aeff;
        color: #fff;
      }
    }
}
</style>
