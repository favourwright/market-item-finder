<template>
  <div>
    <div class="tw-h-[70vh] tw-bg-gray-100 tw-relative">
      <v-col class="tw-h-full pa-0">
        <ClientOnly>
          <v-carousel v-model="carousel" cycle :show-arrows="(requestDetails?.images || []).length>1"
            hide-delimiter-background hide-delimiters height="100%">
            <v-carousel-item ripple v-for="(image, n) in requestDetails?.images" :key="n" :src="image" cover>
              <div class="tw-absolute tw-inset-x-0 tw-bottom-0 tw-max-w-7xl tw-mx-auto">
                <div class="tw-p-6 sm:tw-p-10 tw-flex tw-justify-end">
                  <button
                    @click="previewImage(image)"
                    class="tw-bg-black tw-text-white tw-p-1 tw-ring-1 tw-ring-white/30">
                    <v-icon>mdi-arrow-expand-all</v-icon>
                  </button>
                </div>
              </div>
            </v-carousel-item>
          </v-carousel>
        </ClientOnly>
      </v-col>
    </div>
    <div v-if="!!requestDetails?.id" class="tw-max-w-7xl tw-mx-auto tw-p-6 sm:tw-p-10">
      <Tabs
        :tab_list="tab_list"
        :value="tab"
        @model-value="($event) => tab = $event"
        class="tw-inline-flex tw-gap-x-1 sm:tw-gap-x-2 tw-justify-between
        tw-rounded-sm tw-w-full [&>*]:tw-flex-grow [&>*]:tw-max-w-[50%] sm:tw-hidden">
        <template v-slot:tab="{ tab, index: i, is_active }">
          <div
            :class="[is_active ? 'tw-border-black' : 'tw-text-gray-400 tw-border-transparent']"
            class="tw-border-b-4 tw-py-2 tw-transition tw-duration-300 tw-font-medium tw-cursor-pointer">
            <span class="tw-flex tw-flex-col tw-items-center">
              <span>{{ tab?.name }}</span>
            </span>
          </div>
        </template>
      </Tabs>

      <div>
        <div class="tw-grid sm:tw-grid-cols-3 tw-gap-10 tw-pt-4 sm:tw-pt-0">
          <div
            :class="{ 'tw-hidden sm:tw-block': tab !== tab_list[0].slug }"
            class="sm:tw-col-span-2 tw-space-y-14">
            <div>
              <h2 class="tw-text-5xl tw-font-bold tw-bg-black tw-text-white">
                {{ requestDetails.name }}
              </h2>
              <p>{{ timeAgo }}</p>
            </div>

            <div class="">
              <h3 class="tw-text-5xl tw-font-bold">Description</h3>
              <p class="tw-mt-2 tw-text-2xl">{{ requestDetails.description }}</p>
            </div>

            <div class="">
              <h3 class="tw-text-5xl tw-font-bold">Target Market</h3>
              <p class="tw-mt-2 tw-text-2xl tw-capitalize">
                {{ !!requestDetails?.market ? `${requestDetails?.market}, ` : '' }}
                {{ `${requestDetails?.lga}, ${requestDetails?.state}` }}
              </p>
            </div>
          </div>
          
          <div
            :class="{ 'tw-hidden sm:tw-block': tab !== tab_list[1].slug }"
            class="sm:tw-col-span-1">
            sellers
          </div>
        </div>
      </div>

    </div>
    <div v-else class="tw-text-center tw-py-20">
      <p class="tw-text-4xl tw-text-black">loading...</p>
    </div>

    <v-dialog v-model="imagePreview" max-width="500">
      <div>
        <img
          :src="previewedImage"
          class="tw-h-full tw-w-full tw-object-contain">
      </div>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { getDatabase, onValue, ref as RTDBRef } from 'firebase/database';
import { AccountType, Request, User } from '@/types';
import moment from 'moment'

definePageMeta({
  middleware: 'auth',
  requiresAuth: true,
})

const route = useRoute()
const router = useRouter()
if(!route.params.id) router.push('/')

const carousel = ref(0)

const requestDetails = ref<Request>()
// fetching from firebase RTDB
const fetchUserRequests = async () => {
  const db = getDatabase();
  const myRequestsRef = RTDBRef(db, 'requests/'+route.params.id)
  onValue(myRequestsRef, (snapshot) => {
    const data = {
      ...snapshot.val(),
      id: snapshot.key
    }
    requestDetails.value = data
  });
}
onMounted(fetchUserRequests)
const timeAgo = computed<string>(()=>{
  if(!requestDetails.value) return ''
  return moment(new Date(requestDetails.value.createdAt.seconds*1000)).fromNow()
})


const imagePreview = ref(false)
const previewedImage = ref('')
const previewImage = (src: string) => {
  imagePreview.value = true
  previewedImage.value = src
}

const user = useCurrentUser()
const userCookie = useCookie<User>('user')
const isSeller = computed(() => userCookie.value?.accountType === AccountType.SELLER)
const isBuyer = computed(() => userCookie.value?.accountType === AccountType.BUYER) 

const tab = ref()
const tab_list = ref<{ name: string, slug: string }[]>([])
onBeforeMount(()=>{
  if (isSeller.value) {
    tab_list.value = [
      { name: 'Details', slug: 'details' },
      { name: 'My offer', slug: 'seller' },
    ]
    return
  }

  tab_list.value = [
    { name: 'Details', slug: 'details' },
    { name: 'Sellers offers', slug: 'seller' },
  ]
})
</script>