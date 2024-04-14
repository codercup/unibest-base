export default function useSleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}
