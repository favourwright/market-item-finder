// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-vuefire',
    '@invictus.codes/nuxt-vuetify',
    '@vueuse/nuxt',
  ],
  vuefire: {
    // ensures the auth module is enabled
    auth: true,
    config: {
      apiKey: "AIzaSyCSQO1pWYDLA8etQEllvb2_sVT0MMnyWM0",
      authDomain: "market-linkage-732c2.firebaseapp.com",
      projectId: "market-linkage-732c2",
      storageBucket: "market-linkage-732c2.appspot.com",
      messagingSenderId: "208499476732",
      appId: "1:208499476732:web:984cd0a35c54e692912f79",
      measurementId: "G-XMT3P8MG4K"
      // there could be other properties depending on the project
    },
  },
  ssr: false,
  runtimeConfig: {
    public: {
      appName: 'Finder'
    }
  },
  vuetify: {
    /* vuetify options */
    vuetifyOptions: {
      // @TODO: list all vuetify options
    }
  }
})
