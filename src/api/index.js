// // 引入axios库
// import Axios from 'axios'
// // 设置统一的前置url路径，调用接口时，所有的接口路径都会拼接在该路径后
// Axios.defaults.baseURL = 'https://dev.apis.ittim.ltd/key'
// // 允许跨域
// Axios.defaults.withCredentials = true
// export default Axios
//引入axios库
import Axios from 'axios'
//设置统一的url路径，调用接口是，所有的接口路径都会拼接在该路径后
Axios.defaults.baseURL='http://localhost:8080'
//允许跨域「允许跨域携带cookie，默认不能携带」
Axios.defaults.withCredentials=true
export default Axios