<template>
  <div class="file" ref="filePage" :class="{isHide}">
    <!-- 背景图片 -->
    <oa-bg-nodata v-show="showBg"></oa-bg-nodata>
    <div class="head" ref="head">
      <!-- 头部按钮 -->
      <oa-tabHead :list="tabList" attr='name' :currIndex="isTabItem" @action="(i)=>tabItemAction(i)" bg='#fff'>
        <!-- 搜索框 -->
        <oa-search :keyword.sync='keyword' placeholder="搜索..."></oa-search>
      </oa-tabHead>
    </div>
    <LoaderRefresh ref="LoaderRefresh" @loadData="loadData" colorTop="black" colorBottom="black">
      <div class="c-sy-box" ref="list">
        <oa-listCom v-for="(fileItem, i) in uploadList" :key="'uploadList'+ i">
          <fileItem @fileItemAction="onFileItemAction" :fileItem="fileItem"></fileItem>
        </oa-listCom>
      </div>
    </LoaderRefresh>
    <!-- 底部 -->
    <div class="bottom-btn" @click="()=>this.$router.push({name: 'upload', params:{typeId: this.tabList[this.isTabItem].id}})">
      <span class="icon iconfont-file">&#xe60f;</span>
      <span class="text">上传文件</span>
    </div>
    <ApprovalBox v-if="isFileAdmin === true" :isPop="isNeedApprove" @click.native="ApprovalBoxAction"></ApprovalBox>
    <!-- 详情页 -->
    <transition name="slide-right">
      <router-view :bus="bus"></router-view>
    </transition>
  </div>
</template>

<script>
import fileItem from '../components/indexCom/fileItem.vue'
import LoaderRefresh from '@/modules/loader-refresh/LoaderRefresh.vue'
import ApprovalBox from '../components/indexCom/Approval-box.vue'
export default {
  name: 'file-index',
  components: {
    fileItem,
    LoaderRefresh,
    ApprovalBox
  },
  props: ['bus'],
  data () {
    return {
      isHide: false,
      showBg: false,
      isNeedApprove: true,
      // 参数
      keyword: '',
      queryType: 0,
      parentFileTypeId: 1,
      fileTypeId: 0,
      size: 10,
      isAllSelect: false,
      isBatchOperation: false,
      isFileAdmin: 0,
      isTabItem: 0,
      tabList: [],
      selectedData: {},
      // 常规
      normalList: [],
      // 教学
      teachingList: [],
      // 研究
      researchList: [],
      searchList: [], // 搜索列表
      uploadList: [], // 数据列表
      isShowTempPage: false
    }
  },
  computed: {
    begin: function () {
      return this.uploadList.length
    }
  },
  watch: {
    'keyword': function () {
      this.uploadList = []
      // 重置下拉检测
      this.$refs.LoaderRefresh.$refs.vLoaderBottom.reStart()
    },
    '$route': function (to, from) {
      this.isHide = to.name === 'lookup'
      console.log('router', this.isHide)
    },
    'isTabItem': function () {
      this.uploadList = []
      this.keyword = ''
      this.parentFileTypeId = this.isTabItem + 1
      // 重置下拉检测
      this.$refs.LoaderRefresh.$refs.vLoaderBottom.reStart()
    }
  },
  created () {
    this.getInitInfo().then(() => {
      if (this.isFileAdmin) {
        this.$refs.head.addEventListener('touchstart', this.touchstartAction)
        this.$refs.list.addEventListener('touchstart', this.touchstartAction)
      }
    })
  },
  methods: {
    touchstartAction () {
      if (this.isNeedApprove) {
        this.isNeedApprove = false
      }
    },
    // 点击审批盒子
    ApprovalBoxAction () {
      console.log('点击审批盒子')
      if (this.isNeedApprove) {
        this.$router.push({ name: 'fileApprovalIndex' })
        this.$refs.head.removeEventListener('touchstart', this.touchstartAction)
        this.$refs.list.removeEventListener('touchstart', this.touchstartAction)
      } else {
        this.isNeedApprove = true
        this.$refs.head.addEventListener('touchstart', this.touchstartAction)
        this.$refs.list.addEventListener('touchstart', this.touchstartAction)
      }
    },
    // 下拉刷新 && 上拉加载更多
    loadData ({ type, complete, vLoaderBottom }) {
      if (type === 'refresh') { // 刷新情况
        this.getUploadList(0, this.size).then(dataArr => {
          // console.log('dataArr', dataArr)
          this.uploadList = dataArr || []
          this.$nextTick(() => {
            // 元素渲染就绪后，下拉加载重置并检测
            vLoaderBottom.reset() // 重置激活
            vLoaderBottom.tryLoad() // 检测是否执行加载
          })
          complete()
        })
      } else { // 下拉加载情况
        // console.log('开始加载更多')
        this.getUploadList(this.begin, this.size).then(dataArr => {
          dataArr = dataArr || []
          let dataLength = dataArr.length
          this.uploadList = this.uploadList.concat(dataArr)
          this.$nextTick(() => {
            if (vLoaderBottom.$el.offsetTop + 90 < window.innerHeight) {
              vLoaderBottom.hide()
            } else {
              vLoaderBottom.show()
            }
            complete((dataLength === 0))
          })
        })
      }
    },
    onFileItemAction (id) {
      this.$router.push({ name: 'lookup', params: { id, type: this.isTabItem } })
    },
    // Tab切换
    tabItemAction (i) {
      this.isTabItem = i
    },
    // 获取文件列表
    getUploadList (begin, size) {
      let params = {
        keyword: this.keyword,
        query_type: this.queryType,
        parent_file_type_id: this.parentFileTypeId,
        file_type_id: this.fileTypeId,
        begin,
        size
      }
      return new Promise((resolve, reject) => {
        this.$axios.get(`/mobicampus/file/v1/getUploadList`, { params }).then(({ data }) => {
          if (data.status === 200) {
            let dataObj = data.result.data
            dataObj.upload_list.forEach(item => {
              // 转化时间格式
              let creatTime = item.create_time
              item.creat_time = creatTime.split('+')[0].split('T')[0]
            })
            this.showBg = begin === 0 && dataObj.upload_list.length === 0 // 无数据背景是否显示
            if (this.isFileAdmin) {
              resolve(dataObj.upload_list)
            } else {
              resolve(dataObj.upload_list)
            }
          } else {

          }
        })
      })
    },
    // 获取初始化信息（含类型列表）
    getInitInfo () {
      // this.$preloaderFull.show()
      return this.$axios
        .get(`/mobicampus/file/v1/getInitInfo`)
        .then(({ data }) => {
          if (data.status === 200) {
            let dataObj = data.result.data
            this.isFileAdmin = dataObj.is_file_admin
            this.queryType = 0
            this.tabList = dataObj.type_list
          } else {
            this.$simpleMsg(data.message)
          }
        })
        .catch(e => {
          console.log(e)
        })
        .then(() => {
          // this.$preloaderFull.close()
        })
    }
  }
}
</script>

