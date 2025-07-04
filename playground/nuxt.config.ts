export default defineNuxtConfig({
  ssr: false,
  modules: ['../src/module', '@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  kaspa: {
    network: 'testnet-10',
  },
  devtools: { enabled: true },
  compatibilityDate: '2025-07-03',
})
