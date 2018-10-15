<template>
  <div>
    <div class="check-box">
      <div class="check-header">
        <a @click="goBack" class="iconfont"></a>
        <h4>{{deptName}}</h4>
        <p v-if="type==='multiple'"><a @click="selectAll">全选</a><a @click="cancelAll">取消</a></p>
      </div>
      <ul class="partments" @click="clickDeptItem">
        <li v-for="item of deptData.children_dept_list" :data-id="item.id"><i class="iconfont icon-bumen"></i><p>{{item.name}}</p>
        </li>
      </ul>
      <ul class="members" @click="clickMemberItem" v-if="deptData.member_list.length">
        <li v-for="item of deptData.member_list" :data-id="item.user_id" :dataItem.prop="item"><i class="iconfont icon-touxiang"></i><p>{{item.name}}</p>
          <label class="iconfont label-checkbox" :class="{selected:type==='multiple'?selected[item.user_id]:(selected[0]&&selected[0].user_id===item.user_id)}">
            <div class="item-media"><i class="icon icon-form-checkbox"></i></div>
          </label>
        </li>
      </ul>
    </div>
    <br><br>
    <div class="tz-confirmbtn">
      <button @click="confirm">确认</button>
    </div>
  </div>
</template>

<script>
  import scopeElements from '@/modules/corejs/dom/scope-elements'
  export default {
    props: ['selected', 'deptData', 'comm', 'type'],
    // data () {
    //   return {
    //     type: 'single' // multiple
    //   }
    // },
    computed: {
      deptName () {
        let {deptData} = this
        let deptName = deptData.dept
        if (deptName) {
          return deptName.name
        }
        return ''
      }
    },
    methods: {
      clickMemberItem (e) {
        let item = null
        scopeElements(e.target, elem => {
          let {tagName} = elem
          if (tagName === 'UL') {
            if (item) {
              let id = item.dataset.id
              if (this.type === 'multiple') {
                let selected = this.selected[id]
                if (selected) {
                  this.$delete(this.selected, id)
                } else {
                  this.select(item.dataItem, id)
                }
              } else {
                if (this.selected[0] === id) {
                  this.$set(this.selected, 0, null)
                } else {
                  this.select(item.dataItem, 0)
                }
              }
            }
            return false
          }
          if (tagName === 'LI') {
            item = elem
          }
        })
      },
      clickDeptItem (e) {
        let item = null
        scopeElements(e.target, elem => {
          let {tagName} = elem
          if (tagName === 'UL') {
            if (item) {
              this.comm.history.push(this.deptData.id)
              this.$emit('deptSelect', item.dataset.id)
            }
            return false
          }
          if (tagName === 'LI') {
            item = elem
          }
        })
      },
      select (d, id) {
        this.$set(this.selected, id, {
          user_id: d.user_id,
          user_name: d.name,
          dept_id: d.dept_id,
          dept_name: this.deptName,
          type: 0
        })
      },
      selectAll () {
        this.deptData.member_list.forEach(d => {
          this.select(d, d.user_id)
        })
      },
      cancelAll () {
        let {$delete, selected} = this
        this.deptData.member_list.forEach(d => {
          $delete(selected, d.user_id)
        })
      },
      goBack () {
        this.$emit('goBack')
      },
      confirm () {
        this.$emit('confirm')
      }
    },
    watch: {
      'deptData.isLoad' (isLoad) {
        if (isLoad) {
          this.$preloaderFull.show()
        } else {
          this.$preloaderFull.close()
        }
      }
    }
  }
</script>

<style scoped>
  .check-box {
    max-width: 750px;
    margin: 0 auto;
    box-sizing: border-box;
    padding-left: 2%;
    padding-right: 2%;
    .check-header {
      width: 100%;
      height: 62px;
      text-align: center;
      position: relative;
      &>a {
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        width: 32px;
        text-align: center;
        height: 62px;
        line-height: 62px;
        font-size: 20px;
        color: #12b7f5;
        &::before{
          content: '\e606';
        }
      }
      h4 {
        position: absolute;
        width: 100%;
        height: 100%;
        line-height: 62px;
        font-size: 18px;
        font-weight: bold;
        margin: 0;
        padding: 0;
      }
      p{
        margin: 0;
        padding: 0;
        text-align: right;
        line-height: 62px;
        font-size: 14px;
        position: relative;
        a{
          margin-right: 8px;
        }
      }
    }
    ul.partments{
      width: 100%;
      /*display: inline-block;*/
      li{
        width: 100%;
        background: #fff;
        border-radius: 6px;
        display: inline-block;
        margin-bottom: 15px;
        box-sizing: border-box;
        padding-top: 12px;
        padding-bottom: 12px;
        padding-left: 20px;
        padding-right: 20px;
        box-shadow: 0 1PX 2px rgba(0, 0, 0, 0.05);
        &>i {
          width: 34px;
          height: 34px;
          border-radius: 4px;
          display: inline-block;
          color: #9ad2f5;
          font-size: 36px;
          float: left;
          margin: 0;
          padding: 0;
          position: relative;
          &::before {
            position: absolute;
            top: -1PX;
            left: 0;
            width: 100%;
            height: 100%;
          }
        }
        p {
          margin: 0;
          padding: 0;
          font-size: 14px;
          line-height: 34px;
          margin-left: 18px;
          color: #666;
          display: inline-block;
          float: left;
        }
        label {
          float: right;
          margin-top: 6px;
        }
      }
    }
    ul.members{
      width: 100%;
      /*display: inline-block;*/
      background: #fff;
      border-radius: 6px;
      box-sizing: border-box;
      padding: 6px;
      padding-left: 20px;
      padding-right: 20px;
      li {
        width: 100%;
        border-bottom: 1PX solid #eee;
        padding-top: 12px;
        padding-bottom: 12px;
        display: inline-block;
        &:last-child {
          border-bottom: none;
        }
        &>i {
          width: 34px;
          height: 34px;
          border-radius: 4px;
          display: inline-block;
          color: #fff;
          background: #f4dd9a;
          font-size: 28px;
          float: left;
          margin: 0;
          padding: 0;
          position: relative;
          &::before {
            position: absolute;
            top: 2px;
            left: 2px;
            width: 100%;
            height: 100%;
          }
        }
        p {
          margin: 0;
          padding: 0;
          font-size: 14px;
          line-height: 34px;
          margin-left: 18px;
          color: #666;
          display: inline-block;
          float: left;
        }
        label {
          float: right;
          margin-top: 6px;
        }
      }
    }
    label{
      width: 22px;
      height: 22px;
      position: relative;
      border-radius: 3px;
      border: 1PX solid #c7c7cc;
      box-sizing: border-box;
    }
    label.selected {
      border: 1PX solid #12b7f5;
      &::before{
        content: "\e63e";
        color: #12b7f5;
        width: 100%;
        height: 100%;
        line-height: 18px;
        position: absolute;
        text-align: center;
        font-size: 12px;
      }
    }
  }
</style>
