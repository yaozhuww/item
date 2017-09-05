<template>
    <div class="layout-content-main">
        <Input v-model="value13" placeholder="搜索" @input="onChange">
            <!--<Select  slot="prepend" style="width: 80px">-->
            <!--</Select>-->
        <Button slot="append" icon="ios-search" @click="seach"></Button>
        </Input>

        <Table class="table" border :columns="columns1" :data="data1" @on-select-all="selectAll"
               @on-selection-change="selectionChange"></Table>
        <Page class="page" :total="total" show-elevator :page-size="size" :current="current" @on-change="change"></Page>
        <Button type="primary" @click="isShow" class="add">添加</Button>
        <Button type="error" @click="delectOptions" class="del">删除</Button>
        <modalCreate :isShow="modal1" @hide="hide" @add="add" :type="type"
        :obj="obj"
        ></modalCreate>
        <Modal
                v-model="isDel"
                title=""
                :mask-closable="false"
                :scrollable="true"
                @on-ok="ok"
                @on-cancel="cancel">
            <p>您确定删除吗？</p>

        </Modal>
    </div>
</template>
<script>
    import tab from "../../common/table.js";
    import modalCreate from "./modal.vue"
    export default {
        mixins:[tab],
            data(){
            return {
                module:"users",
                obj:null,
                columns1:[
                    {type: 'selection'},
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '密码',
                        key: 'pwd'
                    },
                    {
                        title: '城市',
                        key: 'city'
                    },
                    {
                        title: '爱好',
                        key: 'interest'
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
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                    this.edit(params.index)
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
            }, '删除')
            ]);
            }
            }

            ],
            }
        },
        components:{
            modalCreate:modalCreate
        }

    }
</script>
<style scoped>
    .add{margin-top:10px;margin-left:20px;margin-right:50px;width:120px;}
    .del{margin-top:10px;width:120px;}
    .page{margin-top:20px;margin-bottom:20px;}
    .table{margin-top:20px;}
</style>