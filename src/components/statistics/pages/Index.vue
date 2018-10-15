<template>
<div class="statistics-index">
    <div :class="['item', item.className]" @click="itemAction(item.routerName, i)" v-for="(item, i) in itemList" :key="i">
      <div class="m">
        <div class="ico iconfont-statistics">
        </div>
        <div class="name">
          {{item.name}}
        </div>
      </div>
    </div>
</div>
</template>

<script>
  export default {
    name: 'statistics-index',
    data () {
      return {
        itemList: [
          {
            name: '考勤统计',
            className: 's1',
            routerName: 'attendance'
          },
          {
            name: '德育统计',
            className: 's4',
            routerName: 'moralEducation'
          },
          {
            name: '教师绩效',
            className: 's2',
            routerName: ''
          },
          {
            name: '学业质量',
            className: 's3',
            routerName: ''
          },
          {
            name: '课表',
            className: 's5',
            routerName: ''
          },
          {
            name: '教学常规统计',
            className: 's6',
            routerName: ''
          },
          {
            name: '学校实时监控',
            className: 's7',
            routerName: ''
          },
          {
            name: '安全统计',
            className: 's8',
            routerName: ''
          },
          {
            name: '家长投诉',
            className: 's9',
            routerName: ''
          }
        ],
        isJudged: false,
        campusIdArr: ['4892271197889314468'],
        userIdArr: ['492671', '492532', '492517', '492661'],
        isPass: false
      }
    },
    created () {
      // console.log('this.campusIdArr', this.campusIdArr)
      this.getCurrUserInfo().then(userInfo => {
        this.isJudged = true
        let campusId = userInfo.campus_id
        if (parseInt(campusId) !== parseInt(this.campusIdArr[0])) {
          this.isPass = true
        } else {
          // console.log('是西丽')
          this.isPass = this.userIdArr.indexOf(userInfo.user_id + '') !== -1
        }
      })
    },
    methods: {
      itemAction (routerName, index) {
        if (!routerName) return
        if (index === 0) { // 考勤统计
          if (!this.isJudged) {
            this.$simpleMsg('权限确认中...')
          } else { // 已获取用户信息
            if (this.isPass) { // 有权限
              this.$router.push({name: 'attendance'})
            } else { // 没权限
              this.$simpleMsg('当前用户无权限访问')
            }
          }
        } else { // 非考勤统计
          this.$router.push({name: routerName})
        }
      },
      getCurrUserInfo () {
        return this.$axios.get(`/schoolorg/v1/getCurrUserInfo`).then(({data}) => {
          console.log('data', data)
          if (data.status === 200) {
            console.log('if-data', data)
            let userInfo = data.result.data
            // userInfo.campus_id = '4892271197889314468' + ''
            // userInfo.user_id = '492599'
            console.log('userInfo.campus_id', userInfo.campus_id)
            return userInfo
          } else {

          }
        })
      }
    }
  }
</script>

<style scoped>
  .statistics-index {
    .item {
      width: 33.3%;
      height: 164px;
      padding-top: 48px;
      box-sizing: border-box;
      float: left;
    }

    .m {
      text-align: center;
    }

    .ico {
      width: 56px;
      height: 56px;
      border: 1PX solid #000;
      border-radius: 100%;
      margin: 0 auto;
      font-size: 25px;
      &:after{
        line-height: 2.4;
      }
    }
    .name {
      padding-top: 16px;
    }
    .s1 {
      color: #f8ab59;

      .ico {
        border-color: #f8ab59;
        &:after{
          content: '\e639';
        }
      }
    }
    .s2 {
      color: #23c7c9;
      .ico {
        border-color: #23c7c9;
        &:after{
          content: '\e647';
        }
      }
    }
    .s3 {
      color: #1aa187;
      .ico {
        border-color: #1aa187;
        &:after{
          content: '\e670';
        }
      }
    }
    .s4 {
      color: #1c83c6;
      .ico {
        border-color: #1c83c6;
        &:after{
          content: '\e60f';
        }

      }
    }
    .s5 {
      color: #b58aef;
      .ico {
        border-color: #b58aef;
        &:after{
          content: '\e6cc';
        }
      }
    }
    .s6 {
      color: #f8ab59;
      .ico {
        border-color: #f8ab59;
        &:after{
          content: '\e614';
        }
      }
    }
    .s7 {
      color: #23c7c9;
      .ico {
        border-color: #23c7c9;
        &:after{
          content: '\e60e';
        }
      }
    }
    .s8 {
      color: #f8ab59;
      .ico {
        border-color: #f8ab59;
        &:after{
          content: '\e623';
        }
      }
    }
    .s9 {
      color: #eb707d;
      .ico {
        border-color: #eb707d;
        &:after{
          content: '\e655';
        }
      }
    }
    .s10 {
      color: #94a4e2;
      .ico {
        border-color: #94a4e2;
        &:after{
          content: '\e628';
        }
      }
    }
  }
</style>

