<template>
  <div id="app">
    <el-container>
        <el-header>
            <heads></heads>
        </el-header>
      <el-main style="padding:0">
          <el-container style="height: 100%; border: 1px solid #eee">
            <el-aside width="200px" style="background-color: rgb(208, 201, 246);text-align:left">
                <el-menu > 
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-message"></i>账户</template>
                        <el-menu-item-group>
                            <template slot="title">管理员</template>
                            <el-menu-item @click="showUserMsg" index="1-1">个人信息</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-menu"></i>商品信息</template>
                            <el-menu-item index="2-1" @click="showGoodsList()">商品信息</el-menu-item>
                    </el-submenu>
                    <!-- <el-submenu index="3">
                        <template slot="title"><i class="el-icon-setting"></i>导航三</template>
                        <el-menu-item-group>
                            <template slot="title">分组一</template>
                            <el-menu-item index="3-1">选项1</el-menu-item>
                            <el-menu-item index="3-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                            <el-menu-item index="3-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="3-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="3-4-1">选项4-1</el-menu-item>
                        </el-submenu>
                    </el-submenu> -->
                </el-menu>
            </el-aside>
            <el-container>
                <router-view></router-view>
            </el-container>
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>
<script>
    import heads from './header.vue';
    import person from './person.vue'
    import goods from './goods.vue'    
    import axios from 'axios'
    export default {
        methods:{
            showGoodsList(){
                this.$router.push('/index/Goods')
            },
            showUserMsg(){
                this.$router.push('./Person')
            }
        },
        components: {
            heads,
            goods,
            person
        },
        mounted() {
                var ws = new WebSocket('ws://127.0.0.1:9000/')

                ws.onopen = function () {
                    ws.send('大家好')
                }
                
                ws.onmessage = function (event) {
                    console.log(event)
                    // var chatroom = document.querySelector('#chatroom')
                    // chatroom.innerHTML += '<br />' + event.data
                }
        }
    }
</script>
<style lang="scss">
     @import "../scss/login.scss";
</style>