<style lang='scss' scoped>
.file {
  padding: 86px 0;
  &.isHide {
    height: 0;
    overflow: hidden;
  }
  .head {
    // padding-top: 12px;
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    // background-color: #2d71c3;
    // height: 53px;
    margin-bottom: 21px;
    .tabList {
      margin: 0 10px;
      display: flex;
      height: 32px;
      .tabItem {
        text-align: center;
        font-size: 14px;
        line-height: 25px;
        flex: 1;
        color: #789dbf;
        &.active {
          color: #fff;
        }
      }
      .underline {
        width: 30px;
        height: 2px;
        margin: 3px auto 1PX;
        background-color: #fff;
        border-radius: 1PX;
      }
    }
    .input-box {
      margin: 12px 10px 0;
      margin-bottom: -21px;
      .icon-box {
        text-align: center;
        width: 44px;
        line-height: 40px;
      }
      .input {
        flex: 1;
        outline: none;
        border: 0;
      }
    }
  }
  .approval-list {
    padding-top: 10px;
  }
  .c-sy-box {
    // margin-top: 12px;
    .sy-text {
      color: #666;
      font-size: 14px;
      line-height: 39px;
      font-weight: bold;
      .icon {
        transition: transform 0.3s;
        display: inline-block;
        transform: rotate(-90deg);
        &.active {
          transform: rotate(0deg);
        }
      }
    }
  }
  .bottom-btn {
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
    font-size: 17px;
    position: fixed;
    bottom: 0;
    width: 100%;
    line-height: 54px;
    height: 54px;
    background-color: #fff;
    color: #58aeff;
    text-align: center;
    .icon {
      font-size: 20px;
    }
  }
  .bottom-btn.confirmOrCancel {
    box-shadow: 0 0px 0px rgba(0, 0, 0, 0);
    transition: transform 0.5s;
    display: flex;
    transform: translateY(54px);
    &.active {
      transform: translateY(0px);
      box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
    }
    .btn-cancel {
      flex: 1;
      background-color: #fff;
      color: #999;
      display: flex;
      .cancel-left {
        padding: 0 16px;
        .singleSel-box {
          margin-top: 16px;
          .icon {
            font-size: 12px;
          }
        }
      }
      .cancel-right {
        flex: 1;
        text-align: center;
        line-height: 54px;
      }
    }
    .btn-sure {
      flex: 1;
      background-color: #58aeff;
      color: #fff;
    }
  }
}
.item-container {
  width: 100%;
  overflow: hidden;
  position: relative;
  .singleSel-container {
    padding: 10px 16px;
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-50%);
  }
}
.fileItem-head {
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
  .user-name {
    line-height: 20px;
    font-size: 18px;
    font-weight: bold;
  }
  .agree-btn {
    box-shadow: 0px 3px 4px 0px rgba(40, 40, 40, 0.13);
    width: 62px;
    height: 24px;
    background-color: #f0b61b;
    color: #fff;
    text-align: center;
    line-height: 24px;
    border-radius: 5px;
  }
}
</style>
