<template>
  <div class="head" :class="{bgcolor:!flag,my_bg:this.$route.path=='/myaccount'}">
    <router-link class="logo" to="/newslist">
      <img :src="!flag? imgdefault1 : imgdefault2" class="logo_img">
      <span :class="flag? 'logo_span1':'logo_span2'">新闻项目</span>
    </router-link>
    <div class="head_right">
      <div class="index_info" v-if="user_flag">
        <router-link to="/login" :class="flag? 'index_link1' : 'index_link2'">登录</router-link>&nbsp;&nbsp;
        <router-link to="/regist" :class="flag? 'index_link1' : 'index_link2'">注册</router-link>
      </div>
      <div class="user_info" v-else>
        <img class="header" src="../assets/ico_header.jpg" alt>
        <span>{{user_name}}</span>
        <img class="arrow" src="../assets/icon_arrow_up_color.png">
        <div class="float_list">
          <ul>
            <li @click="to_my_account" >
              <img src="../assets/icon_my.png" alt>
              <span>我的账户</span>
            </li>
            <li @click="$router.push('/setting')">
              <img src="../assets/icon_setting.png" alt>
              <span>账户设置</span>
            </li>
            <li @click="to_login">
              <img src="../assets/icon_out.png" alt>
              <span>退出登录</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import imgdefault1 from "../assets/logo_white.png";
import imgdefault2 from "../assets/logo_color.png";
export default {
  data() {
    return {
      flag: true,
      user_flag: true,
      float_flag:true,
      user_name: "",
      imgdefault1,
      imgdefault2,
      
      
    };
  },
  methods: {
   
    to_my_account() {
      this.$router.push("/myaccount");
    },
    to_login() {
      localStorage.clear();
      this.$router.push("/login");
    },
    getUserInfo() {
      if (localStorage.user) {
        this.user_flag = false;
        var user = JSON.parse(localStorage.getItem("user"));
        this.user_name = user.nickname;
        console.log("111111");
      } else {
        this.user_flag = true;
      }
    },
    isFlag() {
      if (
        this.$route.path == "/login" ||
        this.$route.path == "/regist" ||
        this.$route.path == "/alterpwd"
      ) {
        this.flag = true;
        console.log("--------");
      } else {
        this.flag = false;
      }
    }
  },
  watch: {
    $route: function() {
      this.float_flag=true;
      this.isFlag();
      this.getUserInfo();
      
      
    }
  },
  created() {
    this.getUserInfo();
    this.isFlag();
  }
};
</script>
<style scoped lang='scss'>

.my_bg{
  background:rgba(0, 0, 0, 0)!important;
}
.index_link1 {
  color: #0074ff;
}
.index_link2 {
  color: #fff;
}
.head {
  width: 100%;
  height: 80px;
  min-width: 1200px;
  background: #fff;
}
.logo {
  margin-left: 130px;
  height: 80px;
  display: inline-block;
  font-size: 0px;
  line-height: 80px;
}
.logo_img {
  width: 120px;
  height: 38.7px;
  vertical-align: middle;
}
.logo_span1 {
  vertical-align: middle;
  margin-left: 32.7px;
  font-family: MicrosoftYaHei;
  font-size: 26px;
  color: #0074ff;
}
.logo_span2 {
  vertical-align: middle;
  margin-left: 32.7px;
  font-family: MicrosoftYaHei;
  font-size: 26px;
  color: #ffffff;
}
.head_right {
  font-family: MicrosoftYaHei;
  font-size: 20px;
  float: right;
  width: 255px;
  height: 80px;
  line-height: 80px;
}
.user_info {
  display: flex;
  align-items: center;
  cursor: pointer;
  .header {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  span {
    margin-left: 15px;
    font-family: MicrosoftYaHei;
    font-size: 18px;
    color: #ffffff;
  }
  .arrow {
    margin-left: 8.2px;
    width: 15px;
    height: 13px;
    transition: 300ms;
  }
}
.bgcolor {
  background: #0074ff;
}
.float_list {
  position: absolute;
  opacity: 0;
  transition: 500ms;
  top: 60px;
  right: 127.6px;
  width: 140px;
  box-sizing: border-box;
  background-color: #fff;
  z-index: -1;
  box-shadow: -2px -2px 3px 1px rgba(39, 52, 101, 0.08),
    2px 2px 3px 1px rgba(39, 52, 101, 0.08);
  ul {
    list-style: none;

    li {
      line-height: 59px;
      text-align: center;
      font-size: 0;
      cursor: pointer;
      img {
        width: 22px;
        height: 20px;
        vertical-align: middle;
      }
      span {
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #333333;
        vertical-align: middle;
        margin-left: 12px;
      }
    }
    li:hover {
      background-color: #0074ff;
      span {
        color: #ffffff;
      }
      img {
        filter: invert(100%);
      }
    }
  }
}
.user_info:hover .float_list {
  opacity: 1;
  transform: translateY(20px);
  z-index: 999 !important;
}
.user_info:hover .arrow {
  transform: rotate(180deg);
}
.float_list:hover .arrow {
  transform: rotate(180deg);
}
</style>
