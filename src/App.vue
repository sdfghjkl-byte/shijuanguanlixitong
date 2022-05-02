
<template>
  <div id="app">
    <index v-if="this.$store.state.userName!==''"></index>
    <longin v-else></longin>
  </div>
</template>

<script>
// 项目入口文件
  import index from './view/index'
  import longin from './view/longin'
export default {
  components: {
    index,
    longin
  },
  name: 'App'   //export 了名为App的组件，main.js就可以找到它了
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body{
  margin:0;
  padding:0;
}
</style>
