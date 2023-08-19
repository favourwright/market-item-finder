<template>
  <div>
    <div class="tw-relative">
      <div class="tw-max-w-7xl tw-mx-auto lg:tw-absolute tw-inset-0 tw-p-6 sm:tw-p-10 tw-z-10">
        <div class="lg:tw-w-1/2 tw-min-h-full tw-bg-white sm:tw-p-6">
          <!-- this Tabs component isn't visually rendered, only used to detect the tab user was
          coming from on the landing page OR the signup form to display -->
          <Tabs :tab_list="tab_list" query_name="user_type" :value="tab" @model-value="handleInitAccountSelected"></Tabs>

          <div>
            <h2 class="tw-text-5xl tw-font-bold">Create an account</h2>
            <form @submit.prevent="handleSignup" class="tw-mt-4 tw-text-2xl">
              <label class="tw-relative tw-block">
                <span class="tw-absolute tw-text-base tw-pl-4 tw-pt-1">Enter email</span>
                <input
                  type="email"
                  placeholder="email@example.com"
                  :required="true"
                  class="tw-w-full tw-bg-gray-100 tw-p-4 tw-pt-7 tw-rounded-md tw-outline-black">
              </label>

              <label class="tw-relative tw-mt-4 tw-block">
                <span class="tw-absolute tw-text-base tw-pl-4 tw-pt-1">Create password</span>
                <input
                  type="password"
                  placeholder="******"
                  :required="true"
                  class="tw-w-full tw-bg-gray-100 tw-p-4 tw-pt-7 tw-rounded-md tw-outline-black">
              </label>

              <label class="tw-block tw-cursor-pointer tw-select-none">
                <input
                  v-model="form.account_type"
                  type="radio"
                  name="account-type"
                  :value="AccountType.BUYER"
                  :required="true"
                  class="tw-appearance-none tw-peer">
                <div
                  class="tw-border-2 peer-checked:tw-border-black tw-text-gray-300 peer-checked:tw-text-black
                  tw-rounded-md tw-p-4 tw-font-medium tw-flex tw-justify-between">
                  <span>I am looking for items to buy</span>
                  <v-icon>mdi-check</v-icon>
                </div>
              </label>

              <label class="tw-block tw-cursor-pointer tw-select-none">
                <input
                  v-model="form.account_type"
                  type="radio"
                  name="account-type"
                  :value="AccountType.SELLER"
                  :required="true"
                  class="tw-appearance-none tw-peer">
                <div
                  class="tw-border-2 peer-checked:tw-border-black tw-text-gray-300 peer-checked:tw-text-black
                  tw-rounded-md tw-p-4 tw-font-medium tw-flex tw-justify-between">
                  <span>I sell stuff</span>
                  <v-icon>mdi-check</v-icon>
                </div>
              </label>

              <button
                class="tw-w-full tw-bg-black tw-text-white tw-py-4 tw-mt-10 tw-rounded-md tw-font-medium">
                Create account
              </button>
            </form>
          </div>
        </div>
      </div>

      <div class="tw-hidden lg:tw-block tw-h-[calc(100vh-80px)] tw-bg-gray-50">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/market-item-finder.appspot.com/o/pexels-laura-james-6097813.jpg?alt=media&token=93c36879-cf6d-42d9-a649-36d596582040"
          class="tw-w-full tw-h-full tw-object-cover">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Tabs from '@/components/Tabs.vue'
import { AccountType } from '@/types';

useHead({
  title: 'iMarket Finder - Register',
})

const tab = ref()
const tab_list:{ slug: string }[] = [
  { slug: AccountType.BUYER },
  { slug: AccountType.SELLER },
]

const form = ref({
  email: '',
  password: '',
  account_type: '' as AccountType,
})

const handleInitAccountSelected = (value: string) => {
  tab.value = value
  form.value.account_type = value as AccountType
}

const handleSignup = () => {
  console.log(form.value)
}
</script>