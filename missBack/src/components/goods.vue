<template>
    <div style="width:100%;height:100%" class="out">
        <div >
            <el-header style="font-size: 12px" >
                <div style="text-align:left">
                    <el-select v-model="value" placeholder="请选择类别" ref="msgtype">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value" filterable remote>
                            <span style="float: left">{{ item.label }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                        </el-option>
                    </el-select>
                    <el-input v-model="input" placeholder="请输入内容" style="width:30%;margin-right:1%" ref="msgval"></el-input>
                    <el-button type="primary" round @click="findMsg()">查询</el-button>
                    <el-button round @click="back()" v-if="backdata">返回</el-button>
                </div>                
            </el-header>
            <el-main v-loading="loading" style="line-height:0;padding:0;width:100%">
                <div style="text-align:center;height:60px;line-height:60px;">
                    商品列表
                    <el-button type="primary" round style="margin-top:-10px" @click="openAdd()">添加</el-button>                
                </div>
                <el-table :data="tableData" style="width: 100%" height="380">
                    <el-table-column prop="goodsname" label="商品名称" width="180"></el-table-column>
                    <el-table-column prop="price" label="价格" width="180"></el-table-column>
                    <el-table-column prop="count" label="数量" width="180"></el-table-column>
                    <el-table-column prop="num" label="商品编号" width="180"></el-table-column>
                    <el-table-column prop="goodslogo" label="图片" width="180">
                        <template slot-scope="scope">
                                <img :src= "'http://localhost:5000/public/upload/'+tableData[scope.$index].goodslogo" style="width:50px;height:50px" />
                        </template>    
                    </el-table-column>
                    <el-table-column label="编辑" width="180">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>    
                    </el-table-column>                    
                </el-table>
                <el-pagination layout="total,sizes,prev, pager, next, jumper" :total="totalCount" style="margin-top:20px"
                 :current-page.sync="currentpage" :page-sizes="[2,3,4,5]" :page-size="pagesize"
                 @size-change="handleSizeChange" @current-change="handleCurrentChange" ></el-pagination>
                 
            </el-main>
        </div>
        <el-dialog :title="titleName" :visible.sync="dialogFormVisible" center >
            <form enctype="multipart/form-data" @submit.prevent="addmember" id="myform">
                <div>
                    <label class="el-form-item__label" style="width: 120px;">商品名称</label>
                    <input class="el-input el-input__inner" v-model="form.goodsname" autofocus name="goodsname" auto-complete="off" style="width: 60%; margin-bottom: 30px;"/>
                </div>
                <div>
                    <label class="el-form-item__label" style="width: 120px;">价格</label>
                    <input class="el-input el-input__inner" v-model="form.price" name="price" auto-complete="off" style="width: 60%; margin-bottom: 30px;"/>
                </div>
                <div>
                    <label class="el-form-item__label" style="width: 120px;">数量</label>
                    <input class="el-input el-input__inner" v-model="form.count" name="count" auto-complete="off" style="width: 60%; margin-bottom: 30px;"/>
                </div>
                <div>
                    <label class="el-form-item__label" style="width: 120px;">商品编号</label>
                    <input class="el-input el-input__inner" v-model="form.num" name="num" auto-complete="off" style="width: 60%; margin-bottom: 30px;"/>
                </div>
                <div>
                    <label class="el-form-item__label" style="width: 120px;">上传文件</label>
                    <input type='file' accept="image/png,image/gif,image/jpeg" id="load_img" name="logo" auto-complete="off"  style="margin-top: 10px;"></input>
                </div>
                <div v-if="goodsimg" class="oldimg">
                    <label class="el-form-item__label" style="width: 120px;">原图片</label> 
                    <img :src=image style="width:50px;height:50px" />
                </div>
            </form>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <button type="submit" form="myform" class="btn" >确 定</button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return {
            backdata: false,
            loading: true,
            currentpage: 1,
            pagesize: 4,
            input: '',
            totalCount: 0,
            dialogFormVisible: false,
            titleName: '',
            goodsimg: false,
            image: '',
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            tableData: [],
            type: '',
            list : [],
            findlist: [],
            value: '',
            options: [
                {
                    label: '商品名称',
                    value: 'goodsname'
                },
                {
                    label: '价格',                    
                    value: 'price',
                },
                {
                    label: '数量',
                    value: 'count',
                }
            ]
        }
    },
    methods: { 
        //查询
        findMsg(){
            var key = this.$refs.msgtype.value,
                val = this.$refs.msgval.value
            this.loading = true
             axios.get('api/goods/findGoods',{ params: {key, val} })
                    .then((res) => {
                        this.loading = false
                        this.backdata = true
                        this.findlist = res.data.data.result;
                        console.log(this.findlist)
                        this.tableData = this.findlist.slice(0,this.pagesize); 
                        console.log(this.tableData)                        
                        this.totalCount = this.findlist.length
                    })
        },
        //返回
        back(){
            this.backdata = false
            this.showlist()
        },
        handleSizeChange(size){
            this.pagesize = size
            this.tableData = this.list.slice((this.currentpage-1)*this.pagesize, this.pagesize*this.currentpage )            
        },
        handleCurrentChange(){
            if(this.backdata){
                this.tableData = this.findlist.slice((this.currentpage-1)*this.pagesize, this.pagesize*this.currentpage )                
            }else{
                this.tableData = this.list.slice((this.currentpage-1)*this.pagesize, this.pagesize*this.currentpage )
            }
        },
        //请求全部信息
        showlist(){
            axios({
                url: '/api/goods/list'
            }).then((res) => {
                this.list = res.data.data.result;
                this.tableData = this.list.slice(0,this.pagesize);  
                this.totalCount = this.list.length
                this.currentpage = 1
                setTimeout(() => {
                    this.loading = false
                },1000)
            })
        },
        //打开添加框
        openAdd(){
            this.dialogFormVisible = true
            this.goodsimg = false
            this.form.goodsname = ''
            this.form.price = ''
            this.form.count = ''
            this.form.num = ''
            this.form.goodslogo = ''            
            this.type = 'add'
        },
        //打开修改框
        handleEdit(index, row) {
            this.dialogFormVisible = true
            this.type = 'update'
            this.goodsimg = true
            this.form.goodsname = row.goodsname
            this.form.price = row.price
            this.form.count = row.count
            this.form.num = row.num
            this.image = "http://localhost:5000/public/upload/" + row.goodslogo            
        },
        //删除此条数据
        handleDelete(index, row) {
            axios.get('api/goods/deleteGoods',{ params: { num: row.num } })
                 .then((res) => {
                     if(res.data.data.success){
                        this.$message('删除成功');
                        var ws = new WebSocket('ws://127.0.0.1:9000/')
                        ws.onopen = function () {
                            ws.send('删除东西了')
                        }
                        ws.onmessage = function (event) {
                            if(event.data){
                                that.showlist()               
                            }
                        }
                         //判断是否查询过，查询过，即在查询页删除，执行查询函数，反之，也就是在主列表页删除，则重新请求数据
                         if(this.backdata){
                             this.findMsg()
                         }else{
                             this.showlist()
                         }
                         this.backdata = false
                     }
                 })
        },
        //添加表单数据
        addmember(e) {
            if(this.type == 'add'){
                var formdata = new FormData(e.target);
                axios({
                    url: 'api/goods/addMsg',
                    method: 'post',
                    data: formdata
                }).then((res) => {
                    var that = this
                    if(res.data.data.success){
                        this.$message('信息添加成功');
                        this.dialogFormVisible = false
                        if(this.backdata){
                            this.findMsg()
                        }else{
                            this.showlist()
                        }
                        var ws = new WebSocket('ws://127.0.0.1:9000/')
                        ws.onopen = function () {
                            ws.send(tableData)
                        }
                        ws.onmessage = function (event) {
                            if(event.data){
                                that.showlist()               
                            }
                        }
                    }else{
                        this.$message('信息输入有误');                    
                    }
                    
                })
            }else{
                var formdata = new FormData(e.target);                
                axios({
                    url: 'api/goods/updateMsg',
                    method: 'post',
                    data: formdata
                }).then((res) => {
                    if(res.data.data.success){
                        var that = this
                        this.$message('信息修改成功');
                        this.dialogFormVisible = false
                        var ws = new WebSocket('ws://127.0.0.1:9000/')
                        ws.onopen = function () {
                            ws.send('修改东西了')
                        }
                        ws.onmessage = function (event) {
                            if(event.data){
                                that.showlist()                
                            }
                        }
                        if(this.backdata){
                             this.findMsg()
                         }else{
                             this.showlist()
                         }
                    }else{
                        this.$message('信息输入有误');                    
                    }
                })
            }
        }
        
    },
    mounted() {
        var ws = new WebSocket('ws://127.0.0.1:9000/'), that = this
        // ws.onopen = function () {
            // ws.send('大家好')
        // }
        ws.onmessage = function (event) {
            if(event.data){
                that.showlist()               
            }
        }
        this.showlist()
    }
}
</script>
<style lang="scss">
    .btn{
        padding: 8px 23px;
        color: #fff;
        background-color: #409EFF;
        border-color: #409EFF;
        cursor: pointer;
    }
    .el-table th>.cell{
        text-align: center;
    }
    .oldimg{
        margin: 10px 0;
    }
    .dialog-footer{
        text-align: center;
    }
</style>
