// 使用vue方式编写一个useRequestHook
export default function useRequest<T>(func: () => Promise<IResData<T>>, { immediate = true }) {
  const loading = ref(false)
  const error = ref(false)
  const data = ref<T>()
  const run = async () => {
    loading.value = true
    try {
      func().then((res) => {
        data.value = res.data
      })
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  onLoad(() => {
    immediate && run()
  })
  return { data, error, loading, run }
}
