<template>
  <div class="comment_box">
    <img src="../assets/ico_header.jpg" class="com_header">
    <div class="com_main">
      <div class="com_head">
        <span class="name">{{commentItem[commentId].user.nickname}}</span>
        <span class="time">{{commentItem[commentId].create_time | newtime}}</span>
        <label>{{level}}楼</label>
      </div>
      <div class="publish_con">
        <span>{{commentItem[commentId].content}}</span>
        <div>
          <img src="../assets/icon_thumb_down.png" alt>
          <span>{{commentItem[commentId].against}}</span>
          <img src="../assets/icon_thumb_up.png" alt>
          <span>{{commentItem[commentId].vote}}</span>
          <img src="../assets/icon_comment.png" alt>
        </div>
      </div>
    </div>
    <div class="com_child">
      <com-child v-if="level-1>0" :level="level-1" :childlist='childlist' :commentItem='commentItem'></com-child>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.com_child{
  margin-left: 88px;
  margin-top: 20px;
  background: #f3f3f3;

}
.comment_box {
  
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  border-bottom: 2px solid #dcdcdc;
  box-sizing: border-box;
  padding-bottom: 40px;
  width: 100%;
  .com_header {
    width: 58px;
    height: 58px;
    border-radius: 50%;
  }
  .com_main {
    margin-left: 12px;
    width: 780px;
    .com_head {
      .name {
        font-family: MicrosoftYaHei;
        font-size: 16px;
        color: #6f6f6f;
      }
      .time {
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #6f6f6f;
        margin-left: 24px;
      }
      label {
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #333333;
        float: right;
      }
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
        display: flex;
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
  }
}
</style>
<script>
import CommentChild from "../components/CommentChild.vue";
import { getComment } from "../api/example.js";
export default {
  data() {
    return {
      commentId: this.commentIds.split(",")[this.level - 1],
      childlist:[]
    };
  },
  methods: {
  //获取要传给子组件的id数组
    get_child_list(){
      this.childlist=this.commentIds.split(",");
      this.childlist.pop();
      
    }
  },
  created() {
    this.get_child_list();
  },
  props: ["commentItem", "commentIds", "level"],
  components: {
    "com-child": CommentChild
  }
};
</script>
