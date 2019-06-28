<template>
  <div class="news_content" @click="hid_list">
    <div class="news_con_head">
      <div class="search">
        <input type="text" v-model="search_content" @click.stop="show_list" @keyup.enter="get_search_con()">
        <ul v-show="flag">
          <li v-for="(item,index) of hotlist" :key="index" @click="get_data(item.title)">
            <span
              :class="{hot1:index==0,hot2:index==1,hot3:index==2,hot4:index>2}"
            >{{index+1}}.&nbsp;&nbsp;</span>
            <span>{{item.title}}</span>
          </li>
        </ul>
        <div>
          <button @click="get_search_con">
            <img src="../assets/icon_ search.png" >
          </button>
        </div>
      </div>
    </div>
    <div class="news_con_body">
      <div class="fixed_box">
        <ul>
          <li @click="item_flag=1,channelname='yaowen'" >
            <div :class="{item_active:item_flag==1}">要闻</div>
          </li>
          <li @click="item_flag=2,channelname='shehui'">
            <div :class="{item_active:item_flag==2}">社会</div>
          </li>
          <li @click="item_flag=3,channelname='war'">
            <div :class="{item_active:item_flag==3}">军事</div>
          </li>
          <li @click="item_flag=4,channelname='tech'">
            <div :class="{item_active:item_flag==4}">科技</div>
          </li>
          <li @click="item_flag=5,channelname='ent'">
            <div :class="{item_active:item_flag==5}">娱乐</div>
          </li>
        </ul>
      </div>

      <div class="list">
        <ul>
          <li v-for="item of newslist" :key="item._id">
            <div class="create_info">
              <span class="create_time">{{item.create_time | time}}</span>
              <span class="create_addr">{{item.source}}</span>
            </div>
            <div class="title" @click="$router.push('/newsdetails/'+item._id)">{{item.title}}</div>
            <div class="other_info">
              <span>{{item.keywords | keyword}}</span>
              <div>
                <img class="com_img" src="../assets/icon_comment.png">
                <span>{{item.comment_sum}}</span>
                <img class="saw_img" src="../assets/icon_saw.png">
                <span>2220</span>
              </div>
            </div>
            <div class="news_img">
              <img v-lazy="item.cover">
            </div>
          </li>
        </ul>
      </div>
      <div ref="sign" class="sign"></div>
    </div>
  </div>
</template>
<script>
import { getHotSearch, getNewsList , getSearchContent} from "../api/example.js";
import moment from 'moment'

export default {
  data() {
    return {
      search_content: "",
      search_page:1,
      hotlist: [],
      flag: false,
      item_flag: 1,
      channelname: "yaowen",
      page: 1,
      newslist: []
    };
  },
  watch:{
      channelname:function(){
          if(this.channelname){
              this.page=1;
          this.newslist=[];
          this.get_newslist();
          }
          else{
              return;
          }
      }
  },
  filters: {
      //修改时间格式
    time: function(value) {
      var now = new Date();
      var create_time = isNaN(value) ? value.getTime() : value;
      var diff = now.getTime() - create_time;
      var diff_time=new Date(diff);
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

    },
    //修改关键词格式
    keyword:function(value){
        return value.join(' ');
    }
  },
  methods: {
    //获取热搜列表的值
    get_data(item) {
      this.search_content = item;
    },
    //显示热搜列
    show_list() {
      this.flag = true;
    },
    //隐藏热搜列
    hid_list() {
      this.flag = false;
    },
    //获取新闻列
    get_newslist() {
      if (this.page > 3) return;
      getNewsList(this.channelname, this.page++, 4).then(res => {
        if ((res.data.code = "success")) {
          var data = res.data.data;
          if (this.newslist.length == 0) {
            this.newslist = data.news;
          } else {
            this.newslist = this.newslist.concat(data.news);
            console.log(this.newslist);
          }
        }
      });
    },
    //判断加载触发
    judge_event() {
        if(!this.channelname) return;
      if (
        this.$refs.sign.offsetHeight +
          this.$refs.sign.getBoundingClientRect().top <
        document.documentElement.clientHeight
      ) {
        console.log("-----------ss");
        console.log(this._.throttle);
        this.get_newslist();
      }
    },
    //获取搜索内容
    get_search_con(){
        this.channelname='';
        if(this.item_flag>0) this.item_flag=0
        if(this.flag==true) this.flag=false;
        getSearchContent(this.search_content,this.search_page,4).then(res=>{
            if(res.data.code=='success'){
                var data=res.data.data;
                this.newslist=data.news;
            }else{

            }
        })
    }
  },
  created() {
    //引用热搜列表接口
    getHotSearch().then(res => {
      if ((res.data.code == "success")) {
        var data = res.data.data;
        this.hotlist = data.news;
      }
    });
    this.get_newslist();
  },
  mounted() {
    //监听滚动条
    window.addEventListener("scroll", this._.throttle(this.judge_event, 800));
  }
};
</script>
<style lang="scss" scoped>

