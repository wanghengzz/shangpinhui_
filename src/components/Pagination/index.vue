<template>
  <div class="pagination">
    <button :disabled="PageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-if="startNumAndEndNum.start>1"  @click="$emit('getPageNo',1)" :class="{active:pageNo==1}">1</button>

    <button  v-if="startNumAndEndNum.start>2">....</button>

    <button v-for="(page,index) in startNumAndEndNum.end" :key="index" v-show="page>=startNumAndEndNum.start" @click="$emit('getPageNo',page)" :class="{active:pageNo==page}">{{page}}</button>

    <button v-if="startNumAndEndNum.end<totalPage-1">...</button>

    <button v-if="startNumAndEndNum.end<totalPage" @click="$emit('getPageNo',totalPage)" :class="{active:pageNo==totalPage}">{{totalPage}}</button>
    <button :disabled="PageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>
    <button>共 {{total}}条</button>

  </div>
</template>

<script>
export default {
  name: 'Pagniation',
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  // 计算属性
  computed: {
    // 计算出总共多少页
    totalPage() {
      // ceil向上取整
      return Math.ceil(this.total / this.pageSize)
    },
    // 计算出连续的页页码起始数据与结束数据
    startNumAndEndNum() {
      const { continues, pageNo, totalPage } = this
      let start = 0,
        end = 0
      // 连续页码5【至少五页】
      if (continues > totalPage) {
        // 总页数少于连续页数
        start = 1
        end = totalPage
      } else {
        // 正常现象
        start = pageNo - parseInt(continues / 2)
        end = pageNo + parseInt(continues / 2)
        // 如果start算出来结果小于1
        if (start < 1) {
          start = 1
          // 这里的continues是字符串不是数字
          end =Number(continues)
        }
        if (end > totalPage) {
          end = totalPage
          start = totalPage - continues + 1
        }
      }
      return { start, end }
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  margin-left: 400px;
  .active{
    background-color: skyblue;
  }
  button {
    min-width: 30px;
    height: 25px;
    margin: 0 3px;
    background-color: white;
    border: 1px solid rgb(179, 178, 178);
  }
}
&.active{
  background-color: skyblue;
}
</style>