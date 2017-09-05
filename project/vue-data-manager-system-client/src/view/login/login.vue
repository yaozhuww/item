<template>
    <div class="layout">
        <div class="layout-ceiling">
            <div class="system_name">欢迎登录后台管理系统</div>
            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline
                  class="login_form"

            >
                <Form-item prop="user">
                    <Input type="text" v-model="formInline.name" class="iptUser"
                           placeholder="请输入用户名">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </Form-item>
                <br />
                <Form-item prop="password">
                    <Input type="password"
                           v-model="formInline.pwd" placeholder="请输入密码" class="iptPwd">
                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </Form-item>
                <br />
                <Form-item>
                    <Button type="primary" @click="handleSubmit('formInline')"
                            class="login_btn" style="width:184px;"
                    >
                        登录
                    </Button>
                </Form-item>

            </Form>
        </div>
    </div>
</template>
<script>
    import md5 from "crypto-js/md5"
    export default {
        data () {
            return {
                formInline: {
                    name: '',
                    pwd: ''
                },
                ruleInline: {
//                    user: [
//                        { required: true, message: '请填写用户名', trigger: 'blur' }
//                    ],
//                    password: [
//                        { required: true, message: '请填写密码', trigger: 'blur' },
//                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
//                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.formInline.pwd =md5(this.formInline.pwd).toString()

//                this.$refs[name].validate((valid)=>{
//
//                    if (valid) {
                        console.log(200)
                        this.$http.post("http://localhost:3000/users/list",this.formInline)
                            .then((res)=>{
                            console.log(res)
                            if(res.data.docs.length != 0){
                                this.$store.dispatch("checkLogin",true);
                            }
                        })
//                        this.$Message.success('提交成功!');
//                    } else {
//                        this.$Message.error('表单验证失败!');
//            }
//            })
            }
        }
    }
</script>
<style scoped>
    .ivu-form-inline{
        height:100%;
    }
    .login_form{
        height:500px;
        margin:0 auto;
        text-align: center;
        margin-top:50px;
    }

    .system_name{
        width:100%;
        color:#fff;
        text-align: center;
        font-size:30px;
        margin-top:50px;
    }
    .layout{
        border: 1px solid #d7dde4;
        background: #fff;
        position: fixed;
        left:0;
        right:0;
        top:0;
        bottom:0;
        margin:auto;
        border-radius: 4px;
        overflow: hidden;
        width:400px;
        height:400px;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        /*background: #5b6270;*/
        background: #fff;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        /*color: #9ea7b4;*/
        color: #fff;
    }
    .layout-ceiling{
        background:#ccc;
        padding: 10px 0;
        overflow: hidden;
    }
    .layout-ceiling-main{
        float: right;
        margin-right: 15px;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .iptUser{background:#fff}
    .iptPwd{background:#fff}
</style>