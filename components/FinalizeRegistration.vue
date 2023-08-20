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
        <div>
          <h2 class="tw-text-5xl tw-font-bold">Finish Registration</h2>
          <form @submit.prevent="handleFinalSignup" class="tw-mt-4 tw-text-2xl">
            <div class="tw-overflow-y-auto tw-max-h-[60vh] tw-p-1">
              <label class="tw-relative tw-block">
                <span class="tw-absolute tw-text-base tw-pl-4 tw-pt-1">What do we call you?</span>
                <input
                  type="text"
                  placeholder="Arya Stark"
                  :required="true"
                  class="tw-w-full tw-bg-gray-100 tw-p-4 tw-pt-7 tw-rounded-md tw-outline-black">
              </label>
  
              <label class="tw-relative tw-mt-4 tw-block">
                <span class="tw-absolute tw-text-base tw-pl-4 tw-pt-1">Contact number</span>
                <input
                  type="number"
                  placeholder="+234 901 2345 678"
                  :required="true"
                  class="tw-w-full tw-bg-gray-100 tw-p-4 tw-pt-7 tw-rounded-md tw-outline-black">
              </label>
  
              <fieldset class="tw-border-t-4 tw-my-10">
                <legend class="tw-px-4 tw-text-center">
                  <h2 class="tw-text-gray-600">About your store</h2>
                </legend>
              </fieldset>
  
              <label class="tw-relative tw-block">
                <span class="tw-absolute tw-text-base tw-pl-4 tw-pt-1">What is your store name?</span>
                <input
                  type="text"
                  placeholder="Arya's Clothing"
                  :required="true"
                  class="tw-w-full tw-bg-gray-100 tw-p-4 tw-pt-7 tw-rounded-md tw-outline-black">
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
              
              <small
                v-if="!!form.lga && !marketsInActiveLga.length"
                class="tw-bg-black tw-text-white tw-px-1 tw-mt-2">
                <v-icon size="20">mdi-alert-circle</v-icon>
                Seems like we haven't added your market yet. Please contact us to add it.
              </small>
            </div>

            <button
              class="tw-w-full tw-bg-black tw-text-white tw-py-4 tw-mt-10 tw-rounded-md tw-font-medium">
              Finish
            </button>
          </form>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { AccountType } from '@/types';
import { ref } from 'vue'
import states from '@/nigerian-states.json'

interface Props {
  modelValue: boolean
}
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const isCompleted = ref(false)
const modal = ref(false)

const form = ref({
  email: '',
  password: '',
  account_type: '' as AccountType,
  state: '',
  lga: '',
  market: '',
})

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

const handleFinalSignup = () => {
  isCompleted.value = true
  modal.value = false
}
</script>