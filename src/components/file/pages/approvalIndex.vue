<template>
  <div class="file" :class="{isHide}">
    <!-- 背景图片 -->
    <oa-bg-nodata v-show="showBg"></oa-bg-nodata>
    <oa-tabHead position :list="tabList" attr='name' :currIndex="isTabItem" @action="(i)=>tabItemAction(i)">
      <!-- 搜索框 -->
      <oa-search :keyword.sync='keyword' placeholder="搜索..."></oa-search>
    </oa-tabHead>
    <!-- 待审核 -->
    <LoaderRefresh v-if="isTabItem === 0" ref="LoaderRefresh" @loadData="loadDataA" colorTop="black" colorBottom="black">
      <div class="approving approval-list" v-show="isTabItem === 0">
        <oa-listCom class="item-container" v-for="(item, i) in approvingList" :key="'approvingList'+i">
          <div class="singleSel-container" @click="()=>singleSelAction(item)">
            <singleSelBox :isSelected="item.isSelected"></singleSelBox>
          </div>
          <fileItem @fileItemAction="onFileItemAction" :isBatchOperation="isBatchOperation" :fileItem="item">
            <div class="fileItem-head">
              <div class="user-name">{{item.user_name}}</div>
              <div class="agree-btn" @click.stop="agreeBtnAction(item.id)">同意</div>
            </div>
          </fileItem>
        </oa-listCom>
      </div>
    </LoaderRefresh>
    <!-- 已通过 -->
    <LoaderRefresh v-if="isTabItem === 1" ref="LoaderRefresh" @loadData="loadDataB" colorTop="black" colorBottom="black">
      <div class="approved approval-list" v-show="isTabItem === 1">
        <oa-listCom class="item-container" v-for="(fileItem, i) in approvedList" :key="'approvedList'+ i">
          <fileItem @fileItemAction="onFileItemAction" :fileItem="fileItem">
            <div class="fileItem-head">
              <div class="user-name">{{fileItem.user_name}}</div>
            </div>
          </fileItem>
        </oa-listCom>
      </div>
    </LoaderRefresh>
    <!-- 底部 -->
    <div v-show="isTabItem === 0" class="bottom-btn" @click="batchAction">
      <span class="text">批量通过</span>
    </div>
    <div :class="['bottom-btn','confirmOrCancel',{active: isBatchOperation}]">
      <div class="btn-cancel">
        <div class="cancel-left" @click="allSelBoxAction">
          <singleSelBox :isSelected="isAllSelect"></singleSelBox>
        </div>
        <div class="cancel-right" @click="cancelAction">
          <span class="cancelText">取消</span>
        </div>
      </div>
      <div class="btn-sure" @click="sureAction">一键通过</div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import fileItem from '../components/indexCom/fileItem.vue'
