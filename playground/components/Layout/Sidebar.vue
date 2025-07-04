<script setup lang="ts">
const demoItems = [
  {
    to: '/subscriptions/block-added',
    title: 'useSubscribeBlockAdded',
    description: 'Listen to block-added event',
  },
  {
    to: '/subscriptions/finality-conflict',
    title: 'useSubscribeFinalityConflict',
    description: 'Listen to finality-conflict event',
  },
  {
    to: '/subscriptions/finality-conflict-resolved',
    title: 'useSubscribeFinalityConflictResolved',
    description: 'Listen to finality-conflict-resolved event',
  },
  {
    to: '/subscriptions/new-block-template',
    title: 'useSubscribeNewBlockTemplate',
    description: 'Listen to new-block-template event',
  },
  {
    to: '/subscriptions/pruning-point-utxo-set-override',
    title: 'useSubscribePruningPointUtxoSetOverride',
    description: 'Listen to pruning-point-utxo-set-override event',
  },
  {
    to: '/subscriptions/sink-blue-score-changed',
    title: 'useSinkBlueScoreChanged',
    description: 'Listen to sink-blue-score-changed event',
  },
  {
    to: '/subscriptions/utxos-changed',
    title: 'useSubscribeUtxosChanged',
    description: 'Listen to utxos-changed event',
  },
  {
    to: '/subscriptions/virtual-chain-changed',
    title: 'useSubscribeVirtualChainChanged',
    description: 'Listen to virtual-chain-changed event',
  },
  {
    to: '/subscriptions/virtual-daa-score-changed',
    title: 'useSubscribeVirtualDaaScoreChanged',
    description: 'Listen to virtual-daa-score-changed event',
  },
]
</script>

<template>
  <div
    class="border-l border-neutral-200 dark:border-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-800 h-dvh overflow-y-auto"
  >
    <div class="p-4">
      <div class="font-bold text-xl">Nuxt Kaspa Demo</div>
    </div>
    <DemoItem
      v-for="item in demoItems"
      :key="item.to"
      :to="item.to"
      :title="item.title"
      :description="item.description"
    />
  </div>
</template>
