export default defineNuxtConfig({
  ssr: false,
  modules: ["../src/module"],
  kaspa: {
    network: "testnet-10",
  },
  devtools: { enabled: true },
  compatibilityDate: "2025-07-03",
});
