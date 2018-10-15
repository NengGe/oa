<template>
  <div class="login">
    <oa-logo></oa-logo>
    <div class="form-box">
      <div class="row campus" @click="isShowSelectCampus=true">
        <div class="icon"></div>
        <div class="content" :class="{active: campus}">{{campusName || '请选择校区'}}</div>
        <div class="icon-btn iconfont">&#xe6ac;</div>
      </div>
      <div class="row account">
        <div class="icon"></div>
        <input class="content" type="text" placeholder="请输入账号" v-model="account">
      </div>
      <div class="row password">
        <div class="icon"></div>
        <input class="content" type="password" placeholder="请输入密码" v-model="password">
      </div>
    </div>
    <!-- 确定 -->
    <div class="commitBtn-box" @click="commitBtnAction">确定</div>
    <selectCampus v-show="isShowSelectCampus" @selectAction="onselectAction"></selectCampus>
  </div>
</template>

<script>
// import { saveTokenAndOpenid, isLogin } from '@/modules/ajax-mid/web.js'
import selectCampus from './login/selectCampus'
export default {
  components: {
    selectCampus
  },
  data () {
    return {
      appid: '',
      code: '',
      openid: '',
      campus: null,
      campusName: '',
      account: '',
      password: '',
      role: 2,
      isShowSelectCampus: false
    }
  },
  created () {
    // this.appid = this.$route.params.appid
    // this.openid = this.$route.params.openid
  },
  methods: {
    commitBtnAction () {
      let { campus, account, password, role } = this
      if (!campus) {
        this.$simpleMsg('请选择校区')
        return
      }
      if (!account) {
        this.$simpleMsg('请输入账号')
        return
      }
      if (!password) {
        this.$simpleMsg('请输入密码')
        return
      }
      let data = {
        campus_id_str: campus.campus_id_str,
        no: account,
        password,
        role
      }
      if (this.isCommited) return
      this.isCommited = true
      this.postCampustoken(data).then(userInfo => { // 登录成功
        // console.log('userInfo', userInfo)
        let userId = userInfo.uid
        let data = {
          user_id: userId,
          openid: this.openid,
          appid: this.appid,
          school_id: this.campus.school_id_str,
          campus_id: this.campus.campus_id_str
        }
        this.postCreateUserWxAppRel(data) // 绑定用户openid
      })
    },
    onselectAction (campus) {
      console.log('campus', campus)
      this.isShowSelectCampus = false
      this.campus = campus
      this.campusName = `${campus.school_name} ${campus.campus_name}`
    },
    // 登录
    postCampustoken (data) {
      return this.$axios.post(`/comm/v1/campustoken`, data).then(({ data }) => {
        this.isCommited = false
        if (data.message === 'ok') {
          return data.result
        } else {
          this.$simpleMsg('登录失败, 请检查账号或密码错误')
        }
      })
    },
    // 绑定用户
    postCreateUserWxAppRel (data) {
      return this.$axios.post(`/weixin/v1/createUserWxAppRel`, data).then(({ data }) => {
        this.isCommited = false
        if (data.status === 200) {
          this.$simpleMsg('登录成功')
          this.$router.replace({ name: 'index' })
        } else {
          this.$simpleMsg('登录失败')
        }
      })
    },
    getQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return r[2]
      return null
    }
  }
}
</script>

<style lang='scss' scoped>
.login {
  padding: 45px 31px 0;
}
.form-box {
  margin-top: 82px;
  .row {
    margin-top: 20px;
    display: flex;
    padding: 13px;
    font-size: 14px;
    border-bottom: 1PX solid #ddd;
    .icon {
      margin: 0 17px 0 6px;
      // background-color: #ccc;
      width: 20px;
      height: 20px;
      background-size: contain;
      background-repeat: no-repeat;
    }
    .content {
      flex: 1;
    }
    .icon-btn {
      padding-left: 15px;
      color: #cdcdcd;
      font-size: 12px;
    }
  }
}

.campus .content {
  color: #ccc;
  &.active {
    color: #333;
  }
}
.campus .icon {
  background-image: url("../static/imgs/campus.png");
}
.account .icon {
  background-image: url("../static/imgs/account.png");
}
.password .icon {
  background-image: url("../static/imgs/password.png");
}
.commitBtn-box {
  box-shadow: 1PX 2px 19px 0px rgba(6, 48, 88, 0.13);
  height: 50px;
  margin: 45px 0 0;
  background-color: #53a2ed;
  color: #fff;
  line-height: 50px;
  font-size: 16px;
  border-radius: 25px;
  text-align: center;
  &:active {
    // background-color: rgba(83, 162, 237, 0.8);
    opacity: 0.8;
  }
}
input {
  outline: none;
  border: 0;
  background: 0;
}
input::placeholder {
  color: #ccc;
  font-size: 14px;
  // text-align: right;
}
</style>
