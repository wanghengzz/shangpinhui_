<template>
  <div>
    <!-- 三级联动:已经注册为全局组件,因此不需要引入了 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"></Floor>
    <Floor></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import TypeNav from '../../components/TypeNav/index.vue';
import ListContainer from './ListContainer/index.vue';
import Recommend from './Recommend/index.vue';
import Rank from './Rank/index.vue';
import Like from './Like/index.vue';
import Floor from './Floor/index.vue';
import Brand from './Brand/index.vue';
import { mapState } from 'vuex';
export default {
    components: { TypeNav, ListContainer, Recommend, Rank, Like, Floor, Brand },
    mounted(){
      // 派发action，获取floor数据
      this.$store.dispatch('getFloorList')
    },
    computed:{
      ...mapState({
        floorList:state=>state.home.floorList
      })
    }
}
</script>

<style>

</style>