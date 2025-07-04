export default defineNuxtConfig({
  ssr: false,
  modules: [
    '../src/module',
    '@nuxt/ui',
    'nuxt-shiki',
    '@vueuse/nuxt',
    '@nuxt/image',
  ],
  css: ['~/assets/css/main.css'],

  kaspa: {
    network: 'testnet-10',
    url: 'wss://node.atomiklabs.org/kaspa/ws/testnet',
  },

  shiki: {
    bundledLangs: ['typescript', 'json', 'vue'],
    bundledThemes: ['github-dark-dimmed'],
    defaultLang: 'vue',
    defaultTheme: 'github-dark-dimmed',
  },

  devtools: { enabled: true },
  compatibilityDate: '2025-07-03',
})
