<template>
  <div class="lookup">
    <div class="title-box">
      <input class="input" type="text" v-model="desc" placeholder="请简要说明...">
    </div>
    <div class="type-box">
      <div class="type-text">类型：</div>
      <div class="type-content right" :class="{active: typeID}">
          <span class="text" @click="()=>{bottomOptionsShowA=true}">{{typeText||'请选择'}}</span>
          <span class="icon iconfont">&#xe616;</span>
        </div>
    </div>
    <div class="file-box">
      <div class="imgs-box">
        <ul class="imgList" @click="imgListAction">
          <li class="imgItem" v-for="(item, i) in imgs" :key="'imgs'+i">
            <img class="img" :src="item" :data-index='i'>
            <div class="delBtn-box">
              <span class="icon iconfont-file">&#xe61f;</span>
            </div>
          </li>
          <li class="imgItem addBtn"  @click="()=>{bottomOptionsShowB=true}">
            <span class="icon iconfont">&#xe61a;</span>
          </li>
        </ul>
      </div>
      <div class="documents-box">
        <ul class="documentList">
          <li class="documentItem" v-for="(item, i) in documentList" :key="'docuList'+i">
            <div class="ico-box"></div>
            <div class="docu-info-box">
              <div class="docu-name">
                <span class="name">{{item.name}}</span>
                <span class="type">{{item.type}}</span>
              </div>
              <div class="docu-size">{{item.size}}</div>
            </div>
            <div class="delBtn-box" @click="()=>delBtnDocuAction(i)">
              <span class="icon iconfont-file">&#xe61f;</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="file-box"></div>
    <!-- 底部 -->
    <div class="uploadBtn-box" @click="uploadBtnAction">
      <span class="text">上传</span>
    </div>
    <BottomOptions :show.sync="bottomOptionsShowA">
      <ul>
        <li v-for="(item, i) in typeList" :key="'typeList'+i" @click="()=>onTypeSelect(item)">{{item.name}}</li>
      </ul>
    </BottomOptions>
    <BottomOptions :show.sync="bottomOptionsShowB">
      <ul class="bottomList">
        <li v-for="(item, i) in wayList" :key="'wayList'+i" @click="()=>onWaySelect(item)">{{item.text}}</li>
      </ul>
    </BottomOptions>
  </div>
</template>

