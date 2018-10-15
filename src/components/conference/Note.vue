<template>
  <div class="main">
    <!-- <div class="main_header">
      <div class="tzheader">
        <div class="left">
          <button class="left" onclick="window.history.back()"><img src="../../assets/imgs/fh-b.png"></button>
        </div>
        <h3>笔记</h3>
        <div class="right">
        </div>
      </div>
    </div> -->
    <div class="main note-page">
      <div class="note-main">
        <div class="mainbox">
          <h2>第一页</h2>
          <div class="note-list">
              <img src="../../assets/imgs/conference/timg.jpg" alt="">
          </div>
        </div>
        <div class="mainbox">
          <h2>第二页</h2>
          <div class="note-list">
              <img src="../../assets/imgs/conference/timg-01.jpg" alt="">
          </div>
        </div>
      </div>
      <button id="note-add">添加笔记</button>
    </div>
  </div>
</template>
<script>
  import '@/assets/css/conference.css'
</script>

<style lang="scss">
/* 笔记 */

.note-page {
  padding-top: 0;
}

.note-main {
  margin-top: 0;
  position: relative;
  h2 {
    font-size: 18px;
    color: #12b7f5;
  }
  .note-list {
    width: 100%;
    background: #fafafa url(../../assets/imgs/note-bg.png) center no-repeat;
    border-radius: 3px;
    min-height: 160px;
    margin-top: 6px;
    margin-bottom: 6px;
    background-size: 60px;
    img {
      width: 100%;
    }
  }
}

#note-add {
  background: #12b7f5;
  width: 96%;
  margin-left: 2%;
  font-size: 18px;
  padding:18px 0 18px 0;
  text-align: center;
  color: #fff;
  position: relative;
  border-radius: 3px;
  border: none;
  outline: none;
  margin-top: 24px;
  position: relative;
  margin-bottom: 18px;
  &::before {
    position: absolute;
    content: '+';
    width: 18px;
    height: 18px;
    border-radius: 100%;
    border: 1PX solid #fff;
    text-align: center;
    line-height: 20px;
    display: block;
    font-size: 18px;
    top: 12px;
    left: 16px;
  }
}
</style>


