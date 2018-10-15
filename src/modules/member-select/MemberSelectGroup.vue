<!-- <template>
<dl class="m-group" :class="{unfold:isUnfold}">
  <dt class="m-tit" v-click="itemClickDept" :class="{selected:isAllSelect}">
    <span class="iconfont m-arrow">&#xe606;</span>
    <span class="g-name">{{groupData.name}}</span>
    <div class="select-box-p" v-show="isMultiple">
      <span class="select-box">
        <i class="iconfont m-i">&#xe63e;</i>
      </span>
    </div>
  </dt>
  <dd>
    <ul class="m-list" v-click="itemClickMember" ref="eList">
      <li class="m-item" v-for="(member, index) of memberList" v-show="keywordTest(filterName, member.name)" :key="member.user_id" :data-index="index" :class="{selected: isMultiple?selectedItems[member.user_id]:selectedIdsDict[member.user_id]}">
        <span class="m-ava def"> -->
          <!-- <img class="img" src="@/assets/imgs/ava3.png"> -->
        <!-- </span>
        <span class="m-name">{{member.name}}</span>
        <span class="select-box">
          <i class="iconfont m-i">&#xe63e;</i>
        </span>
      </li>
    </ul>
  </dd>
</dl>
</template>-->
<script>
import scopeElementsPlus from '@/modules/corejs/dom/scope-elements-plus'
import {keywordTest} from '@/modules/search/keyword-test'
import SelectAllHandle from './select-all-handle'
export default {
  mixins: [SelectAllHandle],
  props: {
    type: String,
    // groupData 数据不考虑会变
    groupData: {
      type: Object,
      default: null
    },
    selectedIdsDict: Object,
    filterName: String
  },
  data () {
    return {
      // id 对应提交数据。缓存，实现不再重新创建提交数据
      // 在 selectAllSet 中被初始
      allItems: {},

      isSearch: false,
      isUnfold: false
    }
  },
  render (h) {
    let list = []
    let {isMultiple, filterName, selectedItems, selectedIdsDict} = this
    let isExist = false
    this.memberList.forEach((member, index) => {
      let isShow = keywordTest(filterName, member.name)
      if (isShow) isExist = true
      let userId = member.user_id
      list.push(<li v-show={isShow} key={userId} data-index={index} class={['m-item', {selected: isMultiple ? selectedItems[userId] : selectedIdsDict[userId]}]}>
        <span class="m-ava def">
        </span>
        <span class="m-name">{member.name}</span>
        <span class="select-box">
          <i class="iconfont m-i">&#xe63e;</i>
        </span>
      </li>)
    })
    return <dl class={['m-group', {unfold: this.isUnfold || (this.isSearch && isExist)}]}>
      <dt v-click={this.itemClickDept} class={['m-tit', {selected: this.isAllSelect}]}>
        <span class="iconfont m-arrow">&#xe606;</span>
        <span class="g-name">{this.groupData.name}</span>
        <div class="select-box-p" v-show={this.isMultiple}>
          <span class="select-box">
            <i class="iconfont m-i">&#xe63e;</i>
          </span>
        </div>
      </dt>
      <dd>
        <ul class="m-list" v-click={this.itemClickMember} ref="eList">
          {list}
        </ul>
      </dd>
    </dl>
  },
  computed: {
    memberList () {
      return this.groupData.member_list
    },
    isMultiple () {
      return this.type === 'multiple'
    }
  },
  created () {
    this.selectAllSet()
  },
  methods: {
    itemClickDept ({target}, {elm}) {
      scopeElementsPlus(target, elm, {
        '.select-box-p': elem => {
          if (this.isAllSelect) {
            this.selectAllRemove()
          } else {
            this.selectAll()
          }
          this.$emit('changeMultiple')
        },
        '.m-tit': (elem) => {
          this.isUnfold = !this.isUnfold
        }
      })
    },
    itemClickMember ({target}, {elm}) {
      scopeElementsPlus(target, elm, {
        '.m-item': elem => {
          let member = this.memberList[elem.dataset.index]
          if (this.isMultiple) {
            this.selectAllSelect(this.groupData, member)
            this.$emit('changeMultiple')
          } else {
            let id = member.user_id
            this.$emit('selectSingle', id, this.allItems[id])
          }
        }
      })
    }
  },
  watch: {
    selectedIdsDict () {
      if (this.isMultiple) {
        this.selectAllSet()
      }
    },
    filterName (v) {
      this.isSearch = Boolean(v)
    }
  }
}
</script>

<style lang="postcss" scoped>
  .m-group {
    margin: 0 10px 0;
    .m-tit {
      height: 44px;
      padding: 12px 12px 0 8px;
      box-sizing: border-box;
      color: #999;
    }
    .m-list {
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
      overflow: hidden;
      transition: height 0.3s ease;
      display: none;
    }
    .m-item {
      height: 52px;
      /* padding-top: 12px; */
      padding-top: 9px;
      margin: 0 12px;
      box-sizing: border-box;
      border-top: 1PX solid #ddd;
      &:first-child {
        border-top:0
      }
    }

    .m-arrow {
      display: inline-block;
      transition: 0.3s ease;
      transform: rotate(90deg);
    }

    &.unfold {
      .m-arrow {
        transform: rotate(-90deg);
      }
      .m-list {
        display: block;
      }
    }

    .g-name {
      font-size: 14px;
      padding-left: 6px;
    }
    .m-name {
      font-size: 16px;
      padding: 8px 0 0 16px;
      display: inline-block;
    }
    .m-ava{
      width: 36px;
      height: 36px;
      /* display: inline-block; */
      float: left;
      .img{
        width: 100%;
        height: 100%;
      }
      &.def{
        background-image:url('@/assets/imgs/ava3.png');
        background-size: 100% auto;
      }
    }

    /* 加大点击范围 */
    .select-box-p {
      float: right;
      padding: 6px;
      margin: -6px -6px 0 0;
    }
    .select-box {
      float: right;
      width: 22px;
      height: 22px;
      border: 1PX solid #c2c2c2;
      border-radius: 50%;
      box-sizing: border-box;
      color: #fff;
      padding: 2px 0 0 3px;

      .m-i {
        opacity: 0;
        font-size: 14px;
      }
    }
    .selected .select-box {
      background-color: #57a1e6;
      border-color: #57a1e6;
    }
    .selected .select-box .m-i{
      opacity: 1
    }

    .m-tit .select-box {

    }
    .m-item .select-box {
      margin-top: 6px;
    }
  }

</style>
