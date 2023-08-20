<template>
  <div class="tw-max-w-7xl tw-mx-auto">
    <div class="tw-p-6 sm:tw-p-10">
      <FinalizeRegistration
        v-if="!isCompletedNow && !isCompleted"
        :accountType="userCookie?.accountType"
        v-model="isCompletedNow" class="tw-mb-6"
      />

      <div v-if="isBuyer" class="tw-mb-6">
        <NuxtLink
          to="/requests/create"
          class="tw-inline-block tw-p-4 tw-px-6 tw-rounded-full tw-bg-black
          tw-select-none tw-text-white hover:tw-bg-black/80
          tw-transition-all tw-duration-300 tw-font-black">
          Request for an item
        </NuxtLink>
      </div>
      
      <div>
        <Tabs
          :tab_list="tab_list"
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

        <div class="tw-mt-6">
          <div v-show="tab==='active'" class="tw-grid tw-gap-3">
            <RequestItem
              itemName="iPhone 12 Pro Max"
              :lifecycle="RequestLifecycle.ACCEPTED_BY_BUYER" v-for="n in 3"
            />
          </div>
          
          <div v-show="tab==='completed'" class="tw-grid tw-gap-3">
            <RequestItem
              itemName="Plastic spatula"
              :lifecycle="RequestLifecycle.COMPLETED"
              :is-completed="true"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FinalizeRegistration from '@/components/FinalizeRegistration.vue'
import Tabs from '@/components/Tabs.vue';
import RequestItem from '@/components/RequestItem.vue';
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import { RequestLifecycle, AccountType, User } from '@/types'

useHead({
  title: 'iMarket Finder - Your account',
})
definePageMeta({
  middleware: 'auth',
  requiresAuth: true,
})

const route = useRoute()
// console.log(route.params.id)

const isCompletedNow = ref(false)
const isCompleted = computed(()=>!!userCookie.value?.username)

const tab = ref()
const tab_list = ref<{ name: string, slug: string, icon: string }[]>([
  { name: 'Accepted requests', slug: 'active', icon: 'mdi-timelapse' }, // seller
  // { name: 'Active requests', slug: 'active', icon: 'mdi-timelapse' },
  { name: 'Requests I fulfilled', slug: 'completed', icon: 'mdi-cube-send' }, // seller
  // { name: 'Completed requests', slug: 'completed', icon: 'mdi-cube-send' },
])

const userCookie = useCookie<User>('user')
const isSeller = computed(() => userCookie.value?.accountType === AccountType.SELLER)
const isBuyer = computed(() => userCookie.value?.accountType === AccountType.BUYER) 
</script>