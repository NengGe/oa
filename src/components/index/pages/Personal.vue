<template>
  <div class="personal">
    <div class="info">
      <div class="personInfo-box">
        <img class="img" src="@/assets/imgs/ava3.png">
        <div class="name-box">
          <div class="name">{{userName}}</div>
          <div class="dept">{{deptName}}</div>
        </div>
      </div>
      <div class="normalInfo-box">
        <p class="row">{{`账号：${account}`}}</p>
        <p class="row">{{`ID：${userId}`}}</p>
        <p class="row">{{`手机：${telNum}`}}</p>
        <p class="row">{{`邮箱：${emil}`}}</p>
      </div>
    </div>

    <div class="item-box clickActive" @click="isShowConfirmBoxCom=true">
      <div class="l">退出登录</div>
      <div class="r iconfont">&#xe616;</div>
    </div>

    <!-- 退出登录确定提示 弹窗 -->
    <ConfirmBoxCom v-show="isShowConfirmBoxCom" title="提示" content='继续退出当前账号？' @confirmAction="quitAction" @cancelAction="isShowConfirmBoxCom = false"></ConfirmBoxCom>

  </div>
</template>

<script>
import ConfirmBoxCom from '@/modules/message-box/confirmBox'
export default {
  components: {
    ConfirmBoxCom
  },
  data () {
    return {
      isShowConfirmBoxCom: false,
      userName: '',
      userId: '',
      deptName: '',
      account: '',
      telNum: '',
      emil: ''
    }
  },
  created () {
    this.getCurrUserInfo()
  },
  methods: {
    quitAction () {
      this.isShowConfirmBoxCom = false
      if (process.env.IS_WX === 'true') { // 微信端
        this.postDeleteUserWxApp() // 解除用户绑定关系 && go-to --> 登录界面（H5）
      } else { // 移动端
        window.oa.goNativeInterface('login') // go-to --> 登录界面（原生）
      }
    },
    getCurrUserInfo () {
      this.$preloaderFull.show()
      return this.$axios.get(`/schoolorg/v1/getCurrUserInfo`).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          let d = data.result.data
          this.userName = d.user_name
          this.userId = d.user_id
          this.deptName = d.dept_list[0].name
          this.account = d.teacher_code || ''
          this.telNum = d.telNum || ''
        }
      })
    },
    postDeleteUserWxApp () {
      this.$preloaderFull.show()
      return this.$axios.get(`/weixin/v1/deleteUserWxAppRel`).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          this.$router.replace({ name: 'login' })
        }
      })
    }
  }
}
</script>


<style lang='scss' scoped>
.personal {
}
.info {
  padding: 25px 0;
  background-color: #fff;
  padding-left: 23px;
  .personInfo-box {
    height: 62px;
    display: flex;
    .img {
      width: 62px;
    }
    .name-box {
      padding-top: 10px;
      margin-left: 21px;
      .name {
        line-height: 28px;
        font-size: 18px;
        font-weight: bold;
      }
      .dept {
        line-height: 20px;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .normalInfo-box {
    margin-top: 12px;
    .row {
      color: #999;
      line-height: 24px;
      font-size: 14px;
    }
  }
}
.item-box {
  margin-top: 12px;
  display: flex;
  padding: 0 12px;
  justify-content: space-between;
  line-height: 54px;
  background-color: #fff;
  .l {
    color: #666;
    font-size: 15px;
  }
  .r {
    color: #999;
  }
}
</style>
