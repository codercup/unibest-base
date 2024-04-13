import { createSSRApp } from 'vue'
import App from './App.vue'
import store from './store'
import { routeInterceptor, requestInterceptor } from './interceptors'
import 'virtual:uno.css'
import '@/style/index.scss'

export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  app.use(routeInterceptor)
  // 使用 alova 之后无需下面的 requestInterceptor
  // app.use(requestInterceptor)
  return {
    app,
  }
}
