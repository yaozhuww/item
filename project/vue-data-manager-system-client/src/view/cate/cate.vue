<template>
    <div>
        <Button :type="typeCate == 1? 'primary' : ''" @click="changeCate(1)">日志分类</Button>
        <Button :type="typeCate == 2? 'primary' : ''" @click="changeCate(2)">上传分类</Button>
        <Button :type="typeCate == 3? 'primary' : ''" @click="changeCate(3)">相册分类</Button>
        <Button :type="typeCate == 4? 'primary' : ''" @click="changeCate(4)">新闻分类</Button>
        <Input v-model="value" v-on:keyup.enter="keyUp" placeholder="请输入..." style="width: 300px"></Input>
        <Button type="primary" @click="add" >添加</Button>
        <Button type="primary" @click="addRootNode">添加根节点</Button>
        <Button type="primary" @click="update">修改</Button>
        <Button type="primary" @click="remove">删除</Button>
        <Tree :data="baseData" @on-select-change="selectChange"></Tree>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                typeCate:1,
                baseData: [],
                formValidate:{
                    title:"",
                    type:1,
                    parentId:null
                },
                value:"",
                currentId:"",
                currentParentId:""
            }
        },
        methods:{
            changeCate(type){
                this.typeCate = type;
                this.formValidate.type=type;
                this.getTreeData();
            },
            getTreeData(){
                console.log(this.typeCate)
                this.$http.get("http://localhost:3000/cate?type="+this.typeCate).then(function(res){
                    this.baseData = res.data;
                }.bind(this))
            },
            add(){
                if(this.value==""){
                    this.$Message.info("请输入添加的名字");
                }else{
                    this.formValidate.title = this.value;
                    this.$http.post("http://localhost:3000/cate/data",this.formValidate)
                        .then(function(res){
                            this.getTreeData();
                            this.value = ""
                        }.bind(this))
                }

            },
            selectChange(nodes){
                this.formValidate.parentId = nodes[0]._id;
                this.currentId = nodes[0]._id;
                this.currentParentId = nodes[0].parentId;
            },
            addRootNode(){
                if(this.value == ""){
                    this.$Message.info("请输入添加的名字")
                }else{
                    this.formValidate.parentId = null;
                    this.add();
                }

            },
            update(){
                if(this.value == ""){
                    this.$Message.info("请输入修改后名字")
                }else{
                    this.formValidate._id = this.currentId;
                    this.formValidate.parentId = this.currentParentId;
                    this.formValidate.title = this.value;
                    this.$http.put(`http://localhost:3000/cate/data/${this.currentId}`,
                        this.formValidate)
                        .then(function(res){
                            this.getTreeData();
                            this.value= ""
                        }.bind(this))
                }
            },
            remove(){
                this.$http.delete(`http://localhost:3000/cate/${this.currentId}`)
                    .then(function(res){
                        this.getTreeData();
                    }.bind(this))
            },
            key(e){
                console.log("熬着了")
                console.log(e)
            }
        },
        created(){
            this.getTreeData();
        }
    }
</script>
<style>

</style>