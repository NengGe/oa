<template>
  <div class="column">
    <!--头部-->
    <div class="header">
      <Search ref="Search" @loadData="loadSearch"></Search>
    </div>
    <!--内容-->
    <div class="content">
      <div class="inner-content">
        <ul class="nav-list" @click="onSelect">
          <li :class="{active:SelectPopupShow&&(SelectPopupType===0)}" data-type="0">资产类型<i class="iconfont-assets">&#xe60d;</i>
          </li>
          <li :class="{active:SelectPopupShow&&(SelectPopupType===1)}" data-type="1">资产状态<i class="iconfont-assets">&#xe60d;</i>
          </li>
          <li :class="{active:SelectPopupShow&&(SelectPopupType===2)}" data-type="2">部门<i class="iconfont-assets">&#xe60d;</i>
          </li>
        </ul>
        <RefreshTop ref="RefreshTop" @reload="reload">
          <ul class="content-list" @click="onClickFold">
            <li v-for="(d,i) of list" class="list-item" :key="d.id" :data-index="i">
              <div class="img none" :class="{none:!d.asset_img_url}"><img :src="d.asset_img_url"></div>
              <div class="detail">
                <p class="assetName">{{d.asset_name}}</p>
                <p class="assetNumber">资产编号：<span>{{d.asset_sn}}</span></p>
              </div>
              <div class="status" :class="['status'+d.asset_status]"><span>{{{0:'采购中',1:'闲置（在库）',2:'在用(出库)',3:'待报废',4:'报废',5:'备用'}[d.asset_status]}}</span></div>
              <div v-show="d.show" class="fold">
                <div class="fold-left">
                  <p>购买时间：<span>{{d.asset_date}}</span></p>
                  <!--<p>入库信息：<span>已入库（2号仓库）</span></p>-->
                  <p>资产类别：<span>{{d.type_name}}</span></p>
                  <p>资产类型：<span>{{{0:'未知',1:'固定资产',2:'易耗品',3:'低值资产'}[d.asset_type]}}</span></p>
                </div>
                <div class="fold-right">
                  <!--<p>负责人：<span>李老师</span></p>-->
                  <p>品牌：<span>{{d.asset_brand}}</span></p>
                  <!--<p>使用部门：<span>教务处</span></p>-->
                  <p>资产型号：<span>{{d.asset_model}}</span></p>
                </div>
              </div>
            </li>
          </ul>
        </RefreshTop>
        <LoaderBottom ref="LoaderBottom" @loadData="loadDataBottom"></LoaderBottom>
      </div>
    </div>
    <SelectPopup :show.sync="SelectPopupShow" :type="SelectPopupType" @confirm="confirm"></SelectPopup>
  </div>
</template>

<script>
  import scopeElements from '@/modules/corejs/dom/scope-elements-plus'
  import SelectPopup from './List/select-popup'
  import LoaderBottom from '@/modules/loader-bottom/LoaderBottom.vue'
  import RefreshTop from '@/modules/refresh-top/RefreshTop.vue'
  import Search from './List/Search'
  export default {
    name: 'list',
    props: ['bus'],
    data () {
      return {
        page: 1,
        list: [],
        SelectPopupShow: 0,
        SelectPopupType: 0
      }
    },
    components: {
      SelectPopup,
      LoaderBottom,
      RefreshTop,
      Search
    },
    methods: {
      onSelect (e, vnode) {
        scopeElements(e.target, vnode.elm, {
          'LI': elem => {
            this.SelectPopupShow = 1
            this.SelectPopupType = elem.dataset.type * 1
          }
        })
      },
      confirm (d) {
        /* eslint-disable camelcase */
        let {type_id, asset_type_id, status_id, dep_id} = d
        this.fetchData = () => {
          return this.$axios.get('/mobicampus/assets/v1/getapplylist', {
            params: {
              campus_id: -1, // =>  校区
              type_id, // => 资产类型
              asset_type_id, // => 资产类别
              status_id, // => 资产状态
              dep_id, // => 部门ID
              page_num: 10, // => 每页的条数，必填项
              page_index: this.page, // => 当前页数索引，必填项
              role_id: this.bus.userId // => 角色ID，必填项
            }
          }).then(({data}) => {
            if (data.status === 200) {
              return data.result.data
            } else {
              return Promise.reject(new Error(data.message))
            }
          })
        }
        this.$refs.RefreshTop.refresh()
        this.$refs.Search.clean()
      },
      fetchDataAll () {
        return this.$axios.get('/mobicampus/assets/v1/getaskwlist', {
          params: {
            key_word: '',
            page_num: 10, // => 每页的条数，必填项
            page_index: this.page // => 当前页数索引，必填项
          }
        }).then(({data}) => {
          if (data.status === 200) {
            return data.result.data
          } else {
            return Promise.reject(new Error(data.message))
          }
        })
      },
      fetchData () {
        return this.fetchDataAll()
      },
      loadSearch (searchKey) {
        this.fetchData = () => {
          return this.$axios.get('/mobicampus/assets/v1/getaskwlist', {
            params: {
              key_word: searchKey,
              page_num: 10, // => 每页的条数，必填项
              page_index: this.page // => 当前页数索引，必填项
            }
          }).then(({data}) => {
            if (data.status === 200) {
              return data.result.data
            } else {
              return Promise.reject(new Error(data.message))
            }
          })
        }
        this.$refs.RefreshTop.refresh()
      },
      loadDataBottom (loaded) {
        this.fetchData().then(data => {
          if (data.length) {
            let page = this.page
            if (page === 1) {
              this.list = data
            } else {
              this.list = this.list.concat(data)
            }
            this.$nextTick(() => {
              // 元素渲染就绪后再执行
              loaded(0, this.$el)
            })
            this.page = page + 1
          } else {
            if (this.page === 1) {
              this.list = []
            }
            loaded(1)
          }
          this.reloadFinish && this.reloadFinish()
          this.reloadFinish = null
        }).catch(e => {
          loaded(1)
          this.$simpleMsg(e)
        })
      },
      reload (complete) {
        this.page = 1
        this.$refs.LoaderBottom.reStart()
        this.reloadFinish = complete
      },
      onClickFold (e, vnode) {
        scopeElements(e.target, vnode.elm, {
          'LI': elem => {
            let d = this.list[elem.dataset.index]
            this.$set(d, 'show', !d.show)
          }
        })
      }
    }
  }
