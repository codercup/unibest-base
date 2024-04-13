import { createAlova } from 'alova'
import AdapterUniapp from '@alova/adapter-uniapp'
import VueHook from 'alova/vue'
import { useUserStore } from '@/store/user'

// 请求基地址
const baseURL = import.meta.env.VITE_SERVER_BASEURL
export const alovaInst = createAlova({
  baseURL,
  statesHook: VueHook,
  ...AdapterUniapp(),
  beforeRequest(method) {
    const userStore = useUserStore()
    const { token } = userStore.userInfo as unknown as IUserInfo
    if (token) {
      method.config.headers.token = `Bearer ${token}`
    }
  },
  async responded(response, method) {
    // 请求成功的拦截器
    console.log('请求成功的拦截器 ->', response, method)
    return response.data
  },
})
