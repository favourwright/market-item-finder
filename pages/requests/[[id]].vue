<template>
  <div>
    <div class="tw-h-[70vh] tw-bg-gray-100">
      <v-col class="tw-h-full pa-0">
        <ClientOnly>
          <v-carousel v-model="carousel" cycle :show-arrows="(requestDetails?.images || []).length>1"
            hide-delimiter-background hide-delimiters height="100%">
            <v-carousel-item ripple v-for="(image, n) in requestDetails?.images" :key="n" :src="image" cover>
            </v-carousel-item>
          </v-carousel>
        </ClientOnly>
      </v-col>
    </div>
    <div v-if="!!requestDetails?.id">
      {{ requestDetails }}
    </div>
    <div v-else class="tw-text-center tw-py-20">
      <p class="tw-text-4xl tw-text-black">loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getDatabase, onValue, ref as RTDBRef } from 'firebase/database';
import { Request } from '@/types';

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
</script>