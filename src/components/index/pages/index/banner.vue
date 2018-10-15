<template>
  <div class="box">
    <div class="banner">
      <div class="circle c1"></div>
      <div class="circle c2"></div>
      <div class="circle c3"></div>
      <div class="icon iconfont-homePage">
        <img class="jianzhu" src="../../static/imgs/jianzhu1.png">
      </div>
      <div class="text-box">
        <div class="text one">移动校园</div>
        <div class="text two">移动智慧校园一站式整体解决方案</div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.banner {
  margin: 0 12px;
  /* background-color: #6daffc; */
  height: 132px;
  border-radius: 9px;
  position: relative;
  background: linear-gradient(to right, #6daffc, #8281f3);
  overflow: hidden;
}
.circle.c1 {
  position: absolute;
  top: 14px;
  left: 46px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  /* opacity: 0.15; */
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0)
  );
}
.circle.c2 {
  position: absolute;
  top: 10px;
  right: -17px;
  width: 157px;
  height: 157px;
  border-radius: 50%;
  opacity: 0.27;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.17),
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0)
  );
}
.circle.c3 {
  position: absolute;
  top: 70px;
  left: -60px;
  width: 245px;
  height: 245px;
  border-radius: 50%;
  opacity: 0.27;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0)
  );
}
.icon.iconfont-homePage {
  font-size: 50px;
  /* color:  */
  position: absolute;
  top: 24px;
  right: 20px;
}
.jianzhu {
  width: 92px;
  opacity: 0.65;
  /* height: 40px; */
}
.text-box {
  position: absolute;
  left: 20px;
  top: 47px;
  color: #fff;
  .one {
    color: rgba(255, 255, 255, 0.8);
    font-size: 19px;
    font-weight: bold;
    line-height: 19px;
    word-spacing: 2px;
    letter-spacing: 2px;
  }
  .two {
    padding-top: 6px;
    font-size: 10px;
    line-height: 20px;
    color: rgba(255, 255, 255, 0.6);
  }
}
</style>
