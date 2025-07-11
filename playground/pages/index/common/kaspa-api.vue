<script setup lang="ts">
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'
import type {
  KaspaRestCalculateTransactionMassParams,
  KaspaRestTransactionSearchParams,
} from '../../../../src/runtime/types'

const api = useKaspaApi()

const kaspaAddress = ref(
  'kaspatest:qz2ljv3twfvnsuunlhxxgqvlvga3pap2w4ccfeytgaxd4asulkszwanfkeu3k',
)

const {
  execute: getBalance,
  data: balance,
  status: balanceStatus,
} = useAsyncData(
  () => {
    return api.getBalance(kaspaAddress.value)
  },
  { immediate: false },
)

const kaspaAddresses = ref<string[]>([
  'kaspatest:qz2ljv3twfvnsuunlhxxgqvlvga3pap2w4ccfeytgaxd4asulkszwanfkeu3k',
  'kaspatest:qrpa8funyhwwrqmjcld3xjqzwskp9d9qp49p3xyhnpntwwe33pav5y5vh2nnl',
  'kaspatest:qryut4j4z6gtzw6cmazdw9w2tlqtqs8dmt2y58y77g00xvshnkras7ceex3kh',
])

const addKaspaAddress = () => kaspaAddresses.value.push('')
const remKaspaAddress = (index: number) => {
  kaspaAddresses.value.splice(index, 1)
}

const {
  execute: postBalance,
  data: balances,
  status: balancesStatus,
} = useAsyncData(
  () => {
    return api.postBalance({
      addresses: kaspaAddresses.value,
    })
  },
  { immediate: false },
)

const {
  execute: getUtxos,
  data: utxos,
  status: utxosStatus,
} = useAsyncData(
  () => {
    return api.getUtxos(kaspaAddress.value)
  },
  { immediate: false },
)

const {
  execute: postUtxos,
  data: bulkUtxos,
  status: bulkUtxosStatus,
} = useAsyncData(
  () => {
    return api.postUtxos({
      addresses: kaspaAddresses.value,
    })
  },
  { immediate: false },
)

const {
  execute: getFullTransactions,
  data: transactions,
  status: transactionsStatus,
} = useAsyncData(
  () => {
    return api.getFullTransactions(kaspaAddress.value)
  },
  { immediate: false },
)

const {
  execute: getTransactionsCount,
  data: transactionsCount,
  status: transactionsCountStatus,
} = useAsyncData(
  () => {
    return api.getTransactionsCount(kaspaAddress.value)
  },
  { immediate: false },
)

const {
  execute: getBlockdagInfo,
  data: blockdagInfo,
  status: blockdagInfoStatus,
} = useAsyncData(() => api.getInfoBlockdagInfo(), {
  immediate: false,
})

const {
  execute: getInfoCoinSupply,
  data: infoCoinSupply,
  status: infoCoinSupplyStatus,
} = useAsyncData(() => api.getInfoCoinsupply(), {
  immediate: false,
})

const {
  execute: getInfoCoinsupplyCirculating,
  data: infoCoinsupplyCirculating,
  status: infoCoinsupplyCirculatingStatus,
} = useAsyncData(() => api.getInfoCoinsupplyCirculating(), {
  immediate: false,
})

const {
  execute: getInfoCoinsupplyTotal,
  data: infoCoinsupplyTotal,
  status: infoCoinsupplyTotalStatus,
} = useAsyncData(() => api.getInfoCoinsupplyTotal(), {
  immediate: false,
})

const {
  execute: getInfoKaspad,
  data: infoKaspad,
  status: infoKaspadStatus,
} = useAsyncData(() => api.getInfoKaspad(), {
  immediate: false,
})

const {
  execute: getInfoNetwork,
  data: infoNetwork,
  status: infoNetworkStatus,
} = useAsyncData(() => api.getInfoNetwork(), {
  immediate: false,
})

const {
  execute: getInfoFeeEstimate,
  data: infoFeeEstimate,
  status: infoFeeEstimateStatus,
} = useAsyncData(() => api.getInfoFeeEstimate(), {
  immediate: false,
})

