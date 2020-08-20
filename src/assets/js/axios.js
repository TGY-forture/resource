import axios from 'axios'   //引入axios

axios.defaults.baseURL = 'https://www.tserch.xyz:3000';  //axois默认配置
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true  //跨域时使用凭证

export {axios}