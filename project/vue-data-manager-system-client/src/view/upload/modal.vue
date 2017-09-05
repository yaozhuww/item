<template>
    <div>
        <Modal
                :value="modal1"
                title="普通的Modal对话框标题"
                @on-ok="ok"
                @on-cancel="cancel">
        <Upload
                ref="upload"
                name="avatar"
                :show-upload-list="false"
                :default-file-list="defaultList"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                multiple
                type="drag"
                :action="uploadUrl"
                style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
            <Icon type="camera" size="20"></Icon>
            </div>
        </Upload>
            <!--<img :src="item.url" class="img">-->
            <!--<img :src="http://localhost:3000/avatar-1503923417220.jpg" alt="">-->
        <Input v-model="imgData.des" type="textarea" :rows="4"
               placeholder="请输入图片的描述" ></Input>
        </Modal>

        
    </div>

</template>
<script>
    export default {
        props:['modal1','filt'],
        data(){
            return {
                defaultList: [
                    {
                        'name': 'a42bdcc1178e62b4694c830f028db5c0',
                        'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                    },
                    {
                        'name': 'bc7521e033abdd1e92222d733590f104',
                        'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                    }
                ],
//                filt:{
//                    cateId:"",
//                    page:1,
//                    list:20
//                },
                item:{
                  url:"http://localhost:3000/e5ae90cb8c753aba61a23d07603133f0.png"
                },
                value6:"",
                uploadList:[],
                imgData:{
                    des:""
                },
                obj:{}
            }
        },
        methods:{
            handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove (file) {
                // 从 upload 实例删除数据
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);

            },
            handleSuccess (res, file) {
                console.log("200")
                console.log("400")
                this.$Message.success('这是一条成功的提示');
                console.log(res)
                this.obj = res;
                console.log(res.filename)
                var _this = this

                    _this.item.url = `http://localhost:3000/${res.filename}`
//                },1000)
                console.log("300")
//                this.$emit("getImgData")
//                this.getImgData();
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                });
            },
            handleBeforeUpload () {
                const check = this.uploadList.length < 5;

                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 5 张图片。'
                    });
                }
                return check;
            },
            ok(){
                var des = this.imgData.des;
                var id = this.obj._id
                this.$http.put(`http://localhost:3000/uploads/data/${id}`,{des:des})
                    .then((res)=>{
                    this.$emit("getImgData")
                    this.$emit("isHide",true)
                    this.imgData.des = "";
                })

            },
            cancel() {
                this.$emit("isHide", true)
            }
        },
        computed:{
            uploadUrl(){
                return `http://localhost:3000/uploads/filedata/${this.filt.cateId}`
            }
        },
    }
</script>
<style scoped>
    .img{width:60px;height:60px;float:left;margin-top:-0px;}
</style>