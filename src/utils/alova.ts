import { createAlova } from 'alova'
import AdapterUniapp from '@alova/adapter-uniapp'
import { useUserStore } from '@/store/user'

// 请求基地址
const baseURL = import.meta.env.VITE_SERVER_BASEURL
export const alovaInst = createAlova({
  baseURL,
  ...AdapterUniapp(),
  beforeRequest(method) {
    const userStore = useUserStore()
    const { token } = userStore.userInfo as unknown as IUserInfo
    if (token) {
      method.config.headers.token = `Bearer ${token}`
    }
  },
  // 请求成功的拦截器
  async responded(res, method) {
    // console.log('请求成功的拦截器 ->', res, method)
    const { statusCode, data } = res as UniNamespace.RequestSuccessCallbackResult
    // 状态码 2xx，参考 axios 的设计
    if (statusCode >= 200 && statusCode < 300) {
      // 2.1 提取核心数据 res.data
      return data
    } else if (res.statusCode === 401) {
      // 401错误  -> 清理用户信息，跳转到登录页
      // userStore.clearUserInfo()
      // uni.navigateTo({ url: '/pages/login/login' })
      throw new Error('未登录')
    } else {
      // 其他错误 -> 根据后端错误信息toast提示
      uni.showToast({
        icon: 'none',
        title: (data as any).msg || '请求错误',
      })
      throw new Error('网络错误，换个网络试试')
    }
  },
})
