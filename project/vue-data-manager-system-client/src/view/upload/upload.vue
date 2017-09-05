<template>
    <div>
        <Tree :data="baseData"  @on-select-change="selectChange" class="tree"></Tree>
        <div class="demo-upload-list cl" v-for="item in uploadList">

            <template v-if="item.status === 'finished'">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
            </template>
            <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
        </div>

        <Button type="primary" @click="showModal1">显示对话框</Button>

        <!--//图片上传-->
        <modalCreate @getImgData="getImgData" :modal1="modal1"
                     @isHide="isHide"
                     :filt="filt"
        ></modalCreate>


        <Table border :columns="columns1" :data="data6"></Table>

        <Page :total="total" show-elevator :page-size="size" :current="current" @on-change="change"></Page>
        <!--<img src="http://localhost:3000/avatar-1503923417220.jpg" alt="">-->
    </div>
</template>
<script>
//    import tab from "../../common/table.js";
    import modalCreate from "./modal.vue";
    export default {
//        mixins:[tab],
        components:{
            modalCreate
        },
        data () {
            return {
                bigImg:"",//划过后的大图
                imgShow:false,//大图显时
                isShow:false,
                modal1:false,//上传按钮是否显示
                baseData:[],
                total:0,
                size:0,
                current:0,
                imgName: '',
                visible: false,
                uploadList: [],
                data6:[],
                filt:{
                    cateId:"",
                    page:1,
                    list:20
                },
                imgArr:[],
                columns1: [
                    {
                        title: '文件名',
                        key: 'filename',

                    },
                    {
                        title: '文件大小',
                        key: 'size'
                    },
                    {
                        title: '文件内容',
                        key: 'path',
                        width: 120,
                        render (h,params) {
                            return h('img',{
                                attrs:{
                                    src:`http://localhost:3000/${params.row.filename}`,
                                    width:50,
                                    height:50
                                }
                            });
                        }
                    },
                    {
                        title: '时间',
                        key: 'date'
                    },
                    {
                        title: '图片描述',
                        key: 'des'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                    this.removeImg(params.index)
                                }
                        }
            }, '删除')
            ])
            }
            }
        ],
            }
        },
        methods:{
            selectChange(nodes){
                this.filt.cateId = nodes[0]._id;
                this.getImgData();
            },
            getImgData(){
                this.$http.post("http://localhost:3000/uploads/list",this.filt)
                    .then(function(res){
                        this.total = res.data.total;
                        console.log(res)
//                        this.current = res.data.
                        this.current = res.data.page;
                        this.size = res.data.limit;
                        this.data6 = res.data.docs
                    }.bind(this))
            },
            mouseOver(e){
                console.log(e)
                this.imgShow = true;
                this.bigImg = e.target.childNodes[0].currentSrc
//                = e.target.currentSrc

            },
            mouseOut(){
                this.imgShow = false
            },

            removeImg(index){
                console.log(index)
                var id = this.data6[index]._id;
                this.$http.delete("http://localhost:3000/uploads/"+id).then((res)=>{
                    console.log(res)
                    this.getImg();
                })
            },
            getImg(){
                this.$http.post("http://localhost:3000/uploads/list",this.filt)
                    .then(function(res){
//                    this.imgArr = res.data.docs;
                        this.data6 = res.data.docs
                        console.log(res.data.docs)
                    }.bind(this))
            },

            change(page){
                this.filt.page = page;
                this.$http.post(`http://localhost:3000/uploads/list`,
                    this.filt).then(function(res){
                    this.data6 = res.data.docs;
                    this.total = res.data.total;
                    this.size=res.data.limit;
                    this.current = res.data.page;
                }.bind(this))
            },
            showModal1(){
                this.modal1 = true
            },
            isHide(options){
                if(options){
                    this.modal1 = false;
                }
            }
        },
        mounted () {
//            this.uploadList = this.$refs.upload.fileList;

            this.$http.get("http://localhost:3000/cate?type=3").then(function(res){
                this.baseData = res.data;
//                console.log(res.data)
                console.log(200)
            }.bind(this))
        },

        created(){
            this.getImgData();
        }
    }
</script>
<style>
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }

    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }


    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
    .img{width:100px;height:100px;margin:10px;}
    .imgShow{border:1px solid #999;position:absolute;left:300px;top:200px;}
    .imgShow img{width:500px;height:500px;}
    .tree{margin-left:20px;}
    .cl{margin-left:20px;}
</style>