<template>
  <div>
    <div class="bg_content">
      <div class="shade"></div>
      <div class="bg_login">
        <label class="login">登录</label>
        <div class="input">
          <input
            type="text"
            placeholder="手机号/用户名"
            v-model="login_account"
            @blur="check_account"
            autofocus="true"
          >
          <label>{{tip1}}</label>
        </div>
        <div class="input">
          <input type="password" placeholder="密码" v-model="login_pwd" @blur="check_pwd">
          <label>{{tip2}}</label>
        </div>
        <button class="to_login" @click="to_login">登录</button>
        <div class="link_frame">
          <router-link to="/alterpwd" class="to_regist">忘记密码?</router-link>
        </div>

        <div class="login_footer">
          <router-link class="span" to="/regist">还没有APIS账号吗?</router-link>
          <button @click="go_regist">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getLoginInfo } from "../api/example.js";
export default {
  data() {
    return {
      login_account: "",
      login_pwd: "",
      tip1: "",
      tip2: ""
    };
  },
  methods: {
    check_account() {
      if (this.login_account) {
        var reg = /^1[34578]\d{9}$/;
        if (!reg.test(this.login_account)) {
          this.tip1 = "手机号码格式不正确!";
          return false;
        } else {
          this.tip1 = "";
          return true;
        }
      } else {
        this.tip1 = "请输入手机号!";
        return false;
      }
    },
    check_pwd() {
      if (this.login_pwd) {
        var reg = this.login_pwd.length;
        if (reg >= 6 && reg <= 20) {
          this.tip2 = "";
          return true;
        } else {
          this.tip2 = "密码必须是6~20位!";
          return false;
        }
      } else {
        this.tip2 = "请输入密码!";
        return false;
      }
    },
    go_regist() {
      this.$router.push("/regist");
    },
    to_login() {
      if (this.check_account() && this.check_pwd()) {
        //调用引入的接口

        getLoginInfo(this.login_account, this.login_pwd).then(res => {
          if (res.data.code === "success") {
            localStorage.setItem("user", JSON.stringify(res.data.data.account));
            localStorage.setItem("token", res.data.data.account.token);
            this.$router.push("/newslist");
          }
        });
        this.login_account = "";
        this.login_pwd = "";
      }
    }
  }
};
</script>
<style scoped lang="scss">
.bg_content {
  background: url("../assets/bg_sign.png");
  background-size: 100% 100%;
  height: 860px;
  width: 1275px;
  position: relative;
}
.shade {
  width: 50%;
  height: 66%;
  background: rgba(17, 60, 124, 1);
  position: absolute;
  left: 590.1px;
  top: 107.4px;
}
.bg_login {
  width: 568px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.24);
  box-shadow: 6px 6px 14px 5px rgba(39, 52, 101, 0.08);
  position: absolute;
  left: 580px;
  top: 107.8px;
  box-sizing: border-box;
  .login {
    font-family: MicrosoftYaHei;
    font-size: 36px;
    color: #ffffff;
    text-align: center;
    margin-top: 44.2px;
    margin-bottom: 35px;
    display: block;
  }
  .input {
    width: 380px;
    height: 74px;
    input {
      width: 380px;
      height: 56px;
      font-family: MicrosoftYaHei;
      font-size: 16px;
      color: #9b9b9b;
      box-sizing: border-box;
      text-indent: 20px;
    }
    label {
      font-size: 10px;
      color: red;
      display: block;
    }
  }
  .link_frame {
    width: 380px;
    text-align: right;
    margin-top: 20px;
  }
}

.to_login {
  margin-top: 24px;
  width: 380px;
  height: 53px;
  background: #ff8000;
  border-color: #ff8000;
  outline: none;
  font-family: MicrosoftYaHei;
  font-size: 20px;
  color: #ffffff;
  cursor: pointer;
}
.to_regist {
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: #ffffff;
}
.login_footer {
  width: 100%;
  height: 76px;
  border-top: 1px solid #fff;
  padding: 0 20px;
  align-items: center;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  .span {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    color: #ffffff;
  }
  button {
    background: #ffffff;
    font-family: MicrosoftYaHei;
    font-size: 20px;
    color: #0d407e;
    width: 66px;
    height: 41px;
    cursor: pointer;
  }
}
</style>

