<template>
  <div class="tw-relative">
    <div
      :class="{ 'tw-text-gray-400 !tw-border-black/5': completed }"
      class="tw-border-2 tw-border-black/10 tw-relative tw-z-10 tw-bg-white">
      <div class="tw-p-2">
        <div class="sm:tw-flex">
          <div class="tw-flex-grow tw-flex tw-gap-2">
            <div
              :class="{ 'tw-opacity-40 tw-saturate-0': completed }"
              class="tw-h-full tw-aspect-square tw-bg-black tw-rounded-lg tw-relative tw-overflow-hidden
              tw-ring-1 tw-ring-black">
              <img
                :src="thumbnail"
                class="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-object-cover">
            </div>
            <div>
              <h3 class="tw-text-xl tw-truncate tw-font-semibold">{{ itemName }}</h3>
              <p class="tw-text-sm">ID: {{ requestId }}</p>

              <template v-if="lifecycle===RequestLifecycle.REQUEST_LOCKED || lifecycle===RequestLifecycle.COMPLETED">
                <p class="tw-text-sm">Buyer: {{ buyer?.username }}</p>
                <p class="tw-text-sm">Seller: {{ lockedSeller?.username }}</p>
                <p class="tw-text-sm">Price: {{ sellersPriceQuote }}</p>
              </template>
            </div>
          </div>
          <span class="tw-text-sm">{{ timeAgo }}</span>
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
            <template v-if="accountType === AccountType.BUYER">
              <v-icon>
                {{
                  (lifecycle!==RequestLifecycle.PENDING) ?
                    'mdi-checkbox-marked-circle' : 'mdi-timelapse'
                }}
                </v-icon>
              <span>seller</span>
            </template>
            <template v-else>
              <v-icon>mdi-checkbox-marked-circle</v-icon>
              <span>accepted</span>
            </template>
          </div>
          <div class="tw-flex tw-justify-center tw-items-center tw-gap-1">
            <template v-if="accountType === AccountType.SELLER">
              <v-icon>{{ lifecycle===RequestLifecycle.ACCEPTED_BY_BUYER ? 'mdi-checkbox-marked-circle' : 'mdi-timelapse' }}</v-icon>
              <span>buyer</span>
            </template>
            <template v-else>
              <v-icon>mdi-checkbox-marked-circle</v-icon>
              <span>accepted</span>
            </template>
          </div>
          <div class="tw-flex tw-justify-center tw-items-center tw-gap-1">
            <v-icon>{{ lifecycle===RequestLifecycle.REQUEST_LOCKED ? 'mdi-lock' : 'mdi-timelapse' }}</v-icon>
            <span>{{ lifecycle===RequestLifecycle.REQUEST_LOCKED ? 'locked' : 'locks in 15mins' }}</span>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="lifecycle===RequestLifecycle.REQUEST_LOCKED"
      class="tw-absolute tw-inset-0 tw-bg-black/20 tw-animate-ping">
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { AccountType, RequestLifecycle, User } from '@/types'
import { collection, where, query, limit, getDocs } from 'firebase/firestore';
import moment from 'moment'

interface Props {
  requestId: string
  isCompleted?: boolean
  lifecycle: RequestLifecycle
  itemName: string
  thumbnail: string
  createdAt: Date
  accountType: AccountType
  sellersPriceQuote: number | null
  buyerId: string
  lockedSellerId: string | null
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

const timeAgo = computed<string>(()=>moment(props.createdAt).fromNow())

const db = useFirestore()
const getUserDetails = async ({ uId }: { uId: string | null }) => {
  return new Promise<User>(async (resolve, reject) => {
    if (!uId) return resolve(null as unknown as User)
    const q = query(collection(db, "users"), where("id", "==", uId), limit(1));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      const user = doc.data() as User
      resolve(user)
    })
  })
}
const buyer = ref<User | null>(null)
const lockedSeller = ref<User | null>(null)
onMounted(()=>{
  Promise.all([
    getUserDetails({ uId: props.buyerId }),
    getUserDetails({ uId: props.lockedSellerId || null }),
  ]).then(([buyerDetails, lockedSellerDetails]) => {
    buyer.value = buyerDetails
    lockedSeller.value = lockedSellerDetails
  }).catch((err) => {
    console.log(err)
  })
})
</script>