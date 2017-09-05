
export default {
    data () {
        return {

            data1: [],
            total:0,
            size:0,
            current:1,
            modal1:false,
            isDel:false,
            index:0,//数组下标
            type:"add",//对话框处理的内容，默认是添加,
            obj:null,
            selection:[],//多选
            value13:"",
            filt:{
                page:"",
                limit:"4"
            },
            title:""
    }
    },
    created:function(){
        var page = 1;
        this.change(page);
        console.log("这是")
    },
    methods:{
        change(page){
            console.log(page);
            this.filt.page = page;
            this.$http.post(`http://localhost:3000/${this.module}/list`,
                this.filt).then(function(res){
                this.data1 = res.data.docs;
                this.total = res.data.total;
                console.log("数量："+res.data.total)
                this.size=res.data.limit;
                this.current = res.data.page;
                if(this.module == "comment"){
                    var _this = this;
                    this.title = this.newsContent.title
                    this.data1.forEach(function (val, index) {
                        val.title = _this.title
                    })
                }
            }.bind(this))
        },
        add(obj){
            this.data1.push(obj);
        },
        isShow(){
            this.modal1 = true;
            this.obj = {name: '',
                pwd: '',
                city: '',
                gender: '',
                interest: [],
                date: '',
                time: '',
                desc: ''}

            this.type= "add";
//                console.log(this.type)
        },
        hide(){
            this.modal1 = false;
        },
        edit (index) {
            this.modal1 = true;
            this.type = "updateData";
            this.index = index;
            this.obj =this.data1[this.index];
            // this.id = this.data1[this.index]._id;
            // this.obj = this.data
            this.formItem = this.obj
            this.formItem.id = this.data1[this.index]._id;
            // console.log(this.formItem)
            // this.formItem.cate
        },
        remove (index) {
            this.isDel = true;//确认框是否显示
            this.index = index
        },
        delectOptions(){
            console.log("删除")
            this.isDel = true;
        },
        ok(){
            if(this.selection.length == 0){
                var arr = this.data1;
                var id = arr[this.index]._id;
                //执行删除操作
                this.$http.delete(`http://localhost:3000/${this.module}/${id}`)
                    .then(function(res){

                        this.change(this.current);
                    }.bind(this))
            }else{
                var ids = [];
                for(var i=0;i<this.selection.length;i++){
                    ids.push(this.selection[i]._id);
                }
                this.$http.post(`http://localhost:3000/${this.module}/removes`,{
                    ids:ids
                })
                    .then(function(res){

                        this.change(this.current);
                    }.bind(this))
            }
        },
        cancel(){

        },
        selectAll(selection){//全选
            this.selection = selection;
        },
        selectionChange(selection){//多选
            this.selection = selection;
        },
        seach(){//搜索
//                this.value13
            this.$http.post("http://localhost:3000/${this.module}/list",{name:this.value13})
                .then(function(res){

                    this.data1 = res.data.docs
                }.bind(this))
        },
        onChange(){
//                this.value13

            this.$http.post(`http://localhost:3000/${this.module}/list`,{name:this.value13})
                .then(function(res){

                    this.data1 = res.data.docs
                }.bind(this))
        }

    },

}