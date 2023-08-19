<template>
  <div>
    <div
      class="tw-flex tw-flex-col sm:tw-flex-row tw-gap-4 sm:tw-items-center tw-justify-between
      tw-bg-black tw-p-3 tw-rounded-lg tw-text-white">
      <div class="tw-space-y-1">
        <div>
          <strong>Almost done!</strong> Just a few more questions and you are set ✨
        </div>
        <div class="tw-h-3 tw-rounded-full tw-bg-white/40 tw-overflow-hidden">
          <span class="tw-block tw-h-full tw-w-[70%] tw-bg-white tw-rounded-full"></span>
        </div>
      </div>
  
      <button
        class="tw-px-3 tw-py-1 tw-rounded-full tw-bg-white tw-text-black
        hover:tw-bg-white/80 tw-transition-all tw-duration-300"
        @click="modal = true">
        Complete
      </button>
    </div>

    <v-dialog v-model="modal" max-width="600">
      <div class="tw-bg-white tw-gap-4 tw-p-4 tw-text-black">
        hey
      </div>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
}
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const isCompleted = ref(false)
const modal = ref(false)

</script>