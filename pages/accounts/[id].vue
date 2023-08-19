<template>
  <div class="tw-max-w-7xl tw-mx-auto">
    <div class="tw-p-6 sm:tw-p-10">
      <FinalizeRegistration v-model="isCompleted" class="tw-mb-6" />
      
      <div>
        <Tabs
          :tab_list="tab_list"
          query_name="user_type"
          :value="tab"
          @model-value="($event) => tab = $event"
          class="tw-inline-flex tw-gap-x-1 sm:tw-gap-x-2 tw-justify-between
          tw-rounded-sm tw-w-full [&>*]:tw-flex-grow [&>*]:tw-max-w-[50%]">
          <template v-slot:tab="{ tab, index: i, is_active }">
            <div
              :class="[is_active ? 'tw-border-black' : 'tw-text-gray-400 tw-border-transparent']"
              class="tw-border-b-4 tw-py-2 tw-transition tw-duration-300 tw-font-medium tw-cursor-pointer">
              <span class="tw-flex tw-flex-col tw-items-center">
                <v-icon>{{ tab.icon }}</v-icon>
                <span>{{ tab.name }}</span>
              </span>
            </div>
          </template>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FinalizeRegistration from '@/components/FinalizeRegistration.vue'
import Tabs from '@/components/Tabs.vue';

import { useRoute } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
console.log(route.params.id)

const isCompleted = ref(false)

const tab = ref()
const tab_list = ref<{ name: string, slug: string, icon: string }[]>([
  { name: 'Accepted requests', slug: 'active', icon: 'mdi-timelapse' }, // seller
  // { name: 'Active requests', slug: 'active', icon: 'mdi-timelapse' },
  { name: 'Requests I fulfilled', slug: 'completed', icon: 'mdi-cube-send' }, // seller
  // { name: 'Completed requests', slug: 'completed', icon: 'mdi-cube-send' },
])
</script>