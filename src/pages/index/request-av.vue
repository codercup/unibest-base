<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: 'alova',
  },
}
</route>

<template>
  <view class="p-6 text-center">
    loading: {{ loading }}
    <view v-if="loading">加载中...</view>
    <block v-else>
      <view class="my-6">请求数据为：{{ data.data }}</view>
      <view>完整数据为：{{ data }}</view>
    </block>
  </view>
</template>

<script lang="ts" setup>
import { alovaInst } from '@/utils/alova'
import { useRequest } from 'alova'

const list = () =>
  alovaInst.Get('/foo', {
    // 设置的参数将传递给uni.request
    enableHttp2: true,
    sslVerify: true,
  })
const { loading, data } = useRequest(list)
console.log(loading.value)
</script>

<style lang="scss" scoped>
//
</style>
