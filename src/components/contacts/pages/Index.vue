<template>
  <div class="column">
    <!--头部-->
    <div class="header">
      <div class="header-t">联系人<i class="iconfont-contacts add-btn">&#xe618;</i></div>
    </div>
    <!--内容-->
    <div class="content">
      <div class="search"><i class="iconfont">&#xe625;</i><input type="text" placeholder="搜索"></div>
      <div class="groups">
        <div class="groups-item">
          <ul class="groups-list">
            <li class="list-item">
              <div class="img" style="background-color: #ff9800;"><i class="iconfont-contacts">&#xe69f;</i></div><span>我的群组</span>
            </li>
            <li class="list-item">
              <div class="img" style="background-color: #009688"><i class="iconfont-contacts">&#xe601;</i></div><span>西丽小学</span>
            </li>
            <li class="list-item">
              <div class="img" style="background-color: #2196f3"><i class="iconfont-contacts">&#xe601;</i></div><span>扬美实验中学</span>
            </li>
          </ul>
        </div>
        <div class="groups-item">
          <p class="category">花果山</p>
          <ul class="groups-list">
            <li class="list-item">
              <div class="img">
                <img src="../assets/imgs/contactImg.png" alt="">
              </div>
              <span>王大锤</span>
            </li>
            <li class="list-item">
              <div class="img none">
                <img src="../assets/imgs/contactImg.png" alt="">
              </div>
              <span>无面人</span>
            </li>
            <li class="list-item">
              <div class="img">
                <img src="../assets/imgs/contactImg.png" alt="">
              </div>
              <span>葫芦娃</span>
            </li>
            <li class="list-item">
              <div class="img">
                <img src="../assets/imgs/contactImg.png" alt="">
              </div>
              <span>野崎君</span>
            </li>
          </ul>
        </div>
        <div class="groups-item">
          <p class="category">我也不知道这是个什么组织</p>
          <ul class="groups-list">
            <li class="list-item">
              <div class="img">
                <img src="../assets/imgs/contactImg.png" alt="">
              </div>
              <span>张楚岚</span>
            </li>
            <li class="list-item">
              <div class="img none">
                <img src="../assets/imgs/contactImg.png" alt="">
              </div>
              <span>冯宝宝</span>
            </li>
            <li class="list-item">
              <div class="img">
                <img src="../assets/imgs/contactImg.png" alt="">
              </div>
              <span>赵小二</span>
            </li>
            <li class="list-item">
              <div class="img">
                <img src="../assets/imgs/contactImg.png" alt="">
              </div>
              <span>我是来凑数的</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

</script>
<style scoped>
.header {
  padding: 20px 15px 16px;
  background-color: #2d71c3;
  .header-t {
    position: relative;
    text-align: center;
    color: #fff;
    font-size: 20px;
    .add-btn {
      position: absolute;
      top: -1PX;
      right: 0;
      font-size: 24px;
    }
  }
}
.content{
  padding-bottom: 30px;
  .search{
    position: relative;
    margin: 10px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 1PX 3px 1PX #eee;
    input{
      padding: 15px 30px;
      width: 100%;
      outline: none;
      border: transparent;
      box-sizing: border-box;
      border-radius: 10px;
      font-size: 14px;
    }
    i{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 10px;
    }
  }
  .groups{
    margin: 0 10px;
   .groups-item{
     .category{
       margin: 3px 0;
       padding: 7px 0 7px 5px;
       color: #999999;
       background-color: #f0f8fc;
       font-size: 13px;
     }
     .groups-list{
       background-color: #fff;
       border-radius: 10px;
       box-shadow: 0 1PX 3px 1PX #eee;
       .list-item{
         margin: 0 15px;
         padding: 8px 0;
         line-height: 36px;
         border-bottom: 1PX solid #e4e4e4;
         color: #666;
         /*clear: both;*/
         /*overflow: hidden;*/
         .img{
           float: left;
           width: 36px;
           height: 36px;
           border-radius: 50%;
           line-height: 36px;
           text-align: center;
           margin-right: 20px;
           img{
             display: inline-block;
             width: 36px;
             height: 36px;
             border-radius: 50%;
           }
           &.none {
             background: url('../assets/imgs/contactNoImg.png') center 0;
             background-size: auto 100%;
             img{
               visibility: hidden;
             }
           }
           i{
             font-size: 22px;
             color: #fff;
           }
         }

       }
       .list-item:last-child{
         border-bottom: none;
       }
     }
   }
  }
}
</style>
