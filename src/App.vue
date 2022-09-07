<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在home、search显示的，在登录、注册隐藏 v-show="$route.path=='/home'||$route.path=='/search'"（不推荐）-->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'
export default {
  components: {
    Header,
    Footer
  },
  // 所有的APP组件只会执行一次
  // 在APP组件中只会向发服务器发送一次请求（相当于程序一运行起来就发送一次且只发送一次请求）
  mounted() {
    // 通知vuex发送请求，获取数据存储于仓库之中
    this.$store.dispatch('categroyList')
  }
}
</script>

<style >
</style>