import {
  addImportsDir,
  addPlugin,
  createResolver,
  defineNuxtModule,
} from '@nuxt/kit'
import { defu } from 'defu'
import { resolve } from 'pathe'

// Module options TypeScript interface definition
export interface ModuleOptions {
  network: 'mainnet' | 'testnet-10' | 'testnet-11'
  url?: string
}

const DEFAULTS: ModuleOptions = {
  network: 'testnet-10',
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@kaspa/nuxt',
    configKey: 'kaspa',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  defaults: DEFAULTS,
  setup(options, nuxt) {
    nuxt.options.runtimeConfig.public.kaspa = defu(options, {
      network: 'testnet-10',
    })

    const resolver = createResolver(import.meta.url)

    const runtimeDir = resolver.resolve('./runtime')
    nuxt.options.build.transpile.push(runtimeDir)

    for (const template of ['plugin.client', 'plugin.server']) {
      addPlugin(resolve(runtimeDir, template))
    }

    addImportsDir(resolve(runtimeDir, 'composables'))
  },
})
