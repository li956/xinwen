// // 引入配置好的axios库
// import Axios from './index'
// // 定义获取新闻列表接口的方法
// function getNewsList (page) {
//   return Axios.get('/news/list', {
//     // get方法传递params参数对象
//     params: {
//       channelname: 'shehui',
//       page: page,
//       limit: 10
//     }
//   })
// }
// // 导出接口方法
// export {
//   getNewsList
// }


//引入配置好的axios库
import Axios from './index'
//定义获取接口的方法

//登录
function getLoginInfo(phone, password) {
    return Axios.get('/json/login.json', {
        //get方法传递params参数对象
        params: {
            phone: phone,
            password: password
        }
    })
}
//获取图形验证码
function getImgCaptcha() {
    return Axios.get('/json/captcha_img.json')
}
//
// 获取短信验证码
function getSmsCaptcha(type,captcha, account) {
    // post请求参数写在第二个参数位置
    return Axios.get('/json/captcha_info.json', {
        type: type,
        imgCaptcha: captcha,
        // 此处手机号请填写正确格式手机号
        phone: account
    })
}
//注册
function getRegistInfo(type,account){
    return Axios.get('/json/regist.json',{
        type:type,
        phone: account
    })
}
//获取热搜列表
function getHotSearch(){
    return Axios.get('/json/hotnews_list.json')
}
//获取新闻列表
function getNewsList(channelname,page,limit){
    return Axios.get('/json/new_'+channelname+'_'+page+'.json',{
        channelname:channelname,
        page:page,
        limit:limit
    })
}
//关键字搜索
function getSearchContent(keyword,page,limit){
    return Axios.get('/json/search_list.json',{
        keyword:keyword,
        page:page,
        limit:limit
    })
}
//新闻详情
function getNewsDetail(id){
    return Axios.get('/json/new_details.json',{
        id:id
    })
}
//获取我的评论
function getMyComment(token,page,limit){
    return Axios.get('/json/my_comment_list.json',{
        token:token,
        page:page,
        limit:limit
    })
}
//获取我的消息
function getMyMessage(token,page,limit){
    return Axios.get('/json/my_message_list.json',{
        token:token,
        page:page,
        limit:limit
    })
}
//消息提示
function getMsgTip(token){
    return Axios.get('/json/msg_tip.json',{
        token:token
    })
}
//设置消息已读
function getMsgRead(token){
    return Axios.get('/json/msg_read.json',{
        token:token
    })
}
//导出接口方法
//获取评论
function getComment(id,page,limit){
    return Axios.get('/json/comment_comment.json',{
        id:id,
        page:page,
        limit:limit
    })

}
export {
    getLoginInfo,
    getImgCaptcha,
    getSmsCaptcha,
    getRegistInfo,
    getHotSearch,
    getNewsList,
    getSearchContent,
    getNewsDetail,
    getMyComment,
    getMyMessage,
    getMsgTip,
    getMsgRead,
    getComment
}