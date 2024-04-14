// 使用vue方式编写一个useRequestHook
export default function useRequest(func: () => Promise<any>, options: any) {
  const { data, error, loading, run } = func()
  return { data, error, loading, run }
}
