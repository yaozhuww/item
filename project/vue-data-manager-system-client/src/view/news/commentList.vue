<template>
    <div>
        <Table highlight-row :columns="columns3" :data="data1"></Table>
        <Page :total="total" show-elevator :page-size="size" :current="current" @on-change="change"></Page>
    </div>
</template>
<script>
    import tab from "../../common/table.js";
    export default {
        mixins:[tab],
        props:['newsContent','newsCo'],
        data () {
            return {
                columns3: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '新闻标题',
                        key: 'title'
                    },
                    {
                        title: '评论内容',
                        key: 'content'
                    },
                    {
                        title: '时间',
                       'key':"date"
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
                                    this.rem(params.index)
                            }
                    }
            }, '删除'),



        ]);
        }
        }
                ],
                filt:{
                    newsId:""
                },
                module:"comment",
                data1:[],
                total:0,
                size:0,
                current:0

            }
        },
        watch:{
            newsCo() {
                console.log("20")
//                console.log(this.)
                this.filt.newsId = this.newsContent._id
                var title = this.newsContent.title
                this.$http.post("http://localhost:3000/comment/list",this.filt).then((res) => {
                    this.data1 = res.data.docs
                console.log(900)
                console.log(res)
                this.current = res.data.page;
                this.size = res.data.limit;
                this.total = res.data.total;
                this.data1.forEach(function (val, index) {
                    val.title = title
                })
            })
            },
            data1(){
                console.log("0000")
                this.data1.forEach(function(val,index){
                    var time = val.date;
                    var now = new Date();
                    now.setTime(time);
                    var y = now.getFullYear();
                    var m = now.getMonth() + 1;
                    var d = now.getDate();
                    var h = now.getMonth();
                    var min = now.getMinutes();
                    var sec = now.getSeconds();
                    m = m < 10 ? "0" + 0 : m ;
                    d = d < 10 ? "0" + 0 : d ;
                    h = h < 10 ? "0" + 0 : h ;
                    min = min < 10 ? "0" + 0 : min ;
                    sec = min < 10 ? "0" + 0 : sec ;
                    val.date = `${y}-${m}-${d}  ${h}:${min}:${sec}`;
                })
            }
        },
        methods:{
//            chan(page){
//                console.log(page);
//                this.filt.page = page;
//                this.$http.post(`http://localhost:3000/${this.module}/list`,
//                    this.filt).then(function(res){
//                    this.data1 = res.data.docs;
//                    this.total = res.data.total;
//                    this.size=res.data.limit;
//                    this.current = res.data.page;
//                }.bind(this))
//            },
            rem(index){
                console.log(index);
                var id = this.data1[index]._id
                this.$http.delete(`http://localhost:3000/comment/${id}`)
                    .then(function(res){

                    }.bind(this))
            }
        }

    }
</script>