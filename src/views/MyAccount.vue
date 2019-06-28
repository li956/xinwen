<template>
  <div class="myaccount">
    <img class="my_background" src="../assets/bg_my.png" alt>
    <div class="fixed_box">
      <ul>
        <li @click="item_flag=1">
          <div :class="{item_active:item_flag==1}">我的评论</div>
        </li>
        <li @click="item_flag=2">
          <div :class="{item_active:item_flag==2}">我的消息 {{count}}</div>
        </li>
      </ul>
    </div>
    <div class="float_label" @click="set_read()" v-show="item_flag==2">
      <img src="../assets/icon_sign.png">
      <label>全部标为已读</label>
    </div>
    <div class="main_body">
      <img src="../assets/ico_header.jpg" class="header">

      <com-list
        v-show="item_flag==1"
        v-for="(item,index) of my_com_list"
        :key="index"
        :parentmsg="item"
      ></com-list>
      <msg-list
        v-show="item_flag==2"
        v-for="item of my_msg_list"
        :key="item.commentId"
        :parentmsg="item"
      ></msg-list>
    </div>
  </div>
</template>
<script>
import { getMyMessage, getMyComment,getMsgTip,getMsgRead } from "../api/example.js";
import ComList from "../components/ComList";
import MsgList from "../components/MsgList";
export default {
  data() {
    return {
      item_flag: 1,
      com_page: 1,
      msg_page: 1,
      token: "",
      my_com_list: [],
      my_msg_list: [],
      count:'',
      
    };
  },
  methods: {
      //设置消息已读
      set_read(){
          getMsgRead(this.token).then(res=>{
        if ((res.data.code = "success")) {
          this.$store.commit('changeisread');
          this.count = 0;
        }
    });
      },
    //获取token
    get_token() {
      this.token = localStorage.getItem("token");
    },
    //获取我的评论
    get_mycomment() {
      getMyComment(this.token, this.com_page, 3).then(res => {
        if ((res.data.code = "success")) {
          var data = res.data.data;
          this.my_com_list = data.comments;
        }
      });
    },
    //获取我的消息
    get_mymessage() {
      getMyMessage(this.token, this.msg_page, 3).then(res => {
        if ((res.data.code = "success")) {
          var data = res.data.data;
          this.my_msg_list = data.comments;
        }
      });
    }
  },

  created() {
    this.get_mycomment();
    this.get_mymessage();
    getMsgTip(this.token).then(res=>{
        if ((res.data.code = "success")) {
          
          this.count = res.data.count;
        }
    });
  },
  components: {
    "com-list": ComList,
    "msg-list": MsgList
  }
};
</script>
<style lang="scss" scoped>
.item_active {
  border-left: solid 5px #ff8000 !important;
  color: #ff8000 !important;
}
.myaccount {
  width: 100%;
  .float_label {
      width:120px;
      cursor: pointer;
    img {
      width: 21px;
      height: 21px;
      vertical-align: middle;
    }
    label{cursor: pointer;}
    position: absolute;
    top: 440px;
    left: 910px;
  }
  .fixed_box {
    position: absolute;
    left: 76px;
    top: 465px;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.12);
    background-color: #ffffff;
    ul {
      list-style: none;
      li {
        padding: 17.5px 0;
        width: 132px;
        cursor: pointer;
        div {
          font-family: MicrosoftYaHei;
          line-height: 25px;
          width: 132px;
          padding: 0 25px;
          font-size: 14px;
          color: #333333;
          letter-spacing: 0;
          box-sizing: border-box;
          border-left: solid 5px #fff;
          border-right: solid 5px #fff;
        }
      }
      li:hover div {
        border-left: solid 5px #ff8000;

        color: #ff8000;
      }
    }
  }
  .my_background {
    width: 100%;
    min-width: 1271px;
    height: 334px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  .main_body {
      
    width: 100%;
    background-color: #f9f9f9;
    margin-top: 254px;
    .header {
      display: block;
      width: 128px;
      height: 128px;
      border-radius: 50%;
      margin: 0 auto;
      transform: translateY(-64px);
    }
  }
}
</style>
