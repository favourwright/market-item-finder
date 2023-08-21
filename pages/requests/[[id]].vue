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
    <div v-if="!!requestDetails?.id">
      {{ requestDetails }}
    </div>
    <div v-else class="tw-text-center tw-py-20">
      <p class="tw-text-4xl tw-text-black">loading...</p>
    </div>

    <v-dialog v-model="imagePreview" max-width="500">
      <div class="tw-bg-white tw-rounded-xl">
        <img
          :src="previewedImage"
          class="tw-h-full tw-w-full tw-object-contain">
      </div>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { getDatabase, onValue, ref as RTDBRef } from 'firebase/database';
import { Request } from '@/types';

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

const imagePreview = ref(false)
const previewedImage = ref('')
const previewImage = (src: string) => {
  imagePreview.value = true
  previewedImage.value = src
}
</script>