<template>
  <div id="app">
    <el-container>
        <el-header>
            <heads></heads>
        </el-header>
      <el-main>欢迎使用每日优鲜后台管理系统</el-main>
    </el-container>
  </div>
</template>

<script>
// export default {
//      methods: {
//       open3() {
//         this.$prompt('请输入邮箱', '提示', {
//           confirmButtonText: '确定',
//           cancelButtonText: '取消',
//           inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
//           inputErrorMessage: '邮箱格式不正确'
//         }).then(({ value }) => {
//           this.$message({
//             type: 'success',
//             message: '你的邮箱是: ' + value
//           });
//         }).catch(() => {
//           this.$message({
//             type: 'info',
//             message: '取消输入'
//           });       
//         });
//       }
//     }
// }
import heads from './header.vue';
    export default {
        /*props:[
                'fromParent'
        ],*/
        components:{
            heads
        }
    }
</script>

<style lang="scss">
    @import "../scss/login.scss";
</style>