<script>
import BottomOptions from '@/modules/bottom-options/BottomOptions'
import { openCameraPhoto, openCameraPhotoMulti, UploadFileList, lookUpPicture } from '@/js/file-upload'
export default {
  data () {
    return {
      isCommited: false,
      bottomOptionsShowA: false,
      bottomOptionsShowB: false,
      desc: '',
      typeText: '',
      typeID: '',
      typeList: [],
      wayList: [{text: '相机', fn: openCameraPhoto}, {text: '相册', fn: openCameraPhotoMulti}],
      imgs: [],
      imgList: [],
      documentList: [
        // {name: '这个文件名称这个文件名称这个文件名称这个文件名称', size: '100KB', type: 'doc'}
      ],
      attachmentList: []
    }
  },
  created () {
    if (this.$route.params.hasOwnProperty('fileId')) {
      this.initData()
    }
    this.getFileTypeList(this.$route.params.typeId)
  },
  components: {
    BottomOptions
  },
  methods: {
    imgListAction (ev) {
      let {target} = ev
      let {index} = target.dataset
      console.log(target.className)
      if (target.tagName === 'IMG') {
        // console.log('target.tagName', target.tagName)
        this.imgAction(this.imgs, index)
      } else if (target.className === 'icon iconfont-file') {
        // console.log('target.tagName', target.tagName)
        this.delBtnImgAction(index)
      }
    },
    imgAction (imgs, i) {
      lookUpPicture(imgs, i)
    },
    // 初始化页面数据
    initData () {
      let fileId = this.$route.params.fileId
      let typeId = this.$route.params.typeId
      this.getFileData(fileId)
      this.getFileTypeList(typeId)
    },
    onTypeSelect (item) {
      this.typeText = item.name
      this.typeID = item.id
      this.bottomOptionsShowA = false
    },
    delBtnImgAction (i) {
      this.imgs.splice(i, 1)
    },
    // 相机 or 相册
    onWaySelect (item) {
      this.bottomOptionsShowB = false
      this.$nextTick(() => item.fn().then(this.addImg))
    },
    addImg (imgList) {
      console.log('imgList', imgList)
      this.imgs.push(...imgList)
    },
    uploadBtnAction () {
      // console.log('点击上传')
      let {desc, typeID, imgs} = this
      if (!desc) {
        this.$simpleMsg('请输入简要说明')
        return
      } else if (typeID === '') {
        this.$simpleMsg('请选择类型')
        return
      } else if (!imgs.length) {
        this.$simpleMsg('请添加文件')
        return
      }
      if (this.isCommited) return
      this.isCommited = true
      // if (this.imgs.length === 0) { // 没有附件
      //   this.postUpload()
      //   return
      // }
      UploadFileList(this.imgs).then((dataList) => {
        if (dataList.length !== 0) { // 图片上传成功
          this.attachmentList = dataList
          this.postUpload()
        } else { // 图片上传失败
          this.$simpleMsg('图片上传失败，请重新提交')
          this.isCommited = false
        }
      })
      // ***************  以下测试使用  ***************
      // imgList = [
      //   {id: 52}, {id: 53}, {id: 54}, {id: 51}
      // ]
      // ***************  以上测试使用  ***************
    },
    // 提交上传文件
    postUpload () {
      this.isCommited = true
      let {desc, typeID} = this
      let data = {
        desc,
        type_id: parseInt(typeID),
        file_list: this.attachmentList
      }
      if (this.$route.params.hasOwnProperty('fileId')) { // 编辑保存后--上传 (ps: 替换原来上传记录)
        data.id = parseInt(this.$route.params.fileId)
      }
      this.$axios.post('/mobicampus/file/v1/saveUpload', data).then(({data}) => {
        console.log(data)
        if (data.status === 200) {
          // console.log('if-data 上传成功', data)
          this.$simpleMsg('上传成功')
          this.$router.replace({name: 'fileIndex'})
        } else {
          this.isCommited = false
        }
      }).catch(error => {
        this.$simpleMsg(error)
      }).then(() => {
        // this.isLoadAdd = false
      })
    },
    // 获取类型列表
    getFileTypeList (pID) {
      console.log('获取类型列表')
      this.$axios.get(`/mobicampus/file/v1/getFileTypeList/${pID}`).then(({data}) => {
        // console.log
        if (data.status === 200) {
          console.log('if-data-list', data)
          this.typeList = data.result.data
        } else {

        }
      }).catch(error => {
        // this.$simpleMsg(error)
        console.log(error)
      }).then(() => {
        // this.isLoadAdd = false
      })
    },
    // 请求文件详情数据 && 初始化数据
    getFileData (id) {
      this.$preloaderFull.show()
      return this.$axios
        .get(`/mobicampus/file/v1/getUpload/${id}`)
        .then(({ data }) => {
          if (data.status === 200) {
            console.log('IF-data-详情', data)
            let dataObj = data.result.data
            this.desc = dataObj.desc
            this.typeText = dataObj.type_name
            this.typeID = dataObj.type_id
            let imgList = dataObj.file_list
            imgList.forEach(item => {
              // let imgInfo = {
              //   name: item.name,
              //   src: item.src,
              //   size: item.size
              // }
              this.imgList.push(item.src)
              // this.imgList.push(imgInfo)
            })
            this.fileTypeId = dataObj.file_type_id
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
  padding:0 16px 70px;
  .title-box{
    margin-top: 30px;
    font-weight: bolder;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding-bottom: 13px;
    border-bottom: 1PX #ddd solid;
    .input{
      width: 100%;
      font-weight: bold;
      line-height: 30px;
      background-color: #fff;
      border: 0;
      outline: none;
      &::placeholder{
        color: #bbb;
      }
    }
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
      &.active{
        color: #666;
      }
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
          position: relative;
          box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.3);
          margin: 10px 0;
          width: 90px;
          height: 75px;
          // background-color: #ccc;
          border-radius: 5px;
          padding: 3px;
          box-sizing: border-box;
          background-clip: content-box;
          .img{
            width: 100%;
            height: 100%;
            border-radius: 3px;
          }
          .delBtn-box{
            width: 20px;
            height: 20px;
            border-radius: 10px;
            background-color: #fff;
            position: absolute;
            right: -7px;
            top: -7px;
            .icon{
              color: #f26262;
              font-size: 20px;
            }
          }
          &.addBtn{
            box-shadow: 0;
            background: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1PX dashed #ccc;
            .icon{
             color: #ccc;
             font-size: 30px;
            }
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
            // margin: 0;
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
              font-size: 20px;
            }
          }
        }
      }
    }
  }
  .uploadBtn-box{
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
  .bottomList{
    color: #007aff;
  }
}
</style>
