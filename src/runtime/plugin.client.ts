import { defineNuxtPlugin, useRuntimeConfig } from "#app";
import { ref, shallowRef } from "vue";
import type { ModuleOptions } from "../module";
import type * as k from "./kaspa/kaspa";
// @ts-ignore
import url from "./kaspa/kaspa_bg.wasm?url";

export default defineNuxtPlugin(async (_nuxtApp) => {
  const kaspa = shallowRef<typeof k>();
  const rpc = shallowRef<k.RpcClient>();
  const loading = ref(true);
  const error = ref("");

  try {
    kaspa.value = await import(
      /* @vite-ignore */ new URL("./kaspa/kaspa.js", import.meta.url).href
    );

    const kas = kaspa.value!;
    await kas.default(url);

    const config = useRuntimeConfig().public.kaspa as ModuleOptions;

    rpc.value = new kas.RpcClient({
      encoding: kas.Encoding.Borsh,
      url: config.url,
      resolver: config.url ? undefined : new kas.Resolver(),
      networkId: config.network,
    });

    await rpc.value.connect();
    loading.value = false;
    console.log("Kaspa RPC connected:", rpc.value.url);
  } catch (e) {
    error.value = (e as Error).message || "Unknown error";
    console.error("Failed to initialize Kaspa:", error.value);
    loading.value = false;
  }

  return {
    provide: {
      kaspa: {
        instance: kaspa,
        loading,
        error,
        rpc,
      },
    },
  };
});