.sign {
  width: 100%;
  height: 10px;
}
.item_active {
  border-left: solid 5px #ff8000 !important;
  color: #ff8000 !important;
}
.hot1 {
  color: red;
}
.hot2 {
  color: #ff6300;
}
.hot3 {
  color: #ff8200;
}
.hot4 {
  color: #9b9b9b;
}
.news_content {
  display: flex;
  flex-direction: column;
  background: #f9f9f9;
  .news_con_head {
    width: 100%;
    height: 151px;
    .search {
      margin: 0 auto;
      position: relative;
      width: 520px;
      height: 48px;
      margin-top: 60px;
      ul {
        position: absolute;
        top: 52px;
        list-style: none;
        width: 520px;
        z-index: 999;
        background-color: #ffffff;
        box-shadow: -2px 0 3px 1px rgba(39, 52, 101, 0.08),
          2px 2px 3px 1px rgba(39, 52, 101, 0.08);
        li {
          line-height: 43px;
          padding-left: 19.5px;
          box-sizing: border-box;
          font-size: 14px;
          color: #151515;
        }
        li:hover {
          background-color: rgba(0, 0, 0, 0.12);
        }
      }
      input {
        width: 500px;
        height: 48px;
        background: #ffffff;
        border: 1px solid #ff8000;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #9b9b9b;
        text-indent: 24px;
        box-sizing: border-box;
        outline: none;
      }
      div {
        overflow: hidden;
        width: 90px;
        height: 48px;
        position: absolute;
        top: 0px;
        right: 0px;
        button {
          transform: translateY(-50px);
          outline: none;
          width: 110px;
          height: 110px;
          background: #ff8000;
          border-radius: 50%;
        }
      }
      img {
        width: 28px;
        height: 28px;
        position: absolute;
        top: 60px;
        right: 42px;
      }
    }
  }
  .news_con_body {
    width: 100%;

    .fixed_box {
      background-color: #ffffff;
      position: fixed;
      left: 149px;
      top: 231px;
      box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.12);
      z-index: 999;
      ul {
        list-style: none;
        li {
          padding: 17.5px 0;
          width: 132px;
          cursor: pointer;
          div {
            font-family: MicrosoftYaHei;
            height: 25px;
            width: 132px;
            padding: 0 45px;
            font-size: 16px;
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
    .list {
      width: 100%;
      ul {
        margin-left: 375.5px;
        list-style: none;
        width: 726px;
        li {
          border: solid 1px #ffffff;
          width: 726px;
          height: 300px;
          margin-top: 17.8px;
          margin-bottom: 30.2px;
          position: relative;
          background: #ffffff;
          box-sizing: border-box;
          padding-left: 138.3px;
          .create_info {
            position: absolute;
            align-items: center;
            padding: 10.9px 0;
            box-sizing: border-box;
            top: -17.8px;
            left: -37.5px;
            width: 140px;
            height: 78px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background-color: #fff;
            border: 1px solid #DCDCDC;
            .create_time {
              font-family: MicrosoftYaHei;
              font-size: 24px;
              color: #9b9b9b;
            }
            .create_addr {
              font-family: MicrosoftYaHei;
              font-size: 14px;
              color: #9b9b9b;
            }
          }
          .title {
            height: 31px;
            font-family: MicrosoftYaHei;
            font-size: 24px;
            color: #333333;
            margin-top: 15.8px;
            cursor: pointer;
          }
          .other_info {
            margin-top: 15.3px;
            font-family: MicrosoftYaHei;
            font-size: 14px;
            color: #9b9b9b;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            div {
              width: 215px;
              img {
                width: 22px;
                height: 22px;
                vertical-align: middle;
              }
              span {
                width: 45px;
                margin-left: 10px;
                display: inline-block;
              }
            }
          }
          .news_img {
            margin-top: 14px;
            img {
              width: 418px;
              height: 184px;
            }
          }
        }
      }
    }
  }
}
</style>


