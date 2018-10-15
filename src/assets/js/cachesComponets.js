
/*
 缓存组件
managerIndexClass ----> 组件'@/components/classManager/managerIndex.vue'
classBehavior ----> 组件'@/components/classManager/classBehavior/classBehaviorDetail.vue'
schoolBehaviorIndex ----> 组件'@/components/morality-manager/pages/schoolBehaviorDetails/schoolBehaviorIndex.vue'
classMore ----> 组件'@/components/classManager/pages/more.vue' '@/components/morality-manager/pages/schoolEntryDetails/more.vue'
indexWrapper ----> 组件'@/components/morality-manager/moralityShowIndex.vue'
*/
function toStr () {
  return [
    'index', 'homePage', 'acordClass', 'acordDormitory', 'acordSchoolSystem', 'classBehavior',
    'schoolBehaviorIndex', 'managerIndexClass', 'indexWrapper', 'classMore'
  ].join(',')
}
const cachCompoents = toStr()
export default cachCompoents
