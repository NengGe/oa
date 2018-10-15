<template>
  <div>
    <div class="sign-box">
      <div class="sign-main">
        <h3>会议签到</h3>
        <h4>会议主题</h4>
        <p>请收到本通知的人于5月5日上午9：00点前到A03会议室参加教研研讨会，请带上纸笔，会议主题如下：<br>
          1:.......;<br>
          2:*******;
        </p>
        <div class="words">
          <div class="sweet-alert">
            <div class="sa-icon sa-success animate">
              <span class="sa-line sa-tip animateSuccessTip"></span>
              <span class="sa-line sa-long animateSuccessLong"></span>
              <div class="sa-placeholder"></div>
              <div class="sa-fix"></div>
            </div>
          </div>
          <p>签到成功</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .sign-box {
    max-width:750px;
    box-sizing: border-box;
    padding: 0 2%;
    padding-bottom: 1vh;
    height: 98.6vh;
    .sign-main{
      height: 100%;
      overflow: hidden;
      border-radius: 6px;
      position: relative;
      background: #ffffff;
      h3 {
        width: 100%;
        text-align: center;
        font-size: 16px;
        margin: 0;
        height: 48px;
        line-height: 48px;
        background: #eee;
        color: #666;
      }
      h4{
        text-align: center;
        line-height: 72px;
        margin: 0;
        color: #666;
      }
      p {
        font-size: 14px;
        color: #666;
        line-height: 22px;
        padding-left: 6%;
        padding-right: 6%;
        text-indent: 28px;
      }
      .words {
        width: 126px;
        height: 126px;
        position: absolute;
        padding: 0;
        border-radius: 126px;
        background:#12b7f5;
        border: 4px solid rgb(197 ,228, 252);
        left: 50%;
        top: 48%;
        margin-left: -63px;
        p {
          font-size: 20px;
          font-weight: bold;
          color: #666;
          text-align: center;
          margin: 0;
          padding: 0;
          line-height: 162px;
          text-indent: 0;
        }
      }
    }

  }
  .sweet-alert {
    width: 132px;
    height: 132px;
    top: 0;
    left: 0;
  }
  .sweet-alert .sa-icon {
    width: 80px;
    height: 80px;
    -webkit-border-radius: 40px;
    border-radius: 50%;
    margin: 20px auto;
    padding: 0;
    position: relative;
    top: 50%;
    margin-top: -40px;
    box-sizing: content-box; }
  .sweet-alert .sa-icon.sa-success {
    border-color: #A5DC86; }
  .sweet-alert .sa-icon.sa-success::before, .sweet-alert .sa-icon.sa-success::after {
    content: '';
    -webkit-border-radius: 40px;
    border-radius: 50%;
    position: absolute;
    width: 60px;
    height: 120px;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg); }
  .sweet-alert .sa-icon.sa-success::before {
    -webkit-border-radius: 120px 0 0 120px;
    border-radius: 120px 0 0 120px;
    top: -7px;
    left: -33px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-transform-origin: 60px 60px;
    transform-origin: 60px 60px; }
  .sweet-alert .sa-icon.sa-success::after {
    -webkit-border-radius: 0 120px 120px 0;
    border-radius: 0 120px 120px 0;
    top: -11px;
    left: 30px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-transform-origin: 0px 60px;
    transform-origin: 0px 60px; }
  .sweet-alert .sa-icon.sa-success .sa-fix {
    width: 5px;
    height: 90px;
    position: absolute;
    left: 28px;
    top: 8px;
    z-index: 1;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg); }
  .sweet-alert .sa-icon.sa-success .sa-line {
    height: 5px;
    background-color: #fff;
    display: block;
    border-radius: 2px;
    position: absolute;
    z-index: 2; }
  .sweet-alert .sa-icon.sa-success .sa-line.sa-tip {
    width: 25px;
    left: 14px;
    top: 46px;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg); }
  .sweet-alert .sa-icon.sa-success .sa-line.sa-long {
    width: 47px;
    right: 8px;
    top: 38px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg); }
  /*
   * Animations
   */

  @-webkit-keyframes animateSuccessTip {
    0% {
      width: 0;
      left: 1PX;
      top: 19px; }
    54% {
      width: 0;
      left: 1PX;
      top: 19px; }
    70% {
      width: 50px;
      left: -8px;
      top: 37px; }
    84% {
      width: 17px;
      left: 21px;
      top: 48px; }
    100% {
      width: 25px;
      left: 14px;
      top: 45px; } }

  @keyframes animateSuccessTip {
    0% {
      width: 0;
      left: 1PX;
      top: 19px; }
    54% {
      width: 0;
      left: 1PX;
      top: 19px; }
    70% {
      width: 50px;
      left: -8px;
      top: 37px; }
    84% {
      width: 17px;
      left: 21px;
      top: 48px; }
    100% {
      width: 25px;
      left: 14px;
      top: 45px; } }

  @-webkit-keyframes animateSuccessLong {
    0% {
      width: 0;
      right: 46px;
      top: 54px; }
    65% {
      width: 0;
      right: 46px;
      top: 54px; }
    84% {
      width: 55px;
      right: 0px;
      top: 35px; }
    100% {
      width: 47px;
      right: 8px;
      top: 38px; } }

  @keyframes animateSuccessLong {
    0% {
      width: 0;
      right: 46px;
      top: 54px; }
    65% {
      width: 0;
      right: 46px;
      top: 54px; }
    84% {
      width: 55px;
      right: 0px;
      top: 35px; }
    100% {
      width: 47px;
      right: 8px;
      top: 38px; } }


  .animateSuccessTip {
    -webkit-animation: animateSuccessTip 0.75s;
    animation: animateSuccessTip 0.75s; }

  .animateSuccessLong {
    -webkit-animation: animateSuccessLong 0.75s;
    animation: animateSuccessLong 0.75s; }

  .sa-icon.sa-success.animate::after {
    -webkit-animation: rotatePlaceholder 4.25s ease-in;
    animation: rotatePlaceholder 4.25s ease-in; }


  /* Internet Explorer 9 has some special quirks that are fixed here */
  /* The icons are not animated. */
  /* This file is automatically merged into sweet-alert.min.js through Gulp */
  /* Error icon */

  /* Success icon */
  .sweet-alert .sa-icon.sa-success {
    border-color: transparent\9; }

  .sweet-alert .sa-icon.sa-success .sa-line.sa-tip {
    -ms-transform: rotate(45deg) \9; }

  .sweet-alert .sa-icon.sa-success .sa-line.sa-long {
    -ms-transform: rotate(-45deg) \9; }
</style>


