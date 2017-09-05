<template>
    <div>
        <Tree  :data="baseData" @on-select-change="selectChange" class="tree"></Tree>
        <Input v-model="value13" placeholder="搜索" @input="onChange" class="search">
        <Button slot="append" icon="ios-search" @click="seach"></Button>


        </Input>



        <Table border :columns="columns1" :data="data1" @on-select-all="selectAll"
               @on-selection-change="selectionChange"></Table>
        <Page class="page" :total="total" show-elevator :page-size="size" :current="current" @on-change="change"></Page>

        <Button type="error" @click="delectOptions" class="btnDel">删除</Button>
        <Button type="primary" @click="isShow" class="btnAdd">添加</Button>


        <!--<modalCreate :isShow="modal1" @hide="hide" @add="add" :type="type"-->
                     <!--:obj="obj"-->
        <!--&gt;</modalCreate>-->
        <Modal
                v-model="isDel"
                title=""
                :mask-closable="false"
                :scrollable="true"
                @on-ok="ok"
                @on-cancel="cancel">
            <p>您确定删除吗？</p>

        </Modal>
        <Modal
                v-model="modal1"
                title="普通的Modal对话框标题"
                @on-ok="formSubmit"
                @on-cancel="cancel1"  width="800">
            <Form :model="formItem" :label-width="80">
                <Form-item label="分类">
                    <Input v-model="formItem.cate" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="标题">
                    <Input v-model="formItem.title" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="作者">
                    <Input v-model="formItem.author" placeholder="请输入"></Input>
                </Form-item>
                <!--<Form-item label="日期控件">-->
                    <!--<Row>-->
                        <!--<Col span="11">-->
                        <!--<Date-picker type="date" placeholder="选择日期" v-model="formItem.date"></Date-picker>-->
                        <!--</Col>-->
                        <!--<Col span="2" style="text-align: center">-</Col>-->
                        <!--<Col span="11">-->
                        <!--<Time-picker type="time" placeholder="选择时间" v-model="formItem.time"></Time-picker>-->
                        <!--</Col>-->
                    <!--</Row>-->
                <!--</Form-item>-->
                <Form-item label="内容">

                    <quill-editor v-model="formItem.content"
                                  ref="myQuillEditor"
                                  class="newsAdd">
                    </quill-editor>
                    <!--<Input v-model="formItem.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>-->
                </Form-item>


                <Form-item>

                    <!--<Button type="primary" @click="formSubmit">提交</Button>-->
                    <!--<Button type="ghost" style="margin-left: 8px">取消</Button>-->
                </Form-item>
            </Form>
        </Modal>
        <!--评论弹出层-->
        <Modal
                v-model="comm"
                title="写出你的评论"
                @on-ok="ok3"
                @on-cancel="cancel3"
        width="800">
            <commentModal :id="id" @hideComm="hideComm"></commentModal>
        </Modal>
        <!--评论列表弹出层-->
        <Modal
                v-model="cList"
                title="所有评论"
                @on-ok="ok2"
                @on-cancel="cancel2"
                width="800">
            <commentList :newsContent="newsContent" :newsCo="newsCon"></commentList>
        </Modal>
    </div>
</template>
<script>
    import tab from "../../common/table.js"
//    import modalCreate from "./modal.vue";
    import commentModal from "./commentModal.vue";
    import  commentList from "./commentList.vue";
