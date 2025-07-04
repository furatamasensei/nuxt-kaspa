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
  },

  shiki: {
    bundledLangs: ['typescript', 'json', 'vue'],
    bundledThemes: ['github-dark-dimmed'],
    defaultLang: 'vue',
    defaultTheme: 'github-dark-dimmed',
    highlightOptions: {
      unwrap: true,
    },
  },

  devtools: { enabled: true },
  compatibilityDate: '2025-07-03',
})