const {
  execute: getInfoBlockReward,
  data: infoBlockReward,
  status: infoBlockRewardStatus,
} = useAsyncData(() => api.getInfoBlockReward(), {
  immediate: false,
})

const {
  execute: getInfoHalving,
  data: infoHalving,
  status: infoHalvingStatus,
} = useAsyncData(() => api.getInfoHalving(), {
  immediate: false,
})

const {
  execute: getInfoHashRate,
  data: infoHashRate,
  status: infoHashRateStatus,
} = useAsyncData(() => api.getInfoHashRate(), {
  immediate: false,
})

const {
  execute: getInfoHashRateMax,
  data: infoHashRateMax,
  status: infoHashRateMaxStatus,
} = useAsyncData(() => api.getInfoHashRateMax(), {
  immediate: false,
})

const {
  execute: getInfoHealth,
  data: infoHealth,
  status: infoHealthStatus,
} = useAsyncData(() => api.getInfoHealth(), {
  immediate: false,
})

const {
  execute: getInfoMarketcap,
  data: infoMarketcap,
  status: infoMarketcapStatus,
} = useAsyncData(() => api.getInfoMarketcap(), {
  immediate: false,
})

const blockId = ref(
  'e5219eaa378c549bc4c1292e9ca0a14ca9de79fa96ba786bb351c331216f9673',
)

const {
  execute: getBlocksBlockId,
  data: blocksBlockId,
  status: blocksBlockIdStatus,
} = useAsyncData(() => api.getBlocksBlockId(blockId.value), {
  immediate: false,
})

const {
  execute: getBlocks,
  data: blocks,
  status: blocksStatus,
} = useAsyncData(() => api.getBlocks(blockId.value), {
  immediate: false,
})

const blueScore = ref(196398514)

const {
  execute: getBlocksFromBluescore,
  data: blocksFromBluescore,
  status: blocksFromBluescoreStatus,
} = useAsyncData(() => api.getBlocksFromBluescore(blueScore.value), {
  immediate: false,
})

const transactionId = ref(
  '762665a5f9f10b917912702407a2ab99c4d7151f3c9f8e5f6be044f253bc1dfc',
)

const {
  execute: getTransactionsId,
  data: transactionsId,
  status: transactionsIdStatus,
} = useAsyncData(() => api.getTransactionsId(transactionId.value), {
  immediate: false,
})

const transactionSearchParams = reactive<KaspaRestTransactionSearchParams>({
  transactionIds: [
    '7de28449e3abe652d1d7549611e218c3da3c365ec4795ada5640b543a25aebfc',
  ],
  acceptingBlueScores: {
    gte: 196411600,
    lt: 196411784,
  },
})

const {
  execute: postTransactionsSearch,
  data: transactionSearch,
  status: transactionSearchStatus,
} = useAsyncData(() => api.postTransactionsSearch(transactionSearchParams), {
  immediate: false,
})

const postTransactionMassParams =
  reactive<KaspaRestCalculateTransactionMassParams>({
    version: 0,
    inputs: [
      {
        previousOutpoint: {
          transactionId:
            '7de28449e3abe652d1d7549611e218c3da3c365ec4795ada5640b543a25aebfc',
          index: 0,
        },
        sequence: 0,
        signatureScript:
          '41ed78dddeb4393119f13235856e32c80662e7fe678f9e02c47382fb621a4795338b10e174b4bd25b7863a0afc5c24bbe8c47b06f0a7d27c2fa6be4422fab8072101',
        sigOpCount: 1,
      },
    ],
    outputs: [
      {
        amount: 255968346440,
        scriptPublicKey: {
          version: 0,
          scriptPublicKey:
            '20137cb4c5936999971396afa6a498728572f43256dabb11e07ed20b78c1fbea85ac',
        },
      },
    ],
    lockTime: 1752262962652,
    subnetworkId: '0000000000000000000000000000000000000000',
  })

const {
  execute: postTransactionsMass,
  data: transactionMass,
  status: transactionMassStatus,
} = useAsyncData(() => api.postTransactionsMass(postTransactionMassParams), {
  immediate: false,
})
</script>