import singleSelBox from '../components/indexCom/singleSelBox.vue'
import LoaderRefresh from '@/modules/loader-refresh/LoaderRefresh.vue'
export default {
  name: 'file-index',
  components: {
    fileItem,
    singleSelBox,
    LoaderRefresh
  },
  props: ['bus'],
  data () {
    return {
      isHide: false,
      showBg: false,
      // 参数
      keyword: '',
      queryType: 1,
      parentFileTypeId: 0,
      fileTypeId: 0,
      size: 10,
      isAllSelect: false,
      isBatchOperation: false,
      isFileAdmin: -1,
      isTabItem: 0,
      tabList: [],
      selectedData: {},
      // 常规
      normalList: [],
      // 教学
      teachingList: [],
      // 研究
      researchList: [],
      // 审核中
      approvingList: [],
      // 审核通过
      approvedList: [],
      uploadList: []
    }
  },
  computed: {
    beginA: function () {
      return this.approvingList.length
    },
    beginB: function () {
      return this.approvedList.length
    }
  },
  watch: {
    'keyword': function () {
      console.log('33333333333333333333')
      if (this.isTabItem === 0) {
        this.approvingList = []
      } else {
        this.approvedList = []
      }
      // 重置下拉检测
      this.$refs.LoaderRefresh.$refs.vLoaderBottom.reStart()
    },
    '$route': function (to, from) {
      this.isHide = to.name === 'approvalLookup'
    }
  },
  created () {
    this.getInitInfo().then(() => { })
  },
  methods: {
    // 搜索
    onSearch (keyword) {
      this.keyword = keyword
      if (this.isTabItem === 0) {
        this.approvingList = []
      } else {
        this.approvedList = []
      }
      // 重置下拉检测
      this.$refs.LoaderRefresh.$refs.vLoaderBottom.reStart()
    },
    // 刷新 && 加载--审批中
    loadDataA ({ type, complete, vLoaderBottom }) {
      if (type === 'refresh') { // 刷新情况
        this.getUploadList(0, this.size).then(dataArr => {
          // console.log('dataArr', dataArr)
          this.approvingList = dataArr || []
          this.$nextTick(() => {
            // 元素渲染就绪后，下拉加载重置并检测
            vLoaderBottom.reset() // 重置激活
            vLoaderBottom.tryLoad() // 检测是否执行加载
          })
          complete()
        })
      } else { // 下拉加载情况
        // console.log('')
        this.getUploadList(this.beginA, this.size).then(dataArr => {
          dataArr = dataArr || []
          let dataLength = dataArr.length
          // console.log('dataLength', dataLength)
          // complete((dataLength === 0))
          this.approvingList = this.approvingList.concat(dataArr)
          this.$nextTick(() => {
            if (vLoaderBottom.$el.offsetTop + 90 < window.innerHeight) {
              vLoaderBottom.hide()
            }
            complete((dataLength === 0))
          })
          // complete((dataLength === 0))
        })
      }
    },
    // 刷新 && 加载--审批通过
    loadDataB ({ type, complete, vLoaderBottom }) {
      if (type === 'refresh') { // 刷新情况
        console.log('刷新')
        this.getUploadList(0, this.size).then(dataArr => {
          // console.log('dataArr', dataArr)
          this.approvedList = dataArr || []
          this.$nextTick(() => {
            // 元素渲染就绪后，下拉加载重置并检测
            vLoaderBottom.reset() // 重置激活
            vLoaderBottom.tryLoad() // 检测是否执行加载
          })
          complete()
        })
      } else { // 下拉加载情况
        // console.log('开始加载更多')
        this.getUploadList(this.beginB, this.size).then(dataArr => {
          dataArr = dataArr || []
          let dataLength = dataArr.length
          // console.log('dataLength', dataLength)
          // complete((dataLength === 0))
          this.approvedList = this.approvedList.concat(dataArr)
          this.$nextTick(() => {
            if (vLoaderBottom.$el.offsetTop + 90 < window.innerHeight) {
              vLoaderBottom.hide()
            }
            complete((dataLength === 0))
          })
          // complete((dataLength === 0))
        })
      }
    },
    batchAction () {
      if (!this.approvingList.length) return
      this.isBatchOperation = true
    },
    agreeBtnAction (id) {
      let params = {
        upload_id_list: [parseInt(id)],
        action: 'pass'
      }
      this.postApprove(params).then(() => {
        this.getUploadList(0, this.size).then(dataArr => {
          this.$simpleMsg('已同意')
          this.approvingList = dataArr
        })
      })
    },
    onFileItemAction (id) {
      let status = 'approved'
      if (this.isTabItem === 0) {
        status = 'approving'
      }
      this.$router.push({ name: 'approvalLookup', params: { id, status } })
    },
    selectOneItem (item, status) {
      if (status) {
        item.isSelected = true
        this.selectedData[item.id] = item
      } else {
        item.isSelected = false
        delete this.selectedData[item.id]
      }
    },
    cancelAction () {
      this.isBatchOperation = false
      this.isAllSelect = false
      this.approvingList.forEach(item => {
        this.selectOneItem(item, this.isAllSelect)
      })
    },
    sureAction () {
      this.isBatchOperation = false
      this.isAllSelect = false
      let uploadIdList = []
      for (let k in this.selectedData) {
        uploadIdList.push(parseInt(this.selectedData[k].id))
      }
      let params = {
        upload_id_list: uploadIdList,
        action: 'pass'
      }
      this.postApprove(params).then(() => {
        // 重置下拉检测
        this.$refs.LoaderRefresh.$refs.vLoaderBottom.reStart()
        this.getUploadList(0, this.size).then(dataArr => {
          this.approvingList = dataArr
        })
      })
    },
    singleSelAction (item) {
      item.isSelected = !item.isSelected
      this.selectOneItem(item, item.isSelected)
      this.isAllSelect = Object.keys(this.selectedData).length === this.approvingList.length
      // console.log(Object.keys(this.selectedData).length, this.approvingList.length)
    },
    allSelBoxAction () {
      this.isAllSelect = !this.isAllSelect
      this.approvingList.forEach(item => {
        this.selectOneItem(item, this.isAllSelect)
      })
    },
    itemAction (id, status) {
      this.$router.push({ name: 'lookup', params: { id, isFileAdmin: this.isFileAdmin, status } })
    },
    syTextAction (sy) {
      sy.isfold = !sy.isfold
    },
    // Tab切换
    tabItemAction (i) {
      this.isTabItem = i
      this.keyword = ''
      this.isBatchOperation = false
      this.queryType = i + 1
      this.parentFileTypeId = 0
      this.approvingList = []
      this.approvedList = []
      this.$refs.LoaderRefresh.$refs.vLoaderBottom.reStart()
    },
    // 获取文件列表
    getUploadList (begin, size) {
      // this.$preloaderFull.show()
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
            dataObj.upload_list.forEach(item => {
              item.isSelected = false
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
      this.$preloaderFull.show()
      return this.$axios
        .get(`/mobicampus/file/v1/getInitInfo`)
        .then(({ data }) => {
          if (data.status === 200) {
            // console.log('IF-data', data)
            let dataObj = data.result.data
            this.isFileAdmin = dataObj.is_file_admin
            this.queryType = 1
            this.parentFileTypeId = 0
            this.tabList = [
              { name: '待审核' },
              { name: '已通过' }
            ]
            // if (this.isFileAdmin) {
            //
            // } else {
            //   this.queryType = 0
            //   this.tabList = dataObj.type_list
            // }
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
    },
    postApprove (params) {
      this.$preloaderFull.show()
      return this.$axios
        .post(`/mobicampus/file/v1/approve`, params)
        .then(({ data }) => {
          if (data.status === 200) {
            console.log('IF-驳回通过', data)
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
.file {
  padding: 86px 0;
  &.isHide {
    height: 0;
    overflow: hidden;
  }
  .head {
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #fff;
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
      // padding-right: 10px;
      // height: 40px;
      // background-color: #fff;
      // border-radius: 9px;
      // display: flex;
      // box-shadow: 0 2px 1PX #e1ecf2;
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
    margin: 5px 10px;
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
    transition: transform 0.3s;
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
