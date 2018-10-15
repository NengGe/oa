<template>
  <div class="new-build page-bg">
    <FormTitle :content.sync="title" placeholder='请输入公告标题'></FormTitle>
    <FormCom class="FormCom">
      <cell v-if="informType.length<2" text title="公告类型" :content="type"></cell>
      <cell v-else button title="公告类型" :content="type" @action="bottomOptionsShowA=true"></cell>
      <cell v-show="type==='班级公告'" button title="班级" :content="classStr" @action="bottomOptionsShowB=true"></cell>
    </FormCom>
    <!-- 公告内容 -->
    <TextareaCom placeholder="请输入公告内容" :content.sync='content'></TextareaCom>
    <!-- 确定 -->
    <CommitBtnCom @action="commitBtnAction" content="发布公告"></CommitBtnCom>
    <!-- 公告类型 -->
    <BottomOptions :show.sync="bottomOptionsShowA">
      <ul>
        <li @click="type=item;bottomOptionsShowA=false" v-for="(item, i) in informType" :key="i">{{item}}</li>
      </ul>
    </BottomOptions>
    <!-- 选择班级 -->
    <BottomOptions :show.sync="bottomOptionsShowB">
      <ul>
        <li @click="classAction(item, i)" v-for="(item, i) in classList" :key="i">{{`${item.grade_name} ${item.class_name}`}}</li>
      </ul>
    </BottomOptions>
    <router-view></router-view>
  </div>
</template>

<script>
import FormTitle from '@/components/commonCom/form-title'
import CommitBtnCom from '@/components/commonCom/commitBtnCom'
import Cell from '@/components/commonCom/cell'
import FormCom from '@/components/commonCom/formCom'
import TextareaCom from '@/components/commonCom/textareaCom'
import BottomOptions from '@/modules/bottom-options/BottomOptions'
export default {
  components: {
    FormCom,
    Cell,
    CommitBtnCom,
    TextareaCom,
    BottomOptions,
    FormTitle
  },
  data () {
    return {
      title: '',
      content: '',
      type: '',
      classes: null,
      bottomOptionsShowA: false,
      bottomOptionsShowB: false,
      informType: [],
      classList: [],
      target_id: '0'
    }
  },
  created () {
    console.log('this.$parent', this.$parent.$parent)
    this.getClassmanage()
    if (this.$route.query.id > 0) {
      this.initData()
    } else {
      this.initType()
    }
  },
  computed: {
    classStr () {
      let { classes } = this
      return classes ? `${classes.grade_name} ${classes.class_name}` : ''
    }
  },
  methods: {
    initType () {
      let typeList = this.$route.params.type
      console.log('this.$route.params', this.$route.params)
      if (!typeList || typeList.length === 0) {
        this.$simpleMsg('初始化公告类型失败,无法提交公告')
      } else if (typeList.length === 1) {
        this.type = this.$route.params.type[0]
      } else if (typeList.length === 2) {
        this.informType = typeList
      }
      console.log('this.informType', this.informType)
    },
    initData () {
      let d = this.$route.query
      this.title = d.title
      this.type = d.target_id === '0' ? '学校公告' : '班级公告'
      this.content = d.content
    },
    // typeAction (item, i) {
    //   this.type = item
    //   this.bottomOptionsShowA = 0
    // },
    classAction (item, i) {
      this.classes = item
      this.bottomOptionsShowB = 0
    },
    commitBtnAction () {
      let { title, type, content, classes } = this
      if (!title) {
        this.$simpleMsg('请输入公告标题')
        return
      }
      if (!type) {
        this.$simpleMsg('请选择公告类型')
        return
      }
      if (type === '班级公告' && !classes) {
        this.$simpleMsg('请选择班级')
        return
      }
      if (!content) {
        this.$simpleMsg('请输入公告内容')
        return
      }
      this.post()
    },
    post () {
      let targetId = this.type === '学校公告' ? '0' : this.classes.class_id
      let d = {
        title: this.title,
        content: this.content,
        target_id: targetId,
        id: this.$route.query.id || '0'
      }
      this.$preloaderFull.show()
      return this.$axios.post(`/palm/v2/proclamation`, d).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          this.$simpleMsg('已提交')
          this.$router.replace({ name: 'dy-inform-mySend' })
        }
      })
    },
    getClassmanage () {
      this.$preloaderFull.show()
      return this.$axios.get(`/palm/v2/classmanage`).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          let d = data.result.grades
          this.classList = this.format(d)
          if (this.$route.query.id > 0) { // 编辑 && 初始化选中班级
            this.classes = this.classList.find(item => {
              return item.class_id === this.$route.query.target_id
            })
          }
        }
      })
    },
    format (arr) {
      let classes = []
      arr.forEach(grade => {
        grade.classes.forEach(item => {
          if (item.is_master === 'true') {
            item.grade_name = grade.grade_name
            classes.push(item)
          }
        })
      })
      return classes
    }
  }
}
</script>

<style scoped>
.FormCom {
  margin-top: 12px;
}
</style>


