type IUseRequestOptions = {
  immediate?: boolean
}
/**
 * uni普通请求
 * @param func 外面传进来的请求函数
 * @param options 传递的参数
 * @returns {data: globalThis.Ref<T>;
    error: globalThis.Ref<boolean>;
    loading: globalThis.Ref<boolean>;
    run: () => Promise<void>;}
 */
export default function useRequest<T>(
  func: () => Promise<IResData<T>>,
  options: IUseRequestOptions = { immediate: true },
) {
  const loading = ref(false)
  const error = ref(false)
  const data = ref<T>()
  const run = async () => {
    loading.value = true
    func()
      .then((res) => {
        data.value = res.data
        error.value = false
      })
      .catch((err) => {
        error.value = err
      })
      .finally(() => {
        loading.value = false
      })
  }

  onLoad(() => {
    options.immediate && run()
  })
  return { data, error, loading, run }
}
