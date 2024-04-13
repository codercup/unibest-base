<route lang="json5">
{
  style: {
    navigationBarTitleText: '关于',
  },
}
</route>

<template>
  <view
    class="bg-white overflow-hidden pt-2 px-4"
    :style="{ marginTop: safeAreaInsets?.top + 'px' }"
  >
    <view class="text-center text-2xl mt-4">关于页面</view>
    <view class="text-center mt-4">
      当前平台是：
      <text class="text-red-500">{{ PLATFORM.platform }}</text>
    </view>
    <view class="text-center mt-4">进入请求页</view>
    <view class="text-center mt-4">
      <wd-button type="primary" @click="gotoPage('request')">传统请求</wd-button>
      <wd-button type="primary" @click="gotoPage('request-av')" class="ml-2">Alova 请求</wd-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

console.log(PLATFORM)

const gotoPage = (page: string) => {
  uni.navigateTo({
    url: `/pages/index/${page}`,
  })
}
</script>

<style lang="scss" scoped>
.desc {
  height: 80rpx;
}
</style>
