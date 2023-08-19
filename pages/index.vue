<template>
  <div>
    <div class="tw-relative">
      <div class="tw-max-w-7xl tw-mx-auto lg:tw-absolute tw-inset-0 tw-p-6 sm:tw-p-10 tw-z-10">
        <div class="lg:tw-w-1/2 tw-bg-white sm:tw-p-6">
          <Tabs
            :tab_list="tab_list"
            query_name="user_type"
            :value="tab"
            @model-value="handleTabSwitch"
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

          <div class="tw-mt-4">
            <template v-if="tab===tab_list[0].slug">
              <h2 class="tw-text-5xl tw-font-bold tw-leading-snug">
                Broadcast the item you're looking for
              </h2>
              <p class="tw-mt-4 tw-text-lg">
                Send notifications to store owners in markets around you from the comfort of your home
              </p>

              <button class="tw-bg-black tw-text-white tw-p-4 tw-py-2.5 tw-mt-4 tw-rounded-lg">
                <span>Create request</span>
                <v-icon>mdi-arrow-right</v-icon>
              </button>
            </template>

            <template v-if="tab===tab_list[1].slug">
              <h2 class="tw-text-5xl tw-font-bold tw-leading-snug">
                Get notified when a buyer is looking for an item you sell
              </h2>
              <p class="tw-mt-4 tw-text-lg">
                Drive more sales at your store by getting notified when a buyer is looking for an item in your store.
              </p>
              <p class="tw-opacity-70">Once buyer accepts your offer, you can arrange for delivery or pickup</p>

              <button class="tw-bg-black tw-text-white tw-p-4 tw-py-2.5 tw-mt-4 tw-rounded-lg">
                <span>Register store</span>
                <v-icon>mdi-arrow-right</v-icon>
              </button>
            </template>
          </div>
        </div>
      </div>

      <div class="tw-h-[80vh] tw-bg-gray-50">
        <v-col class="tw-h-full pa-0">
          <ClientOnly>
            <v-carousel v-model="carousel" :show-arrows="false" hide-delimiter-background hide-delimiters height="100%">
              <v-carousel-item ripple v-for="(image, n) in images" :key="n" :src="image" cover>
              </v-carousel-item>
            </v-carousel>
          </ClientOnly>
        </v-col>
      </div>
    </div>

    <div class="tw-px-6 sm:tw-px-10 tw-p-4 tw-max-w-7xl tw-mx-auto tw-mt-4 sm:tw-mt-10">
      <h1 class="tw-text-4xl tw-font-bold">Focus on sales, let us forcus on bringing you customers</h1>

      <div class="tw-grid sm:tw-grid-cols-2 tw-gap-6 tw-mt-4">
        <div class="tw-space-y-2">
          <div class="tw-aspect-[3/2] tw-bg-black">
            <img src="https://firebasestorage.googleapis.com/v0/b/market-item-finder.appspot.com/o/pexels-kampus-production-8475118.jpg?alt=media&token=6bdde53b-ac6e-4466-95d1-af15fc28d5d3" class="tw-h-full tw-w-full tw-object-cover">
          </div>
          <h3 class="tw-font-semibold tw-text-lg">We exist for you</h3>
          <p>Our plan is to increase your sales by 400%</p>
        </div>

        <div class="tw-space-y-2">
          <div class="tw-aspect-[3/2] tw-bg-black">
            <img src="https://firebasestorage.googleapis.com/v0/b/market-item-finder.appspot.com/o/pexels-laura-james-6097813.jpg?alt=media&token=a41967af-aef4-42f8-92f1-c45535df349a" class="tw-h-full tw-w-full tw-object-cover">
          </div>
          <h3 class="tw-font-semibold tw-text-lg">We value your Time too</h3>
          <p>
            Why not reduce the fruitless searching for that item you are looking for on the market
            by publishing your shopping list and recieving price quotes from store owners that have your item
          </p>
        </div>
      </div>
    </div>

    <div class="tw-bg-gray-50 tw-mt-4 sm:tw-mt-10">
      <div class="tw-max-w-7xl tw-mx-auto tw-p-6 sm:tw-p-10 sm:tw-py-20">
        <h1 class="tw-text-4xl tw-font-bold tw-flex tw-flex-col"><v-icon>mdi-flower</v-icon><span>About us</span></h1>
  
        <p class="tw-mt-6">
          We are a team of developers that are passionate about solving problems in our society. <br />
          This project was born out of the need to help people find items they are looking for in the market.
          Removing the stress of going from store to store looking for an item.
        </p>
        <p class="tw-mt-4">
          We do this without taking profit from either the buyer or the seller thus any form of
          donations to our cause will go a long way
        </p>
  
        <NuxtLink
          href="https://justpaga.me/favourwright"
          target="_blank"
          class="tw-inline-flex tw-gap-2 tw-bg-black tw-text-white tw-p-4 tw-py-2.5 tw-mt-4 tw-rounded-lg">
          <span>Donate</span>
          <v-icon>mdi-rocket</v-icon>
        </NuxtLink>
      </div>
    </div>

    <div class="tw-px-6 sm:tw-px-10 tw-p-4 tw-max-w-7xl tw-mx-auto tw-mt-4 sm:tw-mt-10">
      <div class="tw-flex tw-flex-col sm:tw-flex-row tw-gap-10 tw-justify-between">
        <NuxtLink
          to="/register"
          class="tw-inline-flex tw-justify-between tw-text-4xl tw-font-bold
          tw-gap-2 tw-flex-grow sm:tw-max-w-[50%] tw-border-b tw-border-black">
          <span>Register as buyer</span>
          <v-icon>mdi-arrow-right</v-icon>
        </NuxtLink>

        <NuxtLink
          to="/register"
          class="tw-inline-flex tw-justify-between tw-text-4xl tw-font-bold
          tw-gap-2 tw-flex-grow sm:tw-max-w-[50%] tw-border-b tw-border-black">
          <span>Register as seller</span>
          <v-icon>mdi-arrow-right</v-icon>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Tabs from '@/components/Tabs.vue'

const carousel = ref(0)
const images: string[] = [
  'https://firebasestorage.googleapis.com/v0/b/market-item-finder.appspot.com/o/pexels-porapak-apichodilok-346746.jpg?alt=media&token=5d03dc8c-5845-4723-ae01-884c274b0b0b',
  'https://firebasestorage.googleapis.com/v0/b/market-item-finder.appspot.com/o/pexels-antonio-sokic-3839432.jpg?alt=media&token=47151f3e-2eb1-4147-83d5-96a3bbccff70',
]

const tab = ref()
const tab_list:{ name: string, slug: string, icon: string }[] = [
  { name: 'Help me find stuff', slug: 'buyer', icon: 'mdi-shopping' },
  { name: 'I sell stuff', slug: 'seller', icon: 'mdi-store' },
]

// because the number of tabs === number of images, this works
// but if you have more or less tabs than images, you'll need to do something else
const handleTabSwitch = (activeTab: string) => {
  tab.value = activeTab
  carousel.value = tab_list.findIndex((t) => t.slug === tab.value)
}
</script>