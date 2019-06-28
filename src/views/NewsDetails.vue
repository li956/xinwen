<template>
  <div class="news_detailes">
    <div class="float_box">
      <div class="up_box">
        <div>
          <img src="../assets/icon_comment_color.png" alt>
          <span>{{detail_list.comment_sum}}</span>
        </div>
        <div>
          <img src="../assets/icon_saw_color.png" alt>
          <span>2200</span>
        </div>
      </div>
      <img src="../assets/icon_share.png" alt>
    </div>
    <div class="head">
      <h1>{{detail_list.title}}</h1>
      <div>
        <span class="addr">{{detail_list.source}}</span>
        <span class="time">{{detail_list.create_time |time}}</span>
      </div>
    </div>
    <div class="news_img">
      <img src="../assets/bg_sign.png" alt>
    </div>
    <div class="main_body" v-html="detail_list.details"></div>
    <div class="comment">
      <span class="comment_head">新闻点评</span>
      <input class="comment_con" placeholder="我有话要说......">
      <button>{{text}}</button>
      <span class="new_comment_head">最新评论</span>
    </div>
    <div class="comment_area">
        <com-box v-for="(commentIds,index) in commentIdsList" :key="index" :commentItem="commentItem" :commentIds="commentIds" :level="commentIds.split(',').length"></com-box>
    </div>
  </div>
</template>
<script>
import { getNewsDetail ,getComment} from "../api/example.js";
import moment from "moment";
import Comment from '../components/Comment.vue'
export default {
  data() {
    return {
      id: this.$route.params.id,
      detail_list: [],
      text:'',
      commentItem:[],
      commentIdsList:[]
    };
  },
  methods: {
    islogin() {
        if(localStorage.user)
        {
            this.text='评论'
        }else{
            this.text='登录评论'
        }
    },
    //获取评论
    get_comments(){
          getComment(this.id,1,3).then(res => {
          if (res.data.code === 'success') {
            this.commentItem = res.data.data.comments;
          
            this.commentIdsList = res.data.data.commentIds;

          }
        })
      }
  },
  filters: {
    time: function(value) {
      if (value) {
        var now = new Date();
        var create_time = isNaN(value) ? value.getTime() : value;
        var diff = now.getTime() - create_time;
        var diff_time = new Date(diff);
        if (diff < 60 * 1000) {
          return "刚刚";
        } else if (diff < 60 * 1000 * 60) {
          return diff_time.getMinutes() + "分钟前";
        } else if (diff < 60 * 1000 * 60 * 24) {
          return diff_time.getHours() + "小时前";
        } else if (diff <= 60 * 1000 * 60 * 24 * 31) {
          return diff_time.getDate() + "天前";
        } else {
          return moment(create_time).format("YYYY-MM-DD");
        }
      }
    }
  },
  created() {
    getNewsDetail(this.id).then(res => {
      if ((res.data.code = "success")) {
        var data = res.data.data;
        this.detail_list = data.news;
      }
    });
    this.islogin();
    this.get_comments();
  },
  components:{
      'com-box':Comment
  }
};
</script>
<style lang="scss" scoped>
.news_detailes {
  display: flex;
  flex-direction: column;
  padding: 60px 0 36px 290px;
  box-sizing: border-box;
  width: 100%;
  .float_box {
    position: absolute;
    width: 134px;
    top: 215px;
    left: 135px;
    .up_box {
      border-bottom: 1px solid #dcdcdc;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 70px;
      padding-bottom: 10px;
      box-sizing: border-box;

      div {
        img {
          width: 28px;
          height: 23px;
          vertical-align: middle;
        }
        span {
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #9b9b9b;
          margin-left: 17px;
        }
      }
    }
  }
  .head {
    h1 {
      font-family: MicrosoftYaHei;
      font-size: 26px;
      color: #333333;
    }
    div {
      margin-top: 31.4px;
      width: 125.5px;
      display: flex;
      justify-content: space-between;
      .addr {
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #333333;
      }
      .time {
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #9b9b9b;
      }
    }
  }
  .news_img {
    padding: 29px 0 29px 102px;
    img {
      width: 655px;
      height: 337px;
    }
  }
  .main_body {
    width: 858px;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    color: #333333;
    line-height: 30px;
  }
  .comment {
    width: 858px;
    //height: 141px;
    padding: 50px 0 20px 0;
    margin-top: 50px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    border-top: 2px solid #dcdcdc;
    border-bottom: 2px solid #dcdcdc;
    .comment_head {
      font-family: MicrosoftYaHei;
      font-size: 16px;
      color: #6f6f6f;
    }
    .comment_con {
      border: 1px solid #979797;
      border-radius: 4px;
      text-indent: 1em;
      margin-top: 20px;
      width: 858px;
      height: 42px;
      box-sizing: border-box;
    }
    button {
      background: #ff8000;
      width: 110px;
      height: 36px;
      font-family: MicrosoftYaHei;
      font-size: 16px;
      color: #ffffff;
      letter-spacing: 2px;
      outline: none;
      margin-top: 23px;
      margin-left: 748px;
    }
    .new_comment_head {
      margin-top: 35px;
      font-family: MicrosoftYaHei;
      font-size: 16px;
      color: #6f6f6f;
    }
  }
  .comment_area{
      width: 858px;
  }
}
</style>
