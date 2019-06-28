<template>
  <div class="setting">
    <div class="main_box">
      <div class="head">
        <span>账户设置</span>
      </div>
      <div class="body">
        <input type="file" id="files" @change="get_header">
        <label for="files" class="show_file">
          <img :src='file' alt>
          <div class="black_screen"></div>
          <span>文件上传</span>
        </label>
        <span>{{name}}</span>
        <div>
          <label>昵称</label>
          <input type="text" v-model="new_name">
        </div>
        <div>
          <label>手机号</label>
          <span>150****2759</span>
        </div>
        <div>
          <label>密码</label>
          <span>********</span>
          <button>修改</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      new_name:'',
      file:''
    };
  },
  methods: {
    get_account() {
      var user = JSON.parse(localStorage.getItem("user"));
      this.name = user.nickname;
      this.new_name=this.name;
    },
    get_header(event){
       var file=event.target.files[0];
       var img_reader=new FileReader;
       img_reader.onload=e=>{
           if(this.file){
               this.file='';
               console.log(this.file)
           }
        this.file=e.target.result;
           
       }
       img_reader.readAsDataURL(file);
    }
  },
  created() {
    this.get_account();
  },
  
};
</script>
<style lang="scss" scoped>
#files {
  position: absolute;
  left: -999px;
}
.setting {
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  .main_box {
    background-color: #fff;
    margin-top: 83px;
    box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.11);
    padding-bottom: 99px;
    box-sizing: border-box;
    margin-bottom: 215px;
    .head {
      width: 1032px;
      height: 72px;
      border-bottom: 1px solid #dcdcdc;
      overflow: hidden;
      span {
        display: block;
        font-family: MicrosoftYaHei;
        font-size: 20px;
        color: #333333;
        padding-left: 30px;
        box-sizing: border-box;
        border-left: 5px solid #0074ff;
        margin-top: 23.5px;
      }
    }
    .body {
      display: flex;
      flex-direction: column;
      align-items: center;
      .show_file{
        width: 104px;
        height: 104px;
        border-radius: 50%;
        margin-top: 33px;
        background: url("../assets/ico_header.jpg");
        background-size: 100% 100%;
        position: relative;
        img {
          width: 104px;
          height: 104px;
          border-radius: 50%;
        }
        span {
          position: absolute;
          width: 104px;
          height: 18px;
          font-size: 16px;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          text-align: center;
          color:white;
          opacity: 0;
        }
        .black_screen {
          position: absolute;
          opacity: 0;
          width: 104px;
          height: 104px;
          border-radius: 50%;
          background: rgba(34, 38, 41, 0.3);
          top: 0;
          left: 0;
          margin: 0;
        }
      }
      .show_file:hover span{
          opacity: 1;
      }
      .show_file:hover .black_screen{
           opacity: 1;
      }
      span {
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #333333;
        margin-top: 15px;
      }
      div {
        font-size: 16px;
        display: flex;
        color: #333333;
        margin-top: 40px;
        width: 376px;
        label {
          line-height: 38px;
          width: 48px;
        }
        span {
          margin: 0;
          margin-left: 35px;
          line-height: 38px;
        }
        input {
          width: 296px;
          height: 38px;
          text-indent: 1em;
          margin-left: 35px;
          box-sizing: border-box;
          border: 1px solid #6f6f6f;
        }
        button {
          background-color: #ff8000;
          width: 110px;
          height: 36px;
          margin-left: 100px;
          outline: none;
          font-size: 16px;
          color: #ffffff;
          letter-spacing: 2px;
        }
      }
    }
  }
}
</style>
