<template>
  <div
    :class="{ 'tw-text-gray-400 !tw-border-black/10': completed }"
    class="tw-border-2 tw-border-black/20">
    <div class="tw-p-2">
      <div class="sm:tw-flex">
        <div class="tw-flex-grow tw-flex tw-gap-2">
          <div
            :class="{ 'tw-opacity-40 tw-saturate-0': completed }"
            class="tw-h-full tw-aspect-square tw-bg-black tw-rounded-lg tw-relative tw-overflow-hidden">
            <!-- <img
              src="https://firebasestorage.googleapis.com/v0/b/market-item-finder.appspot.com/o/05-iphone-12-pro-2020.webp?alt=media&token=3fb6bc22-728e-4c27-afce-7531e2c16a20"
              class="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-object-cover"> -->
          </div>
          <div>
            <h3 class="tw-text-xl tw-truncate tw-font-semibold">{{ itemName }}</h3>
            <p class="tw-text-sm">ID: 123456789</p>
            <p class="tw-text-sm">Buyer: John Doe</p>
          </div>
        </div>
        <span class="tw-text-sm">20mins ago</span>
      </div>
    </div>

    <div class="tw-relative">
      <span
        :class="{ 'tw-bg-black/10': completed }"
        class="tw-absolute tw-inset-0 tw-block tw-bg-black tw-transition-all tw-duration-300"
        :style="`width: ${lifecycleProgress}%`">
      </span>
      <div
        :class="{ '!tw-text-gray-400': completed }"
        class="tw-text-white tw-relative tw-text-sm tw-grid tw-grid-cols-3 tw-py-1">
        <div class="tw-flex tw-justify-center tw-items-center tw-gap-1">
          <!-- <v-icon>mdi-timelapse</v-icon> -->
          <v-icon>mdi-checkbox-marked-circle</v-icon>
          <span>seller</span>
        </div>
        <div class="tw-flex tw-justify-center tw-items-center tw-gap-1">
          <!-- <v-icon>mdi-timelapse</v-icon> -->
          <v-icon>mdi-checkbox-marked-circle</v-icon>
          <span>buyer</span>
        </div>
        <div class="tw-flex tw-justify-center tw-items-center tw-gap-1">
          <!-- <v-icon>mdi-timelapse</v-icon> -->
          <v-icon>mdi-lock</v-icon>
          <span>locks in 15mins</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RequestLifecycle } from '@/types'

interface Props {
  isCompleted?: boolean
  lifecycle: RequestLifecycle
  itemName: string
}

const props = defineProps<Props>()
const completed = ref(!!props?.isCompleted)

const lifecycleProgress = computed<number>(()=>{
  switch (props.lifecycle) {
    case RequestLifecycle.PENDING:
      return (100/3)
    case RequestLifecycle.ACCEPTED_BY_SELLER:
      return (100/3)
    case RequestLifecycle.ACCEPTED_BY_BUYER:
      return (100/3)*2
    case RequestLifecycle.REQUEST_LOCKED:
      return 100
    case RequestLifecycle.COMPLETED:
      return 100
    default:
      return 0
  }
})
</script>