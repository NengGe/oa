<template>
  <div :bus="bus" class="column">
    <div class="bg-white"></div>
    <!--头部-->
    <div class="header">
      <div class="header-f">资产管理</div>
      <div class="header-r">
        <i class="iconfont-assets">&#xe632;</i>
        <i class="iconfont-assets">&#xe61f;</i>
      </div>
    </div>
    <!--内容-->
    <div class="content">
      <ul class="list">
        <router-link :to="{name:'assetsList'}">
          <li class="list-item">
            <div style="background-color: #00c095"><i class="iconfont-assets">&#xe64c;</i></div>
            <span>学校资产</span>
          </li>
        </router-link>
        <li class="list-item">
          <div style="background-color: #00bb53"><i class="iconfont-assets">&#xe614;</i></div>
          <span>资产领用</span>
        </li>
        <li class="list-item">
          <div style="background-color: #4ea5e5"><i class="iconfont-assets">&#xe78c;</i></div>
          <span>资产归还</span>
        </li>
        <li class="list-item">
          <div style="background-color: #f9c101"><i class="iconfont-assets">&#xe6ae;</i></div>
          <span>资产调用</span>
        </li>
        <li class="list-item">
          <div style="background-color: #ee7d09"><i class="iconfont-assets">&#xe62e;</i></div>
          <span>资产调拨</span>
        </li>
        <li class="list-item">
          <div style="background-color: #4ea5e5"><i class="iconfont-assets">&#xe684;</i></div>
          <span>统计报表</span>
        </li>
        <li class="list-item">
          <div style="background-color: #f65459"><i class="iconfont-assets">&#xe62f;</i></div>
          <span>资产报废</span>
        </li>
        <li class="list-item">
          <div style="background-color: #00c095"><i class="iconfont-assets">&#xe669;</i></div>
          <span>资产维修</span>
        </li>
        <li class="list-item">
          <div style="background-color: #e54eb9"><i class="iconfont-assets">&#xe70e;</i></div>
          <span>信息变更</span>
        </li>
        <li class="list-item">
          <div style="background-color: #f65459"><i class="iconfont-assets">&#xe726;</i></div>
          <span>资产预警</span>
        </li>
        <li class="list-item">
          <div style="background-color: #f9c101"><i class="iconfont-assets">&#xe628;</i></div>
          <span>资产盘点</span>
        </li>
        <li class="list-item">
          <div style="background-color: #4ea5e5"><i class="iconfont-assets">&#xe64d;</i></div>
          <span>系统设置</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'assets-manage-index',
    props: ['bus']
  }
</script>

<style scoped>
  .column {
    .bg-white{
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background-color: #fff;
    }
    .header {
      padding: 15px;
      color: #fff;
      font-size: 16px;
      overflow: hidden;
      clear: both;
      background-color: #2d71c3;
      position: relative;
      .header-f {
        float: left;
        line-height: 100%;
      }
      .header-r {
        float: right;
        i {
          font-size: 20px;
          line-height: 100%
        }
        i:nth-child(1) {
          margin-right: 20px;
        }
      }
    }
    .content {
      padding: 68px 0 0;
      position: relative;
      .list {
        padding: 0 10px;
        overflow: hidden;
        clear: both;
        .list-item {
          display: inline-block;
          text-align: center;
          margin-bottom: 70px;
          width: 23.9%;
          div {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            text-align: center;
            margin: 0 auto 10px;
            i {
              font-size: 20px;
              line-height: 48px;
              text-align: center;
              color: #fff;
            }
          }
          span {
            display: block;
            font-size: 12px;
          }
        }
        .list-item:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
</style>
