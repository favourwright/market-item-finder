<template>
  <div class="tw-max-w-7xl tw-mx-auto">
    <div class="tw-p-6 sm:tw-p-10 tw-text-2xl">
      <NuxtLink
        :to="'/accounts/'+user?.uid"
        class="tw-text-xl tw-font-medium tw-inline-flex tw-items-center tw-gap-2">
        <v-icon>mdi-chevron-left</v-icon>
        <span>Back to requests</span>
      </NuxtLink>

      <h1 class="tw-text-5xl tw-font-bold tw-mt-4">New request creation</h1>
      <p class="tw-text-gray-500">
        Please provide some details and images of the item you want to buy.
      </p>

      <form @submit.prevent="handleNewRequest" class="tw-text-2xl">
        <div class="tw-grid tw-grid-cols-3 tw-gap-10 tw-mt-6">
          <div class="tw-col-span-3 sm:tw-col-span-2 tw-row-start-1">
            <label class="tw-relative tw-block">
              <span class="tw-absolute tw-text-base tw-pl-4 tw-pt-1">Name of item</span>
              <input
                v-model="form.name"
                type="text"
                placeholder="Plastic Spatula"
                :required="true"
                class="tw-w-full tw-bg-gray-100 tw-p-4 tw-pt-7 tw-rounded-md tw-outline-black">
            </label>

            <label class="tw-relative tw-block tw-mt-6">
              <span class="tw-absolute tw-text-base tw-pl-4 tw-pt-1">Describe this items</span>
              <textarea
                v-model="form.description"
                placeholder="Any spatular made of plastic is fine but it must be pink"
                :required="true"
                class="tw-w-full tw-bg-gray-100 tw-p-4 tw-pt-7 tw-rounded-md tw-outline-black
                tw-min-h-[120px] tw-max-h-[120px]">
              </textarea>
            </label>

            <div class="tw-flex tw-bg-gray-100 tw-mt-4 tw-relative tw-rounded-lg">
              <span class="tw-absolute tw-text-base tw-pl-4 tw-pt-1">What is your store address?</span>
              <label for="state" class="tw-block tw-flex-grow sm:tw-max-w-[50%]">
                <select
                  v-model="form.state"
                  class="tw-block tw-w-full tw-outline-none tw-p-4 tw-pt-7 tw-capitalize 
                  placeholder:tw-text-gray-700"
                  name="state" id="state" :required="true">
                  <option value="">SELECT STATE</option>
                  <option v-for="(state,i) in stateNames" :key="i" :value="state">{{ state }}</option>
                </select>
              </label>
              <label for="lga" class="tw-block tw-border-l-2 tw-flex-grow sm:tw-max-w-[50%]">
                <select
                  v-model="form.lga"
                  class="tw-block tw-w-full tw-outline-none tw-p-4 tw-pt-7 tw-capitalize
                  placeholder:tw-text-gray-700"
                  name="lga" id="lga" :required="true">
                  <option value="">SELECT LGA</option>
                  <option v-for="(lga,i) in activeLgas" :key="i" :value="lga">{{ lga }}</option>
                </select>
              </label>
            </div>
            
            <label v-show="!!form.lga" for="lga" class="tw-block tw-mt-4 tw-relative">
              <span class="tw-absolute tw-text-base tw-pl-4 tw-pt-1">What market is store in</span>
              <select
                v-model="form.market"
                class="tw-block tw-w-full tw-outline-none tw-p-4 tw-pt-7 tw-capitalize
                placeholder:tw-text-gray-700 tw-bg-gray-100 tw-rounded-lg"
                name="lga" id="lga" :required="false">
                <option value="">SELECT MARKET</option>
                <option v-for="(market,i) in marketsInActiveLga" :key="i" :value="market">{{ market }}</option>
              </select>
            </label>
          </div>

          <button
            class="tw-w-full tw-bg-black tw-text-white tw-py-4 tw-rounded-md tw-font-medium
            tw-row-start-4 sm:tw-row-start-2 tw-col-start-1 tw-col-span-full sm:tw-col-span-2
            disabled:tw-bg-black/20"
            :disabled="submiting">
            <template v-if="!submiting">
              Create!
            </template>
            <v-progress-circular
              v-else
              indeterminate
              color="white"
              size="20" width="2">
            </v-progress-circular>
          </button>

          <div class="tw-col-span-3 sm:tw-col-span-1">
            <div class="tw-h-[300px] tw-bg-gray-100 tw-rounded-lg tw-overflow-hidden">
              <v-col class="tw-h-full pa-0">
                <ClientOnly>
                  <v-carousel v-model="carousel" cycle :show-arrows="true"
                    hide-delimiter-background hide-delimiters height="100%">
                    <v-carousel-item ripple v-for="(image, n) in spatularImages" :key="n" :src="image" cover>
                    </v-carousel-item>
                  </v-carousel>
                </ClientOnly>
              </v-col>
            </div>
          </div>
          <button
            type="button"
            class="tw-w-full tw-bg-black tw-text-white tw-py-3 tw-rounded-md tw-font-medium tw-mt-6
            tw-col-span-full sm:tw-col-span-1 tw-text-base">
            <span>Add image</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getDatabase, ref as RTDBRef, set } from "firebase/database";