<template>
  <UCard variant="subtle">
    <template #header>
      <div class="text-lg font-semibold">useKaspaApi</div>
    </template>
    <div class="space-y-6">
      <InteractivePanel
        title="getBalance"
        description="Get balance for the specified Kaspa address"
      >
        <UTextarea
          v-model="kaspaAddress"
          :rows="5"
          class="size-full"
          variant="subtle"
          placeholder="Paste your wallet address here"
        />
        <UButton
          class="mt-4"
          :disabled="!kaspaAddress.length"
          :loading="balanceStatus === 'pending'"
          block
          color="neutral"
          @click="getBalance()"
        >
          Execute
        </UButton>
        <template #bottom>
          <UCard v-if="balance" variant="subtle" class="mt-4">
            <VueJsonPretty
              :data="balance as Record<string, any>"
              :deep="2"
              class="mt-4"
              theme="dark"
              style="max-height: 300px; overflow-y: auto"
            />
          </UCard>
        </template>
      </InteractivePanel>

      <USeparator />

      <InteractivePanel
        title="postBalance"
        description="Get balance from multiple Kaspa addresses"
      >
        <template v-for="(_, index) in kaspaAddresses" :key="index">
          <div class="grid grid-cols-12 gap-2 mt-2 first:mt-0">
            <div :class="[index === 0 ? 'col-span-12' : 'col-span-10']">
              <UTextarea
                v-model="kaspaAddresses[index]"
                :rows="2"
                class="size-full"
                variant="subtle"
                placeholder="Paste your wallet address here"
              />
            </div>
            <div :class="[index === 0 ? 'hidden' : 'col-span-2']">
              <UButton
                class="size-full"
                color="error"
                variant="subtle"
                :disabled="kaspaAddresses.length <= 1"
                @click="remKaspaAddress(index)"
              >
                <div class="size-full flex items-center justify-center">
                  <UIcon name="i-lucide-trash-2" :size="20" />
                </div>
              </UButton>
            </div>
          </div>
        </template>
        <div class="grid grid-cols-2 gap-4 mt-4">
          <UButton
            block
            color="neutral"
            variant="subtle"
            @click="addKaspaAddress()"
            >Add New Address</UButton
          >
          <UButton
            :disabled="!kaspaAddress.length"
            :loading="balancesStatus === 'pending'"
            block
            color="neutral"
            @click="postBalance()"
          >
            Execute
          </UButton>
        </div>
        <template #bottom>
          <UCard v-if="balances" variant="subtle" class="mt-4">
            <VueJsonPretty
              :data="balances as Record<string, any>"
              :deep="2"
              class="mt-4"
              theme="dark"
              style="max-height: 300px; overflow-y: auto"
            />
          </UCard>
        </template>
      </InteractivePanel>

      <USeparator />

      <InteractivePanel
        title="getUtxos"
        description="Get a list of utxos for the specified Kaspa address"
      >
        <UTextarea
          v-model="kaspaAddress"
          :rows="5"
          class="size-full"
          variant="subtle"
          placeholder="Paste your wallet address here"
        />
        <UButton
          class="mt-4"
          :disabled="!kaspaAddress.length"
          :loading="utxosStatus === 'pending'"
          block
          color="neutral"
          @click="getUtxos()"
        >
          Execute
        </UButton>
        <template #bottom>
          <UCard v-if="utxos" variant="subtle" class="mt-4">
            <VueJsonPretty
              :data="utxos as Record<string, any>"
              :deep="2"
              class="mt-4"
              theme="dark"
              style="max-height: 300px; overflow-y: auto"
            />
          </UCard>
        </template>
      </InteractivePanel>

      <USeparator />

      <InteractivePanel
        title="postUtxos"
        description="Get utxos from multiple Kaspa addresses"
      >
        <template v-for="(_, index) in kaspaAddresses" :key="index">
          <div class="grid grid-cols-12 gap-2 mt-2 first:mt-0">
            <div :class="[index === 0 ? 'col-span-12' : 'col-span-10']">
              <UTextarea
                v-model="kaspaAddresses[index]"
                :rows="2"
                class="size-full"
                variant="subtle"
                placeholder="Paste your wallet address here"
              />
            </div>
            <div :class="[index === 0 ? 'hidden' : 'col-span-2']">
              <UButton
                class="size-full"
                color="error"
                variant="subtle"
                :disabled="kaspaAddresses.length <= 1"
                @click="remKaspaAddress(index)"
              >
                <div class="size-full flex items-center justify-center">
                  <UIcon name="i-lucide-trash-2" :size="20" />
                </div>
              </UButton>
            </div>
          </div>
        </template>
        <div class="grid grid-cols-2 gap-4 mt-4">
          <UButton
            block
            color="neutral"
            variant="subtle"
            @click="addKaspaAddress()"
            >Add New Address</UButton
          >
          <UButton
            :disabled="!kaspaAddress.length"
            :loading="bulkUtxosStatus === 'pending'"
            block
            color="neutral"
            @click="postUtxos()"
          >
            Execute
          </UButton>
        </div>
        <template #bottom>
          <UCard v-if="bulkUtxos" variant="subtle" class="mt-4">
            <VueJsonPretty
              :data="bulkUtxos as Record<string, any>"
              :deep="2"
              class="mt-4"
              theme="dark"
              style="max-height: 300px; overflow-y: auto"
            />
          </UCard>
        </template>
      </InteractivePanel>

      <USeparator />

      <InteractivePanel
        title="getFullTransactions"
        description="Get full transactions for the specified Kaspa address"
      >
        <UTextarea
          v-model="kaspaAddress"
          :rows="5"
          class="size-full"
          variant="subtle"
          placeholder="Paste your wallet address here"
        />
        <UButton
          class="mt-4"
          :disabled="!kaspaAddress.length"
          :loading="transactionsStatus === 'pending'"
          block
          color="neutral"
          @click="getFullTransactions()"
        >
          Execute
        </UButton>
        <template #bottom>
          <UCard v-if="transactions" variant="subtle" class="mt-4">
            <VueJsonPretty
              :data="transactions as Record<string, any>"
              :deep="2"
              class="mt-4"
              theme="dark"
              style="max-height: 300px; overflow-y: auto"
            />
          </UCard>
        </template>
      </InteractivePanel>

      <USeparator />

      <InteractivePanel
        title="getTransactionsCount"
        description="Get transactions count for the specified Kaspa address"
      >
        <UTextarea
          v-model="kaspaAddress"
          :rows="5"
          class="size-full"
          variant="subtle"
          placeholder="Paste your wallet address here"
        />
        <UButton
          class="mt-4"
          :disabled="!kaspaAddress.length"
          :loading="transactionsCountStatus === 'pending'"
          block
          color="neutral"
          @click="getTransactionsCount()"
        >
          Execute
        </UButton>
        <template #bottom>
          <UCard v-if="transactionsCount" variant="subtle" class="mt-4">
            <VueJsonPretty
              :data="transactionsCount as Record<string, any>"
              :deep="2"
              class="mt-4"
              theme="dark"
              style="max-height: 300px; overflow-y: auto"
            />
          </UCard>
        </template>
      </InteractivePanel>

      <USeparator />

      <InteractivePanel
        title="getInfoBlockdagInfo"
        description="Get Kaspa blockdag info"
      >
        <UButton
          class="mt-4"
          :loading="blockdagInfoStatus === 'pending'"
          block
          color="neutral"
          @click="getBlockdagInfo()"
        >
          Execute
        </UButton>
        <template #bottom>
          <UCard v-if="blockdagInfo" variant="subtle" class="mt-4">
            <VueJsonPretty
              :data="blockdagInfo as Record<string, any>"
              :deep="2"
              class="mt-4"
              theme="dark"
              style="max-height: 300px; overflow-y: auto"
            />
          </UCard>
        </template>
      </InteractivePanel>

      <USeparator />

      <InteractivePanel
        title="getInfoCoinSupply"
        description="Get Kaspa coin supply info"
      >
        <UButton
          class="mt-4"
          :loading="infoCoinSupplyStatus === 'pending'"
          block
          color="neutral"
          @click="getInfoCoinSupply()"
        >
          Execute
        </UButton>
        <template #bottom>
          <UCard v-if="infoCoinSupply" variant="subtle" class="mt-4">
            <VueJsonPretty
              :data="infoCoinSupply"
              :deep="2"
              class="mt-4"
              theme="dark"
              style="max-height: 300px; overflow-y: auto"
            />
          </UCard>
        </template>
      </InteractivePanel>

      <USeparator />

      <InteractivePanel
        title="getInfoCoinsupplyCirculating"
        description="Get Kaspa coin supply circulating info"
      >
        <UButton
          class="mt-4"
          :loading="infoCoinsupplyCirculatingStatus === 'pending'"
          block
          color="neutral"
          @click="getInfoCoinsupplyCirculating()"
        >
          Execute
        </UButton>
        <template #bottom>
          <UCard v-if="infoCoinsupplyCirculating" variant="subtle" class="mt-4">
            <VueJsonPretty
              :data="infoCoinsupplyCirculating"
              :deep="2"
              class="mt-4"
              theme="dark"
              style="max-height: 300px; overflow-y: auto"
            />
          </UCard>
        </template>
      </InteractivePanel>

      <USeparator />

      <InteractivePanel
        title="getInfoCoinsupplyTotal"
        description="Get Kaspa coin supply total info"
      >
        <UButton
          class="mt-4"
          :loading="infoCoinsupplyTotalStatus === 'pending'"
          block
          color="neutral"
          @click="getInfoCoinsupplyTotal()"
        >
          Execute
        </UButton>
        <template #bottom>
          <UCard v-if="infoCoinsupplyTotal" variant="subtle" class="mt-4">
            <VueJsonPretty
              :data="infoCoinsupplyTotal"
              :deep="2"
              class="mt-4"
              theme="dark"
              style="max-height: 300px; overflow-y: auto"
            />
          </UCard>
        </template>
      </InteractivePanel>

      <USeparator />

      <InteractivePanel title="getInfoKaspad" description="Get Kaspad info">
        <UButton
          class="mt-4"
          :loading="infoKaspadStatus === 'pending'"
          block
          color="neutral"
          @click="getInfoKaspad()"
        >
          Execute
        </UButton>
        <template #bottom>
          <UCard v-if="infoKaspad" variant="subtle" class="mt-4">
            <VueJsonPretty
              :data="infoKaspad as Record<string, any>"
              :deep="2"
              class="mt-4"
              theme="dark"
              style="max-height: 300px; overflow-y: auto"
            />
          </UCard>
        </template>
      </InteractivePanel>

      <USeparator />

      <InteractivePanel title="getInfoNetwork" description="Get Network info">
        <UButton
          class="mt-4"
          :loading="infoNetworkStatus === 'pending'"
          block
          color="neutral"
          @click="getInfoNetwork()"
        >
          Execute
        </UButton>
        <template #bottom>
          <UCard v-if="infoNetwork" variant="subtle" class="mt-4">
            <VueJsonPretty
              :data="infoNetwork as Record<string, any>"
              :deep="2"
              class="mt-4"
              theme="dark"
              style="max-height: 300px; overflow-y: auto"
            />
          </UCard>
        </template>
      </InteractivePanel>

      <USeparator />

      <InteractivePanel
        title="getInfoFeeEstimate"
        description="Get Fee Estimate info"
      >
        <UButton
          class="mt-4"
          :loading="infoFeeEstimateStatus === 'pending'"
          block
          color="neutral"
          @click="getInfoFeeEstimate()"
        >
          Execute
        </UButton>
        <template #bottom>
          <UCard v-if="infoFeeEstimate" variant="subtle" class="mt-4">
            <VueJsonPretty
              :data="infoFeeEstimate as Record<string, any>"
              :deep="2"
              class="mt-4"
              theme="dark"
              style="max-height: 300px; overflow-y: auto"
            />
          </UCard>
        </template>
      </InteractivePanel>

      <USeparator />

      <InteractivePanel
        title="getInfoBlockReward"
        description="Get Block Reward info"
      >
        <UButton
          class="mt-4"
          :loading="infoBlockRewardStatus === 'pending'"
          block
          color="neutral"
          @click="getInfoBlockReward()"
        >
          Execute
        </UButton>
        <template #bottom>
          <UCard v-if="infoBlockReward" variant="subtle" class="mt-4">
            <VueJsonPretty
              :data="infoBlockReward as Record<string, any>"
              :deep="2"
              class="mt-4"
              theme="dark"
              style="max-height: 300px; overflow-y: auto"
            />
          </UCard>
        </template>
      </InteractivePanel>

      <USeparator />

      <InteractivePanel title="getInfoHalving" description="Get Halving info">
        <UButton
          class="mt-4"
          :loading="infoHalvingStatus === 'pending'"
          block
          color="neutral"
          @click="getInfoHalving()"
        >
          Execute
        </UButton>
        <template #bottom>
          <UCard v-if="infoHalving" variant="subtle" class="mt-4">
            <VueJsonPretty
              :data="infoHalving as Record<string, any>"
              :deep="2"
              class="mt-4"
              theme="dark"
              style="max-height: 300px; overflow-y: auto"
            />
          </UCard>
        </template>
      </InteractivePanel>

      <USeparator />

      <InteractivePanel
        title="getInfoHashRate"
        description="Get Hash Rate info"
      >
        <UButton
          class="mt-4"
          :loading="infoHashRateStatus === 'pending'"
          block
          color="neutral"
          @click="getInfoHashRate()"
        >
          Execute
        </UButton>
        <template #bottom>
          <UCard v-if="infoHashRate" variant="subtle" class="mt-4">
            <VueJsonPretty
              :data="infoHashRate as Record<string, any>"
              :deep="2"
              class="mt-4"
              theme="dark"
              style="max-height: 300px; overflow-y: auto"
            />
          </UCard>
        </template>
      </InteractivePanel>

      <USeparator />

      <InteractivePanel
        title="getInfoHashRateMax"
        description="Get Hash Rate Max info"
      >
        <UButton
          class="mt-4"
          :loading="infoHashRateMaxStatus === 'pending'"
          block
          color="neutral"
          @click="getInfoHashRateMax()"
        >
          Execute
        </UButton>
        <template #bottom>
          <UCard v-if="infoHashRateMax" variant="subtle" class="mt-4">
            <VueJsonPretty
              :data="infoHashRateMax as Record<string, any>"
              :deep="2"
              class="mt-4"
              theme="dark"
              style="max-height: 300px; overflow-y: auto"
            />
          </UCard>
        </template>
      </InteractivePanel>

      <USeparator />

      <InteractivePanel title="getInfoHealth" description="Get Health info">
        <UButton
          class="mt-4"
          :loading="infoHealthStatus === 'pending'"
          block
          color="neutral"
          @click="getInfoHealth()"
        >
          Execute
        </UButton>
        <template #bottom>
          <UCard v-if="infoHealth" variant="subtle" class="mt-4">
            <VueJsonPretty
              :data="infoHealth as Record<string, any>"
              :deep="2"
              class="mt-4"
              theme="dark"
              style="max-height: 300px; overflow-y: auto"
            />
          </UCard>
        </template>
      </InteractivePanel>

      <USeparator />

      <InteractivePanel
        title="getInfoMarketcap"
        description="Get Marketcap info"
      >
        <UButton
          class="mt-4"
          :loading="infoMarketcapStatus === 'pending'"
          block
          color="neutral"
          @click="getInfoMarketcap()"
        >
          Execute
        </UButton>
        <template #bottom>
          <UCard v-if="infoMarketcap" variant="subtle" class="mt-4">
            <VueJsonPretty
              :data="infoMarketcap as Record<string, any>"
              :deep="2"
              class="mt-4"
              theme="dark"
              style="max-height: 300px; overflow-y: auto"
            />
          </UCard>
        </template>
      </InteractivePanel>

      <USeparator />

      <InteractivePanel
        title="getBlocksBlockId"
        description="Get block detail for the specified block ID"
      >
        <UTextarea
          v-model="blockId"
          :rows="5"
          class="size-full"
          variant="subtle"
          placeholder="Paste your wallet address here"
        />
        <UButton
          class="mt-4"
          :disabled="!blockId.length"
          :loading="blocksBlockIdStatus === 'pending'"
          block
          color="neutral"
          @click="getBlocksBlockId()"
        >
          Execute
        </UButton>
        <template #bottom>
          <UCard v-if="blocksBlockId" variant="subtle" class="mt-4">
            <VueJsonPretty
              :data="blocksBlockId as Record<string, any>"
              :deep="2"
              class="mt-4"
              theme="dark"
              style="max-height: 300px; overflow-y: auto"
            />
          </UCard>
        </template>
      </InteractivePanel>

      <USeparator />

      <InteractivePanel
        title="getBlocks"
        description="Get Blocks info from the specified low hash"
      >
        <UTextarea
          v-model="blockId"
          :rows="5"
          class="size-full"
          variant="subtle"
          placeholder="Paste your wallet address here"
        />
        <UButton
          class="mt-4"
          :loading="blocksStatus === 'pending'"
          block
          color="neutral"
          @click="getBlocks()"
        >
          Execute
        </UButton>
        <template #bottom>
          <UCard v-if="blocks" variant="subtle" class="mt-4">
            <VueJsonPretty
              :data="blocks as Record<string, any>"
              :deep="2"
              class="mt-4"
              theme="dark"
              style="max-height: 300px; overflow-y: auto"
            />
          </UCard>
        </template>
      </InteractivePanel>

      <USeparator />

      <InteractivePanel
        title="getBlocksFromBluescore"
        description="Get Blocks from the specified blue score"
      >
        <UTextarea
          v-model="blueScore"
          :rows="5"
          class="size-full"
          variant="subtle"
          placeholder="Paste your wallet address here"
        />
        <UButton
          class="mt-4"
          :loading="blocksFromBluescoreStatus === 'pending'"
          block
          color="neutral"
          @click="getBlocksFromBluescore()"
        >
          Execute
        </UButton>
        <template #bottom>
          <UCard v-if="blocksFromBluescore" variant="subtle" class="mt-4">
            <VueJsonPretty
              :data="blocksFromBluescore as Record<string, any>"
              :deep="2"
              class="mt-4"
              theme="dark"
              style="max-height: 300px; overflow-y: auto"
            />
          </UCard>
        </template>
      </InteractivePanel>

      <USeparator />

      <InteractivePanel
        title="getTransactionsId"
        description="Get transaction detail from the specified transaction ID"
      >
        <UTextarea
          v-model="transactionId"
          :rows="5"
          class="size-full"
          variant="subtle"
          placeholder="Paste your wallet address here"
        />
        <UButton
          class="mt-4"
          :loading="transactionsIdStatus === 'pending'"
          block
          color="neutral"
          @click="getTransactionsId()"
        >
          Execute
        </UButton>
        <template #bottom>
          <UCard v-if="transactionsId" variant="subtle" class="mt-4">
            <VueJsonPretty
              :data="transactionsId as Record<string, any>"
              :deep="2"
              class="mt-4"
              theme="dark"
              style="max-height: 300px; overflow-y: auto"
            />
          </UCard>
        </template>
      </InteractivePanel>

      <USeparator />

      <InteractivePanel
        title="postTransactionsMass"
        description="Get transaction mass from the specified transaction object"
      >
        <UTextarea
          disabled
          :value="JSON.stringify(postTransactionMassParams, null, 2)"
          :rows="5"
          class="size-full"
          variant="subtle"
          placeholder="Paste your wallet address here"
        />
        <UButton
          class="mt-4"
          :loading="transactionMassStatus === 'pending'"
          block
          color="neutral"
          @click="postTransactionsMass()"
        >
          Execute
        </UButton>
        <template #bottom>
          <UCard v-if="transactionMass" variant="subtle" class="mt-4">
            <VueJsonPretty
              :data="transactionMass as Record<string, any>"
              :deep="2"
              class="mt-4"
              theme="dark"
              style="max-height: 300px; overflow-y: auto"
            />
          </UCard>
        </template>
      </InteractivePanel>
    </div>
  </UCard>
</template>