</script>

<style scoped>
  .column {
    bottom: auto;
    /*头部*/
    .header {
      height: 140px;
      max-height: 140px;
      background-color: #2d71c3;
      overflow: hidden;
    }

    /*内容*/
    .content {
      margin-top: -78px;
      .inner-content {
        margin: 0 10px;
        .nav-list {
          overflow: hidden;
          clear: both;
          li {
            float: left;
            width: 33.3%;
            text-align: center;
            color: #c2ddf7;
            padding-bottom: 14px;
            padding-top: 11px;
            i {
              display: inline-block;
              margin-left: 10px;
              font-size: 10px;
            }
            &.active {
              color: #dcc213;
              i {
                color: #dcc213;
                transform: rotate(180deg);
              }
            }
          }
        }

        .content-list {
          color: #333;
          min-height: 40px;
          .list-item {
              position: relative;
              overflow: hidden;
              clear: both;
              margin-bottom: 15px;
              background-color: #fff;
              border-radius: 10px;
              box-shadow: 0 1PX 10px #ccd9e8;
            .img {
              float: left;
              width: 60px;
              height: 64px;
              margin: 10px 0 10px 10px;
              img {
                width: 60px;
                height: 64px;
              }
              &.none {
                background: url('../assets/imgs/imgNone.png') center 0;
                background-size: auto 100%;
                img {
                  visibility: hidden;
                }
              }
            }

            .detail {
              float: left;
              margin-left: 10px;
              .assetName {
                font-size: 16px;
                font-weight: 700;
                padding: 15px 0;
              }
              .assetNumber {
                color: #c0c0c0;
              }
            }
            .status {
              font-size: 12px;
              text-align: center;
              width: 72px;
              position: absolute;
              top: 15px;
              right: 0;
              border-radius: 10px 0 0 10px;
              color: #fff;
              padding: 3px 0px;
            }
            .status1,.status0,.status5 {
              /*在库*/
              background-color: #1ab394;
            }
            .status3 {
              /*维修中*/
              background-color: #6ea9e0;
            }
            .status2 {
              /*已领用*/
              background-color: #f3c16b;
            }
            .status4 {
              /*已报废*/
              background-color: #ed5564;
            }
            .fold {
              border-radius: 0 0 10px 10px;
              background-color: #fff;
              overflow: hidden;
              clear: both;
              color: #c0c0c0;
              padding: 0 10px 20px;
              line-height: 24px;
              font-size: 12px;
              .fold-left {
                float: left;
                width: 50%;
                p {
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                  /*white-space: word-wrap;*/
                }
              }
              .fold-right {
                float: right;
                width: 50%;
                text-align: right;
                p {
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                  /*white-space: word-wrap;*/
                }
              }
            }
          }
        }
      }

    }
  }
</style>
