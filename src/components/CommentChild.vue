<template>
  <div class="child_box">
    <img src="../assets/ico_header.jpg" class="com_header">
    <div class="com_main">
      <div class="com_head">
        <span class="name">{{commentItem[id].user.nickname}}</span>
        <span class="time">{{commentItem[id].create_time | newtime}}</span>
        <label>{{level}}楼</label>
      </div>
      <div class="publish_con">
        <span>{{commentItem[id].content}}</span>
        <div>
          <img src="../assets/icon_thumb_down.png" alt>
          <span>{{commentItem[id].against}}</span>
          <img src="../assets/icon_thumb_up.png" alt>
          <span>{{commentItem[id].vote}}</span>
          <img src="../assets/icon_comment.png" alt>
        </div>
      </div>
    </div>
    <commentBox
      :class="level-1==0?'cmbox':'cmbox1'"
      v-if="level-1>0"
      :level="level-1"
      :childlist="child_list"
      :commentItem="commentItem"
    ></commentBox>
    
  </div>
</template>
<style lang="scss" scoped>
.cmbox {
  padding-top: 20px;
  box-sizing: border-box;
}
.cmbox1{
    padding-top: 20px;
  box-sizing: border-box;
  border: 1px solid #333333;
}
.child_box {
  width: 760px;
  display: flex;
  flex-wrap: wrap;
}
.com_header {
  width: 58px;
  height: 58px;
  border: 1px solid #333333;
  border-radius: 50%;
}
.com_main {
  margin-left: 12px;
  width: 680px;
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
</style>
<script>
import CommentChild from "../components/CommentChild.vue";
export default {
  name: "commentBox",
  data() {
    return {
      id: this.childlist[this.level-1],
      child_list: []
    };
  },
  methods: {
    //获取要传给子组件的id数组
    get_child_list() {
      this.child_list = this.childlist;

      this.child_list.pop();
    },
    ceshi() {
      console.log(this.level);
    }
  },
  created() {
    this.get_child_list();
    this.ceshi();
  },
  props: ["commentItem", "level", "childlist"],
  components: {
    "com-child": CommentChild
  }
};
</script>
