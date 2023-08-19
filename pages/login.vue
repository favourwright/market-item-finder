<template>
  <div>
    <div class="tw-relative">
      <div class="tw-max-w-7xl tw-mx-auto lg:tw-absolute tw-inset-0 tw-p-6 sm:tw-p-10 tw-z-10">
        <div class="lg:tw-w-1/2 tw-bg-white sm:tw-p-6">
          <div>
            <h2 class="tw-text-5xl tw-font-bold">Welcome back!</h2>
            <form @submit.prevent="handleLogin" class="tw-mt-4 tw-text-2xl">
              <label class="tw-relative tw-block">
                <span class="tw-absolute tw-text-base tw-pl-4 tw-pt-1">Enter your email</span>
                <input
                  type="email"
                  placeholder="email@example.com"
                  :required="true"
                  class="tw-w-full tw-bg-gray-100 tw-p-4 tw-pt-7 tw-rounded-md tw-outline-black">
              </label>

              <label class="tw-relative tw-mt-4 tw-block">
                <span class="tw-absolute tw-text-base tw-pl-4 tw-pt-1">Enter your password</span>
                <input
                  type="password"
                  placeholder="******"
                  :required="true"
                  class="tw-w-full tw-bg-gray-100 tw-p-4 tw-pt-7 tw-rounded-md tw-outline-black">
              </label>

              <button
                class="tw-w-full tw-bg-black tw-text-white tw-py-4 tw-mt-10 tw-rounded-md tw-font-medium">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>

      <div class="tw-hidden lg:tw-block tw-h-[calc(100vh-80px)] tw-bg-gray-50">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/market-item-finder.appspot.com/o/pexels-laura-james-6097813.jpg?alt=media&token=93c36879-cf6d-42d9-a649-36d596582040"
          class="tw-w-full tw-h-full tw-object-cover tw-object-top">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'iMarket Finder - Register',
})

const form = ref({
  email: '',
  password: '',
})

const router = useRouter()
const handleLogin = () => {
  // console.log(form.value)
  router.push('/accounts/fddcjhdbjsdgjs')
}
</script>