<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items: NavigationMenuItem[][] = [
  [
    {
      label: 'Event Subscription',
      type: 'label',
      icon: 'i-lucide-podcast',
      active: true,
      defaultOpen: true,
      children: [
        {
          label: 'useSubscribeBlockAdded',
          to: '/subscriptions/block-added',
        },
        {
          label: 'useSubscribeFinalityConflict',
          to: '/subscriptions/finality-conflict',
        },
        {
          label: 'useSubscribeFinalityConflictResolved',
          to: '/subscriptions/finality-conflict-resolved',
        },
        {
          label: 'useSubscribeNewBlockTemplate',
          to: '/subscriptions/new-block-template',
        },
        {
          label: 'useSubscribePruningPointUtxoSetOverride',
          to: '/subscriptions/pruning-point-utxo-set-override',
        },
        {
          label: 'useSinkBlueScoreChanged',
          to: '/subscriptions/sink-blue-score-changed',
        },
        {
          label: 'useSubscribeUtxosChanged',
          to: '/subscriptions/utxos-changed',
        },
        {
          label: 'useSubscribeVirtualChainChanged',
          to: '/subscriptions/virtual-chain-changed',
        },
        {
          label: 'useSubscribeVirtualDaaScoreChanged',
          to: '/subscriptions/virtual-daa-score-changed',
        },
      ],
    },
  ],
]
</script>

<template>
  <div
    class="border-l border-neutral-200 dark:border-neutral-800 h-dvh overflow-y-auto"
  >
    <div class="font-bold text-xl p-4">Nuxt Kaspa Demo</div>
    <USeparator />
    <div class="p-4">
      <UNavigationMenu orientation="vertical" :items="items" />
    </div>
  </div>
</template>
