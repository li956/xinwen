<template>
  <div>
    <ul class="com_list">
      <li>
        <span class="publish_time">{{parentmsg.create_time |newtime}}</span>
        <div class="publish_con">
          <span>{{parentmsg.content}}</span>
          <div>
            <img src="../assets/icon_thumb_down.png" alt>
            <span>{{parentmsg.against}}</span>
            <img src="../assets/icon_thumb_up.png" alt>
            <span>{{parentmsg.vote}}</span>
            <img src="../assets/icon_comment.png" alt>
          </div>
        </div>
        <div class="floor">
          <span v-show="flag">楼层被隐藏</span>
          <label for @click="open_floor()">
            {{btn_floor}}
            <img src="../assets/icon_arrow_down_color.png" v-if="flag">
            <img src="../assets/icon_arrow_up_color.png" v-else>
          </label>
          <div class="hidden_info" v-show="!flag">xxxxxxx</div>
        </div>
        <span class="publish_source">来自：{{parentmsg.articleId.title}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      flag:true,
      btn_floor:'展开'
    };
  },
  props:['parentmsg'],
  methods: {
    open_floor(){
        this.flag=!this.flag;
        if(this.btn_floor=='展开'){
            this.btn_floor='折叠';
        }else{
            this.btn_floor='展开';
        }
    }
  },
  created() {}
};
</script>
<style lang="scss" scoped>
.com_list {
  width: 788px;
  margin: 0 auto;
  
  list-style: none;
  background-color: #fff;
  li {
    box-sizing: border-box;
    padding: 21.5px 30.3px 30.6px 29.7px;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #dcdcdc;
    .publish_time {
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #6f6f6f;
    }
    .publish_con {
      display: flex;
      justify-content: space-between;
      margin-top: 12px;
      span {
        font-family: MicrosoftYaHei;
        font-size: 16px;
        color: #333333;
      }
      div {
        span {
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #6f6f6f;
          margin-left: 6px;
        }
        img {
          width: 24px;
          height: 24px;
          vertical-align: middle;
          margin-left: 20px;
        }
      }
    }
    .floor {
      margin-top: 20px;

      span {
        font-family: MicrosoftYaHei;
        font-size: 14px;

        color: #6f6f6f;
      }
      label {
        font-family: MicrosoftYaHei;
        font-size: 16px;
        color: #ff8000;
        float: right;
        cursor: pointer;
        img {
          width: 17px;
          height: 12px;
          vertical-align: middle;
        }
      }
      .hidden_info {
        margin-top: 20px;
        background: #f3f3f3;
      }
    }
    .publish_source {
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #6f6f6f;
      margin-top: 22px;
    }
  }
}
</style>

