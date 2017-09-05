
<template>
  <div class="layout" v-if="login">
    <Row type="flex">
      <i-col span="5" class="layout-menu-left">
        <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">
          <div class="layout-logo-left"></div>
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-navigate" tag="span"></Icon>
              首页
            </template>
          </Submenu>
          <Submenu name="2">
          <template slot="title">
              <Icon type="ios-keypad"></Icon>
              <router-link to="/user" activeClass="active">用户</router-link>
          </template>
          </Submenu>


          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-keypad"></Icon>
              <router-link to="/cate" activeClass="active">分类</router-link>
            </template>
          </Submenu>


          <Submenu name="4">
            <template slot="title">
              <Icon type="ios-analytics"></Icon>
              <router-link to="/news" activeClass="active">新闻</router-link>
            </template>
          </Submenu>

          <Submenu name="5">
            <template slot="title">
              <Icon type="ios-analytics"></Icon>
              <router-link to="/upload" activeClass="active">上传</router-link>
            </template>
          </Submenu>

          <Submenu name="5">
            <template slot="title">
              <Icon type="ios-analytics"></Icon>
              <span @click="exit">退出登录</span>
            </template>
          </Submenu>
        </Menu>
      </i-col>
      <i-col span="19">
        <div class="layout-header"></div>
        <div class="layout-breadcrumb">
          <Breadcrumb>
            <Breadcrumb-item href="#">首页</Breadcrumb-item>
            <Breadcrumb-item href="#">应用中心</Breadcrumb-item>
            <Breadcrumb-item>某应用</Breadcrumb-item>
          </Breadcrumb>
        </div>
        <div class="layout-content">
            <router-view></router-view>
        </div>
        <div class="layout-copy">
          2011-2016 &copy; TalkingData
        </div>
      </i-col>
    </Row>
  </div>
  <Login v-else></Login>
</template>
<script>
  import Login from "./view/login/login.vue";
  import {mapGetters,mapActions} from "vuex";
    export default {
        data(){
            return {

            }
        },
        computed:{
            ...mapGetters(['login'])
        },
//        methods:{
//            ...mapActions(['checkLogin'])
//        },
        methods:{
          exit(){
              this.$store.dispatch("checkLogin",false)
            }
        },
        components:{
            Login
        }
    }
</script>
<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    height:700px;
  }
  .layout-breadcrumb{
    padding: 10px 15px 0;
  }
  .layout-content{
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
  .layout-content-main{
    padding: 10px;
  }
  .layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
  .layout-menu-left{
    background: #464c5b;
    height:700px;
  }
  .layout-header{
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }
  .active{color:red}
</style>