//    console.log(commentModal)


    import { quillEditor } from 'vue-quill-editor'
    export default {
        mixins:[tab],
        data () {
            return {
                commArr:[],//评论列表
                id:"",//评论新闻的id
                baseData: [],
                module:"news",
                newsCon:null,
                type:4,
                modal1:false,
                dataComment:[],
                filtData:{
                    newsId:""
                },//单条新闻的评论列表
                newsContent:null,//单条新闻内容
                type:"",//是添加新闻还是修改新闻
                formItem: {
                    title:"",
                    author:"",
                    content:'',
                    cateId:"",
                    cate:"",
                    id:""
                },
                filt:{
                    newsId:""
                },
                comm:false,//评论弹出层的显时
                cList:false,//评论列表弹出层的显时
                i:0,
                columns1:[
                    {type: 'selection'},
                    {
                        title: '分类',
                        key: 'cate'
                    },
                    {
                        title: '标题',
                        key: 'title'
                    },
                    {
                        title: '作者',
                        key: 'author'
                    },
                    {
                        title: '内容',
                        key: 'content'
                    },
                    {
                        title: '评论条数',
                        key: 'commentCount'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 300,
                        align: 'center',
                        render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.edit2(params.index)
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.index)
                                    }
                                }
                            }, '删除'),


            h('Button', {
                props: {
                    type: 'primary',
                    size: 'small'
                },
                style: {
                    marginLeft: '5px',
                    marginRight:"5px"
                },
                on: {
                    click: () => {
                    this.comment(params.index)
            }
        }
        }, '评论'),


            h('Button', {
                props: {
                    type: 'primary',
                    size: 'small'
                },
                style: {
                    marginLeft: '5px',
                    marginRight:"5px"
                },
                on: {
                    click: () => {
                    this.commList(params.index)
            }
        }
        }, '评论列表')
                        ]);
                    }
                }

        ],
            }




        },
        components:{
//            modalCreate,
            commentModal,commentList,quillEditor
        },
        mounted(){
            console.log(100)
            this.$http.get("http://localhost:3000/cate?type=4").then(function(res){
                this.baseData = res.data;

//                getCommNum();

                console.log(200)
            }.bind(this))




        },
        methods:{
            isShow(){
                console.log("200")
                this.type = "add"
                var cate = this.formItem.cate;
                var cateId = this.formItem.cateId;
                this.formItem = {
                        title:"",
                        author:"",
                        content:'',
                        cateId:cateId,
                        cate:cate,
                        id:""
                }
                this.modal1 = true
            },
            formSubmit(){
//                /${this.formItem.cateId}

                if(this.type == "add"){
                    this.$http.post(`http://localhost:3000/news/data`,
                        this.formItem).then(function(res){
                        console.log(res);
                        console.log(400)
                        this.change();
                        this.modal1 = false;
                        this.formItem = {}
                        this.$Message.success('提交成功!');
                    }.bind(this))
                }else{
                    this.$http.put(`http://localhost:3000/news/data/${this.formItem.id}`,
                        this.formItem).then(function(res){
                        console.log(res);
                        console.log(500)
                        this.change();
                        this.modal1 = false;
                        this.formItem = {}
                        this.$Message.success('修改成功!');
                    }.bind(this))
                }

            },
            selectChange(nodes){
//                console.log(nodes[0]);
                this.formItem.cate = nodes[0].title;
                this.formItem.cateId = nodes[0]._id;
                this.filt.cateId = nodes[0]._id;
                this.change();
            },
//            getTableData(){
//                this.$http.post(`http://localhost:3000/news/list`)
//                    .then(function(res){
//                    console.log(res);
//                    console.log(res.data)
////                    this.data1 = res.data
//
//                }.bind(this))
//            },
            edit2(index) {
                this.modal1 = true;
                this.type = "updateData";
                this.index = index;
                this.obj =this.data1[this.index];
                // this.id = this.data1[this.index]._id;
                // this.obj = this.data
                this.formItem = this.obj
                this.formItem.id = this.data1[this.index]._id;
                this.type = "update"
                // console.log(this.formItem)
                // this.formItem.cate
            },
            comment(nodes){
                this.comm = true
                this.i = nodes
//                console.log(this.comm)
                this.id = this.data1[nodes]._id


                console.log("点击我")
            },
            commList(nodes) {
                this.newsContent = this.data1[nodes]
                console.log(1)
                console.log(this.newsContent)
                console.log(2)
                this.newsCon = Math.random()
                var data = this.data1[nodes]

                this.filt.newsId = data._id
                var title = data.title
//                this.$http.post("http://localhost:3000/comment/list",this.filt).then((res) => {
//                    this.dataComment = res.data.docs
//                    console.log(res)
//                    this.current = res.data.page;
//                    this.size = res.data.limit;
//                    this.total = res.data.total;
//                    this.dataComment.forEach(function (val, index) {
//                        val.title = title
//                    })
//
//                })
                this.cList = true


            },
            ok2(){

            },
            cancel2(){

            },
            ok1(){

            },
            cancel1(){

            },
            ok3(){

            },
            cancel3(){

            },
            hideComm(obj){
                this.comm = obj.isHide;
                var _this = this;
                if(obj.isCount){
                    this.data1.forEach(function(val,index){
                        if(index == _this.i){
                            val.commentCount++;
                            console.log("index:"+val.commentCount)
                        }
                    })

//                    var count = +this.data1.commentCount
//                    console.log(count)
//                    count++;
//                    this.data1.commentCount = count;
//                    console.log(count);
                }
            },
            getCommNum(){
                var data = this.data1;
                var _this = this;
                data.forEach(function(val,index){
                    var id = val._id;


                    (function(i){
                        _this.$http.post("http://localhost:3000/comment/list",{newsId:id})
                            .then((res)=>{
                            console.log(900)
//                            console.log(res)
//                        console.log(res.data.total)
                            _this.data1[i].number = res.data.total
                        console.log(_this.data1)
                        console.log(_this.data1[i].number)
                        })
                    })(index)
                })
            }
        },



    }
</script>
<style scoped>
    .newsAdd{
        height:200px;
        display:block;

    }
    .tree{margin-bottom:20px;margin-left:20px;}
    .search{width:500px;margin-bottom:20px;margin-left:300px;}
    .btnDel{width:120px;margin-left:500px;margin-bottom:20px;float:left;margin-top:30px}
    .btnAdd{width:120px;margin-left:30px;margin-bottom:20px;float:left;margin-top:30px;}
    .page{margin-top:30px;margin-bottom:30px;margin-left:20px;float:left;;}
</style>