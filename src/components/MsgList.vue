<template>
  <div class="msg_list">
    <div class="reply_title">
      <span>西柚回复你</span>
      <span>{{parentmsg.create_time | newtime}}</span>
    </div>

    <div class="reply_body">
      <div class="dot" :class="{bgdot:(isread || $store.getters.optisread)}"></div>
      <span>{{parentmsg.content}}</span>
    </div>
    <span class="reply_source">{{parentmsg.articleId.title}}</span>
  </div>
</template>
<style lang="scss">
.bgdot{
    background: #fff!important;
}
.msg_list {
  width: 62%;
  margin: 0 auto;
  background-color: #fff;
  padding: 37px 30px 30px 54px;
  border-bottom: 1px solid #cdcdcd;
  box-sizing: border-box;
  
  .reply_title {
    display: flex;
    justify-content: space-between;
    span {
      font-family: MicrosoftYaHei;
      font-size: 16px;
      color: #6f6f6f;
    }
  }
  .reply_body {
    font-family: MicrosoftYaHei;
    font-size: 16px;
    color: #333333;
    display: flex;
    align-items: center;
    transform: translateX(-20px);
    margin-top: 15px;
    .dot {
      background: #ff8000;
      border-radius: 50%;
      width: 10px;
      height: 10px;
    }
    span {
      margin-left: 10px;
    }
  }
  .reply_source {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    color: #6f6f6f;
    margin-top: 20px;
    display: block;
  }
}
</style>

<script>

export default {
  data() {
    return {
        isread:this.parentmsg.isRead
    };
  },
  methods: {
      
  },
  created(){
      
  },
  props: ["parentmsg"]
};
</script>