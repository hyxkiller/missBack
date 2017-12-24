<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="18"><div class="grid-content bg-trans"></div></el-col>
            <div>
                <el-col :span="6"  v-if="showBtn">
                    <div class="grid-content bg-purple"  @click="openLogin">
                        <el-button type="text">登录</el-button>
                    </div>
                </el-col>
                <div v-else>
                    <el-col :span="4" class="grid-content bg-purple">
                        <el-button type="text">{{username}}</el-button>                    
                    </el-col>
                    <el-col :span="2" class="grid-content bg-purple">
                        <el-button type="text" @click="logout">注销</el-button>
                    </el-col>
                </div>
            </div>
        </el-row>
        <transition name="el-fade-in-linear">
            <div class="dialog" v-if="showLogin">
                <div class="loginPage" div v-show="show">
                    <h1>登录</h1>
                    <b @click="closeLogin">X</b>
                    <el-form>
                        <el-form-item label="user">
                            <el-input type="text" id="user" v-model="formName.user" @blur="inputBlur('user',formName.user)"></el-input>
                            <p>{{formName.userError}}</p>
                        </el-form-item>
                        <el-form-item label="password">
                            <el-input type="password" id="password" v-model="formName.password" @blur="inputBlur('password',formName.password)"></el-input>
                            <p>{{formName.passwordError}}</p>
                        </el-form-item>
                        <el-button type="primary" @click="submitForm('formName')" v-bind:disabled="formName.beDisabled">提交</el-button>
                        <el-button @click="resetForm">重置</el-button>
                    </el-form>              
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data () {
            return {
                show:true,
                showLogin: false,
                showBtn: true,
                username: '',
                formName: {//表单中的参数
                    user: '',
                    userError: '',
                    password: '',
                    passwordError: '',
                    beDisabled: true
                }
                // beShow: false//传值给父组件
            }           
        },
    methods: {
            openLogin(){
              this.showLogin = true
            },
            closeLogin(){
              this.showLogin = false
            },
            resetForm(){
                this.formName.user = '';
                this.formName.userError = '';
                this.formName.password = '';
                this.formName.passwordError = '';
            },
            logout(){
                axios({
                    url: 'api/users/logout'
                }).then(res => {
                    if(res.data.data.logout){
                        this.$router.push('/login')          
                    }
                })
            },
            submitForm(formName){
                //与父组件通信传值
                //this.$emit('showState', [this.beShow,this.formName.user])
                //提交user password
                var that = this;
                var user = this.formName.user,
                    password = this.formName.password;
                axios({
                    method: 'post',
                    url: '/api/users/signIn',
                    data: {
                        username: user,
                        password: password
                    }
                    }).then(function(res){
                        if(res.data.data.login){
                            that.showLogin = false;
                            that.showBtn = false;
                            axios({
                                url: 'api/users/isLogin',
                                method: 'get'
                            }).then((res) => {
                                if(res.data.data.login){
                                    that.showBtn = false;
                                    that.username = res.data.data.username
                                    that.$router.push('/index')                        
                                }
                            })                   
                        }else{
                            that.$alert('您没有权限', '警告', {
                                confirmButtonText: '确定'
                                // callback: action => {
                                //     this.$message({
                                //     type: 'info'
                                //     });
                                // }
                            });
                        }
                     })
                    .catch(function(){

                    })
            },
            inputBlur(errorItem,inputContent){
                if (errorItem === 'user') {
                    if (inputContent === '') {
                        this.formName.userError = '用户名不能为空'
                    }else{
                        this.formName.userError = '';
                    }
                }else if(errorItem === 'password') {
                    if (inputContent === '') {
                        this.formName.passwordError = '密码不能为空'
                    }else{
                        this.formName.passwordError = '';
                    }
                }
                //对于按钮的状态进行修改
                if (this.formName.user != '' && this.formName.password != '') {
                    this.formName.beDisabled = false;
                }else{
                    this.formName.beDisabled = true;
                }
            }
        },
        mounted(){
            axios({
                url: 'api/users/isLogin',
                method: 'get'
            }).then((res) => {
                if(res.data.data.login){
                    this.showBtn = false;
                    this.username = res.data.data.username
                    this.$router.push('/index/Person')                        
                } else {
                    this.$router.push('/login')
                }
            })
        }
}
</script>

<style lang="scss">
    @import '../scss/header.scss'
</style>

