import axios from 'axios'
import router from './router'

// 请求拦截
axios.interceptors.request.use(req => {
  if (localStorage.wxToken) {
    req.headers.Authorization = localStorage.wxToken
  }
  return req
}, err => {
  return Promise.reject(err)
})

// 响应拦截
axios.interceptors.response.use(res => {
  return res
}, err => {
  // 错误提醒
  const { status } = err.response
  if (status === 401) {
    alert('token过期，请重新登录')
    // 清除 token
    localStorage.removeItem('wxToken')
    // 页面跳转
    router.push('/login')
  } else {
    alert(err.response.data)
  }
  return Promise.reject(err)
})


export default axios