import states from '@/nigerian-states.json'

definePageMeta({
  middleware: ['auth', 'buyer'],
  requiresAuth: true,
})

const user = useCurrentUser()

// function writeUserData(userId:string, name:string, email:string, imageUrl:string) {
//   const db = getDatabase();
//   set(ref(db, 'users/' + userId), {
//     username: name,
//     email: email,
//     profile_picture : imageUrl
//   });
// }
// onMounted(()=>writeUserData('1', 'name', 'email', 'imageUrl'))
const form = ref({
  name: '',
  description: '',
  images: [],
  state: '',
  lga: '',
  market: '',
})

const carousel = ref(0)
const spatularImages = [
  "https://firebasestorage.googleapis.com/v0/b/i-get-am.appspot.com/o/istockphoto-1167356564-612x612.jpg?alt=media&token=ec1b8ee2-d532-4204-a1f3-c66833ee694e",
  "https://firebasestorage.googleapis.com/v0/b/i-get-am.appspot.com/o/istockphoto-1270011649-612x612.jpg?alt=media&token=210f6704-b960-437a-b30b-3ea4c3a146ff",
  "https://firebasestorage.googleapis.com/v0/b/i-get-am.appspot.com/o/istockphoto-134724298-612x612.jpg?alt=media&token=adf99e2d-daef-41f9-af29-4fc4fbb72284"
]

const statesAndLga = states as {
  code: string
  name: string
  lgas: string[]
}[]
const stateNames = computed(()=>{
  return statesAndLga.map(state=>state.name)
})
watch(()=>form.value.state, (value)=>{
  if(!value) return
  form.value.lga = ''
})
const activeLgas = computed(()=>{
  const state = statesAndLga.find(state=>state.name === form.value.state)
  return state?.lgas || []
})
const recordedMarkets = {
  "aba": [
    "aba main market",
    "ahia ohuru (new market)",
    "eziukwu market",
    "ariaria international market",
    "cemetery market",
  ],
  "nsukka": [
    "odenigbo market",
    "orie oba market",
    "orie iheaka market",
    "orie ofulonu market",
    "orie nru market",
    "orie eha alumona market",
    "orie opi market",
    "orie edem market",
    "orie ibagwa market",
    "orie ovoko market",
    "ogige market",
  ],
  "onitsha-north": [
    "onitsha main market",
    "ogboefere market",
    "ogbo ogwu market",
    "ogbo ogwu new market",
    "ogbo ogwu timber market",
    "ogbo ogwu motor parts market",
    "ogbo ogwu building materials market",
    "ogbo ogwu electrical materials market",
    "ogbo ogwu auto spare parts market",
    "ogbo ogwu iron and steel market",
    "ogbo ogwu plastic market",
    "ogbo ogwu textile market",
    "ogbo ogwu foodstuff market",
    "ogbo ogwu yam market",
  ],
  "enugu-east": [
    "abakpa market",
    "new haven market",
  ],
}
const marketsInActiveLga = computed(()=>{
  const markets = recordedMarkets[form.value.lga]
  return markets || []
})
watch(()=>form.value.lga, (value)=>{
  if(!value) return
  form.value.market = ''
})

const submiting = ref(false)
const handleNewRequest = () => {
  console.log({ form: form.value })
}
</script>