<template>
    <div>
        <Modal
                :value="isShow"
                title="普通的Modal对话框标题"
                @on-ok="ok"
                @on-cancel="cancel">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <Form-item label="姓名" prop="name">
                    <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
                </Form-item>
                <Form-item label="密码" prop="mail">
                    <Input v-model="formValidate.pwd" placeholder="请输入密码"></Input>
                </Form-item>
                <Form-item label="城市" prop="city">
                    <Select v-model="formValidate.city" placeholder="请选择所在地">
                        <Option value="beijing">北京市</Option>
                        <Option value="shanghai">上海市</Option>
                        <Option value="shenzhen">深圳市</Option>
                    </Select>
                </Form-item>
                <!--<Form-item label="选择日期">-->
                    <!--<Row>-->
                        <!--<Col span="11">-->
                        <!--<Form-item prop="date">-->
                            <!--<Date-picker type="date" placeholder="选择日期" v-model="formValidate.date"-->
                                         <!--&gt;</Date-picker>-->
                        <!--</Form-item>-->
                        <!--</Col>-->
                        <!--<Col span="2" style="text-align: center">-</Col>-->
                        <!--&lt;!&ndash;<Col span="11">&ndash;&gt;-->
                        <!--&lt;!&ndash;&lt;!&ndash;<Form-item prop="time">&ndash;&gt;&ndash;&gt;-->
                            <!--&lt;!&ndash;&lt;!&ndash;<Time-picker @on-change="timeChange" type="time" placeholder="选择时间" v-model="formValidate.time"></Time-picker>&ndash;&gt;&ndash;&gt;-->
                        <!--&lt;!&ndash;&lt;!&ndash;</Form-item>&ndash;&gt;&ndash;&gt;-->
                        <!--&lt;!&ndash;</Col>&ndash;&gt;-->
                    <!--</Row>-->
                <!--</Form-item>-->
                <!--<Form-item label="性别" prop="gender">-->
                    <!--<Radio-group v-model="formValidate.gender">-->
                        <!--<Radio label="male">男</Radio>-->
                        <!--<Radio label="female">女</Radio>-->
                    <!--</Radio-group>-->
                <!--</Form-item>-->
                <Form-item label="爱好" prop="interest">
                    <Checkbox-group v-model="formValidate.interest">
                        <Checkbox label="吃饭"></Checkbox>
                        <Checkbox label="睡觉"></Checkbox>
                        <Checkbox label="跑步"></Checkbox>
                        <Checkbox label="看电影"></Checkbox>
                    </Checkbox-group>
                </Form-item>
                <Form-item label="介绍" prop="desc">
                    <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                </Form-item>
                <Form-item>
                    <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                    <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                </Form-item>
            </Form>
        </Modal>
    </div>
</template>
<script>
    import md5 from "crypto-js/md5"
    export default {
        data:function(){
            return {
                id:"",
                formValidate: {
                    name: '',
                    pwd: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    pwd: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: '请选择城市', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: '至少选择一个爱好', trigger: 'change' },
                        { type: 'array', max: 2, message: '最多选择两个爱好', trigger: 'change' }
                    ],
//                    date: [
//                        { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
//                    ],
//                    time: [
//                        { required: true, type: 'date', message: '请选择时间', trigger: 'change' }
//                    ],
                    desc: [
                        { required: true, message: '请输入个人介绍', trigger: 'blur' },
                        { type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur' }
                    ]
                },
                blankObj:{name: '',
                    pwd: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''}
            }
        },
        props:["isShow","type","obj"],
        updated:function(){


            if(this.type == "updateData"){

                this.id = this.obj._id;
                this.formValidate = this.obj
            }else{
                this.formValidate = this.obj
            }
        },
        methods:{
            ok(){
                this.$emit("hide")
            },
            cancel(){
                this.$emit("hide")//向父元素发送事件
            },

            handleSubmit (name) {
                console.log("更新")
                this.formValidate.pwd =md5(this.formValidate.pwd).toString()
                console.log(this.formValidate.time)
                this.$refs[name].validate((valid) => {
                    console.log("zheshi")
                    if (valid) {
                        console.log("300")
                        if(this.type == "updateData"){

                            this.$http.put(`http://localhost:3000/users/data/${this.id}`,
                                this.formValidate).then(function(res){
                                    console.log(res);
                                    console.log(200)
                                    this.formValidate = {}
                            }.bind(this))
                            console.log("到这里")
                        }else{
                            console.log(this.formValidate)
                            this.$http.post("http://localhost:3000/users/data",
                                this.formValidate)
                                .then(function(res){
                                    console.log(res)
                                    //向父元素传送本次添加的该编辑的数据
                                    this.$emit("add",res.data)
                                }.bind(this))
                            this.$Message.success('提交成功!');
                        }

                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.formValidate = {}
                this.$refs[name].resetFields();
            },
            timeChange(time){
                console.log(time)
            }
        }
    }
</script>